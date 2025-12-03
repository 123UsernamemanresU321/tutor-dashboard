// Frontend-only stubs. Replace these with real Supabase RPC or REST calls.
// Each function returns a Promise so UI flows work without backend wiring.

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

export async function requestParentLink(linkCode: string) {
  console.debug('requestParentLink (stub) called with', linkCode);
  return { success: true };
}

export async function respondParentLink(linkId: string, decision: 'approve' | 'reject') {
  console.debug('respondParentLink (stub) called with', linkId, decision);
  return { success: true };
}

export async function getCurrentStudent() {
  // Replace with real Supabase fetch
  return {
    id: 'student-1',
    displayName: 'Student Example',
    linkCode: 'LINK-CODE-1234',
  };
}

export async function getParentLinkRequestsForStudent(_studentId: string): Promise<ParentLinkRequest[]> {
  // Replace with real Supabase fetch
  return [];
}

export async function getActiveParentsForStudent(_studentId: string) {
  return [];
}

export async function getCurrentParent() {
  return { id: 'parent-1', fullName: 'Parent Example' };
}

export async function getParentLinksForCurrentParent(): Promise<ParentLink[]> {
  return [];
}

export async function getStudentOverviewForParent(_studentId: string) {
  return {
    id: _studentId,
    name: 'Student Example',
    grade: 'Grade 10',
    school: 'Example High',
    sessions: { total: 0, upcoming: 0, completed: 0 },
    invoices: { paid: 0, unpaid: 0 },
  };
}
