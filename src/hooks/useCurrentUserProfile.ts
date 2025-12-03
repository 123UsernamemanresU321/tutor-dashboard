// hooks/useCurrentUserProfile.ts
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export function useCurrentUserProfile() {
  const [profile,setProfile]=useState<any>(null);
  useEffect(()=>{
    supabase.auth.getUser().then(async ({ data })=>{
      if (!data.user) return;
      const { data: prof } = await supabase.from("user_profiles").select("*").eq("id", data.user.id).single();
      setProfile(prof);
    });
  },[]);
  return profile;
}
