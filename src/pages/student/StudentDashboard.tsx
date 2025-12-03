import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

export function StudentDashboard() {
  const [linkCode, setLinkCode] = useState("");
  const [pending, setPending] = useState<any[]>([]);
  const [active, setActive] = useState<any[]>([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const load = async () => {
      const { data: stu } = await supabase.from("students").select("link_code").eq("id", (await supabase.auth.getUser()).data.user?.id).single();
      setLinkCode(stu?.link_code || "");
      const { data: pend } = await supabase.from("parent_student_links").select("id,parent_id,status").eq("student_id",(await supabase.auth.getUser()).data.user?.id);
      setPending((pend||[]).filter(p=>p.status==="pending_student_approval"));
      setActive((pend||[]).filter(p=>p.status==="active"));
    };
    load();
  }, []);

  const respond = async (id:string, response:"approve"|"reject")=>{
    setMsg("Saving...");
    const res = await fetch("/functions/v1/respond-parent-link",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({linkId:id,response})});
    const json=await res.json();
    if(!res.ok){setMsg(json.error||"Error");return;}
    setMsg("Updated"); location.reload();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold">Your Link Code</h2>
        <p className="text-sm text-slate-600">Share this code with your parent so they can request access.</p>
        <div className="mt-2 flex items-center gap-3">
          <code className="px-3 py-2 rounded-lg bg-slate-100 text-slate-800 font-mono">{linkCode || "—"}</code>
          <button onClick={()=>navigator.clipboard.writeText(linkCode)} className="px-3 py-2 rounded-full bg-indigo-600 text-white text-sm">Copy</button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6">
        <h3 className="text-lg font-semibold mb-2">Parent link requests</h3>
        {!pending.length && <p className="text-sm text-slate-500">No pending requests.</p>}
        <div className="space-y-3">
          {pending.map(req=>(
            <div key={req.id} className="flex items-center justify-between border rounded-xl p-3">
              <div>
                <p className="text-sm">Request ID: {req.id}</p>
                <p className="text-xs text-slate-500">Status: {req.status}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={()=>respond(req.id,"approve")} className="px-3 py-1 rounded-full bg-emerald-600 text-white text-sm">Approve</button>
                <button onClick={()=>respond(req.id,"reject")} className="px-3 py-1 rounded-full border border-rose-300 text-rose-700 text-sm">Reject</button>
              </div>
            </div>
          ))}
        </div>
        <p className="text-sm text-slate-500 mt-2">{msg}</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6">
        <h3 className="text-lg font-semibold mb-2">Active parents</h3>
        {!active.length && <p className="text-sm text-slate-500">None yet.</p>}
        <ul className="space-y-2 text-sm">
          {active.map(a=><li key={a.id} className="border rounded-xl p-2">Link: {a.id}</li>)}
        </ul>
      </div>
    </div>
  );
}
