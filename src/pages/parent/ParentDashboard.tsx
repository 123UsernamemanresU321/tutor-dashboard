import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";

export function ParentDashboard() {
  const [code,setCode]=useState("");
  const [links,setLinks]=useState<any[]>([]);
  const [msg,setMsg]=useState("");

  const load=async()=>{
    const { data } = await supabase.from("parent_student_links").select("*").eq("parent_id",(await supabase.auth.getUser()).data.user?.id);
    setLinks(data||[]);
  };
  useEffect(()=>{load();},[]);

  const submit=async()=>{
    setMsg("Requesting...");
    const res=await fetch("/functions/v1/request-parent-link",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({linkCode:code})});
    const json=await res.json();
    if(!res.ok){setMsg(json.error||"Error");return;}
    setMsg("Requested. Waiting for student approval.");
    load();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6 space-y-3">
        <h2 className="text-xl font-semibold">Link to your child</h2>
        <input className="w-full border rounded-lg px-3 py-2" placeholder="Enter link code" value={code} onChange={e=>setCode(e.target.value.toUpperCase())}/>
        <button onClick={submit} className="px-4 py-2 rounded-full bg-indigo-600 text-white text-sm">Request link</button>
        <p className="text-sm text-slate-500">{msg}</p>
      </div>
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6">
        <h3 className="text-lg font-semibold mb-2">Link status</h3>
        <div className="space-y-2 text-sm">
          {links.map(l=>(
            <div key={l.id} className="border rounded-xl p-2 flex justify-between">
              <div>
                <p>ID: {l.id}</p>
                <p>Status: {l.status}</p>
              </div>
              {l.status==="active" && (
                <a className="text-indigo-600" href={`/parent/students/${l.student_id}`}>View child dashboard</a>
              )}
            </div>
          ))}
          {!links.length && <p className="text-slate-500 text-sm">No links yet.</p>}
        </div>
      </div>
    </div>
  );
}
