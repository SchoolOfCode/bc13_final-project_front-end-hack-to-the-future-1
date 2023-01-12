import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import Button from "../components/Button/Button";
import { useProfile } from "../hooks/useProfile";
import { useEffect } from "react";
import Image from "next/image";

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
    <div className="flex w-full h-screen justify-center items-center bg-slate-300">
      <div className="flex w-5/6 flex-col justify-around h-4/6 items-center gap-5">
        <Image src="/logo.svg" alt="logo" width="400" height="400" />
        <div
          id="userTypeChoice"
          className="flex flex-col justify-center gap-4 items-center text-center h-3/6 w-5/6 max-w-md bg-slate-700"
        >
          <h1 className="text-open text-slate-50 text-3xl text-left"> Welcome {profile?.full_name}.</h1>
          <p className="text-open text-slate-50 text-xl text-left">
            Please choose your account preference to set up your account.
          </p>
          <Button
            onClick={redirectConsumer}
            buttonText="Continue as Customer"
          />
          <Button
            onClick={redirectBusiness}
            buttonText="Continue as Business"
          />
        </div>
      </div>
    </div>
  );
}
