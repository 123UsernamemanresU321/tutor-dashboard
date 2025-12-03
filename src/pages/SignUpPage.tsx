import { useState } from "react";
import { supabase } from "../supabaseClient";

type AccountType = "student" | "parent" | "tutor";

export default function SignUpPage() {
  const [accountType, setAccountType] = useState<AccountType>("student");
  const [form, setForm] = useState({ full_name:"", email:"", password:"", school_name:"", grade_level:"", dob:"", phone:"", preferred_contact_method:"email" });
  const [msg, setMsg] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("Signing up...");
    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });
    if (error || !data.user) { setMsg(error?.message || "Sign up failed"); return; }

    // create profile + role row
    const res = await fetch("/functions/v1/create-user-profile", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${data.session?.access_token || data.session?.access_token}` },
      body: JSON.stringify({
        role: accountType,
        full_name: form.full_name,
        school_name: form.school_name,
        grade_level: form.grade_level,
        date_of_birth: form.dob,
        phone: form.phone,
        preferred_contact_method: form.preferred_contact_method,
      }),
    });
    const json = await res.json();
    if (!res.ok) { setMsg(json.error || "Profile create failed"); return; }
    setMsg("Success! Check your email to confirm, then sign in.");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <form onSubmit={onSubmit} className="w-full max-w-md bg-white rounded-2xl shadow p-6 space-y-4">
        <h1 className="text-xl font-semibold">Create your account</h1>
        <div className="flex gap-3 text-sm">
          {["student","parent","tutor"].map(r => (
            <label key={r} className={`px-3 py-2 rounded-full border ${accountType===r?"border-indigo-500 bg-indigo-50":"border-slate-200"}`}>
              <input type="radio" className="mr-2" checked={accountType===r} onChange={()=>setAccountType(r as AccountType)} /> {r}
            </label>
          ))}
        </div>
        <input className="w-full border rounded-lg px-3 py-2" placeholder="Full name" value={form.full_name} onChange={e=>setForm({...form, full_name:e.target.value})}/>
        <input className="w-full border rounded-lg px-3 py-2" placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})}/>
        <input className="w-full border rounded-lg px-3 py-2" placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})}/>
        {accountType==="student" && (
          <>
            <input className="w-full border rounded-lg px-3 py-2" placeholder="School" value={form.school_name} onChange={e=>setForm({...form, school_name:e.target.value})}/>
            <input className="w-full border rounded-lg px-3 py-2" placeholder="Grade/Level" value={form.grade_level} onChange={e=>setForm({...form, grade_level:e.target.value})}/>
            <label className="text-sm text-slate-600">Date of birth</label>
            <input className="w-full border rounded-lg px-3 py-2" type="date" value={form.dob} onChange={e=>setForm({...form, dob:e.target.value})}/>
          </>
        )}
        {accountType==="parent" && (
          <>
            <input className="w-full border rounded-lg px-3 py-2" placeholder="Phone" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})}/>
            <select className="w-full border rounded-lg px-3 py-2" value={form.preferred_contact_method} onChange={e=>setForm({...form, preferred_contact_method:e.target.value})}>
              <option value="email">Email</option><option value="phone">Phone</option><option value="whatsapp">WhatsApp</option>
            </select>
          </>
        )}
        <button type="submit" className="w-full bg-indigo-600 text-white rounded-full py-2 font-medium">Sign up</button>
        <p className="text-sm text-slate-600">{msg}</p>
      </form>
    </div>
  );
}
