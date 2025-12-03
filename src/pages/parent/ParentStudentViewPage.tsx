import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../supabaseClient";

export function ParentStudentViewPage() {
  const { studentId } = useParams();
  const [student,setStudent]=useState<any>(null);
  const [sessions,setSessions]=useState<any[]>([]);
  const [invoices,setInvoices]=useState<any[]>([]);

  useEffect(()=>{
    const load=async()=>{
      const { data: stu } = await supabase.from("students").select("display_name,grade_level,school_name").eq("id",studentId).single();
      setStudent(stu);
      const { data: sess } = await supabase.from("sessions").select("*").eq("student_id",studentId).order("start_time",{ascending:true});
      setSessions(sess||[]);
      const { data: inv } = await supabase.from("invoices").select("*").eq("student_id",studentId).order("service_period_start",{ascending:false});
      setInvoices(inv||[]);
    };
    load();
  },[studentId]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold">{student?.display_name || "Student"}</h2>
        <p className="text-sm text-slate-600">Grade: {student?.grade_level || "—"}, School: {student?.school_name || "—"}</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Sessions</h3>
          <ul className="space-y-2 text-sm">
            {sessions.map(s=>(
              <li key={s.id} className="border rounded-xl p-2">
                {s.start_time} • {s.is_completed ? "Completed" : "Planned"} {s.is_locked && "(Locked until invoice paid)"}
              </li>
            ))}
            {!sessions.length && <p className="text-slate-500 text-sm">No sessions yet.</p>}
          </ul>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Invoices</h3>
          <ul className="space-y-2 text-sm">
            {invoices.map(inv=>(
              <li key={inv.id} className="border rounded-xl p-2">
                {inv.id} • Period {inv.service_period_start || "?"} – {inv.service_period_end || "?"} • {inv.is_paid ? "Paid" : "Unpaid"}
              </li>
            ))}
            {!invoices.length && <p className="text-slate-500 text-sm">No invoices yet.</p>}
          </ul>
        </div>
      </div>
    </div>
  );
}
