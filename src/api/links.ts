import { getSupabaseClient } from '../lib/supabaseClient';

export type ParentLinkRequest = {
  id: string;
  parentName: string;
  parentEmail: string;
  status: 'pending' | 'active' | 'rejected';
};

export type ParentLink = {
  id: string;
  studentId: string;
  studentName: string;
  status: 'pending' | 'active' | 'rejected';
};

type StudentRow = {
  id: string;
  name: string;
  student_email: string | null;
  user_id: string | null;
  grade_level?: string | null;
  school_name?: string | null;
};

type ParentRow = {
  id: string;
  name: string | null;
  email: string | null;
  user_id: string | null;
};

const REL_PENDING = 'pending';
const REL_ACTIVE = 'active';
const REL_REJECTED = 'rejected';

async function getCurrentUserId() {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    throw new Error(error?.message || 'Not signed in');
  }
  return data.user.id;
}

async function getStudentByUser(userId: string): Promise<StudentRow | null> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('students')
    .select('id,name,student_email,user_id,grade_level,school_name')
    .eq('user_id', userId)
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return data;
}

async function getParentByUser(userId: string): Promise<ParentRow | null> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('parents')
    .select('id,name,email,user_id')
    .eq('user_id', userId)
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function requestParentLink(linkCode: string) {
  const supabase = getSupabaseClient();
  const userId = await getCurrentUserId();

  // Find parent row for caller
  const parent = await getParentByUser(userId);
  if (!parent) throw new Error('Parent profile not found for current user.');

  // Treat linkCode as the student's email (student_email)
  const { data: student, error: stuErr } = await supabase
    .from('students')
    .select('id,name,student_email')
    .ilike('student_email', linkCode.trim())
    .limit(1)
    .maybeSingle();
  if (stuErr) throw stuErr;
  if (!student) throw new Error('Student not found for that code/email.');

  // Upsert link request
  const { error: insErr } = await supabase.from('parent_students').upsert({
    parent_id: parent.id,
    student_id: student.id,
    user_id: userId,
    relationship: REL_PENDING,
  });
  if (insErr) throw insErr;
  return { success: true };
}

export async function respondParentLink(linkId: string, decision: 'approve' | 'reject') {
  const supabase = getSupabaseClient();
  const userId = await getCurrentUserId();
  const student = await getStudentByUser(userId);
  if (!student) throw new Error('Student profile not found.');

  const { error } = await supabase
    .from('parent_students')
    .update({
      relationship: decision === 'approve' ? REL_ACTIVE : REL_REJECTED,
    })
    .eq('id', linkId)
    .eq('student_id', student.id);
  if (error) throw error;
  return { success: true };
}

export async function getCurrentStudent() {
  const userId = await getCurrentUserId();
  const student = await getStudentByUser(userId);
  if (!student) throw new Error('Student profile not found.');
  return {
    id: student.id,
    displayName: student.name,
    // No dedicated link_code column; use student_email as a shareable code
    linkCode: student.student_email || student.id,
  };
}

export async function getParentLinkRequestsForStudent(_studentId: string): Promise<ParentLinkRequest[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('parent_students')
    .select('id,relationship,parent_id,parents(name,email)')
    .eq('student_id', _studentId)
    .eq('relationship', REL_PENDING);
  if (error) throw error;
  return (
    data?.map((row: any) => ({
      id: row.id,
      parentName: row.parents?.name ?? 'Parent',
      parentEmail: row.parents?.email ?? '',
      status: 'pending' as const,
    })) ?? []
  );
}

export async function getActiveParentsForStudent(_studentId: string) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('parent_students')
    .select('id,relationship,parent_id,parents(name,email,phone)')
    .eq('student_id', _studentId)
    .eq('relationship', REL_ACTIVE);
  if (error) throw error;
  return (
    data?.map((row: any) => ({
      id: row.id,
      name: row.parents?.name ?? 'Parent',
      email: row.parents?.email ?? '',
      phone: row.parents?.phone ?? '',
    })) ?? []
  );
}

export async function getCurrentParent() {
  const userId = await getCurrentUserId();
  const parent = await getParentByUser(userId);
  if (!parent) throw new Error('Parent profile not found.');
  return { id: parent.id, fullName: parent.name || 'Parent' };
}

export async function getParentLinksForCurrentParent(): Promise<ParentLink[]> {
  const supabase = getSupabaseClient();
  const userId = await getCurrentUserId();
  const parent = await getParentByUser(userId);
  if (!parent) throw new Error('Parent profile not found.');

  const { data, error } = await supabase
    .from('parent_students')
    .select('id,student_id,relationship,students(name)')
    .eq('parent_id', parent.id);
  if (error) throw error;

  return (
    data?.map((row: any) => ({
      id: row.id,
      studentId: row.student_id,
      studentName: row.students?.name ?? 'Student',
      status:
        row.relationship === REL_PENDING
          ? 'pending'
          : row.relationship === REL_REJECTED
          ? 'rejected'
          : 'active',
    })) ?? []
  );
}

export async function getStudentOverviewForParent(_studentId: string) {
  const supabase = getSupabaseClient();
  const { data: student, error } = await supabase
    .from('students')
    .select('id,name,grade_level,notes')
    .eq('id', _studentId)
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  if (!student) throw new Error('Student not found');

  // Basic counts (sessions/invoices) — best-effort with available columns
  const [{ count: invPaid }, { count: invUnpaid }] = await Promise.all([
    supabase.from('invoices').select('id', { count: 'exact', head: true }).eq('student_id', _studentId).eq('paid', true),
    supabase.from('invoices').select('id', { count: 'exact', head: true }).eq('student_id', _studentId).eq('paid', false),
  ]);

  return {
    id: student.id,
    name: student.name,
    grade: student.grade_level ?? '',
    school: '',
    sessions: { total: 0, upcoming: 0, completed: 0 },
    invoices: { paid: invPaid ?? 0, unpaid: invUnpaid ?? 0 },
  };
}
