import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import Button from "../components/Button/Button";
import { useProfile } from "../hooks/useProfile";
import { useEffect } from "react";

export default function UserType() {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const user = useUser();
  const { profile } = useProfile();

  useEffect(() => {
    if (profile?.user_type === "consumer") {
      router.push("/");
    } else if (profile?.user_type === "business") {
      router.push("/businesshome");
    }
  }, [profile]);

  async function redirectConsumer() {
    if (user) {
      const { error } = await supabase
        .from("profiles")
        .update({ user_type: "consumer" })
        .eq("id", user.id);
      if (error) {
        throw error;
      }
      router.push("/");
    }
  }

  async function redirectBusiness() {
    if (user) {
      const { error } = await supabase
        .from("profiles")
        .update({ user_type: "business" })
        .eq("id", user.id);
      if (error) {
        throw error;
      }
      router.push("/businessaccountdetails");
    }
  }

  return (
    <div>
      <p>Are you creating a business account?</p>
      <Button onClick={redirectConsumer} buttonText="No" />
      <Button onClick={redirectBusiness} buttonText="Yes" />
    </div>
  );
}
