import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import Button from "../components/Button/Button";
import { useProfile } from "../hooks/useProfile";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function UserType() {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const user = useUser();
  const { profile } = useProfile();

  const [name, setName] = useState<string>();
  const [nameWarning, setNameWarning] = useState<string>();
  const [nameWarningColour, setNameWarningColour] = useState<string>(
    "text-red-600 text-xs"
  );

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
    <div className="flex w-full h-screen justify-center items-center bg-slate-800">
      <div className="flex w-5/6 flex-col justify-around h-4/6 items-center gap-5">
        <Image src="/logo.svg" alt="logo" width="400" height="400" />
        <div
          id="userTypeChoice"
          className="flex flex-col justify-center gap-4 items-center text-center h-3/6 w-5/6 max-w-md bg-slate-800 py-10"
        >
          <h1 className="font-Open text-amber-500 text-3xl text-left">
            Welcome to IndyGo!
          </h1>
          <p className="font-Open text-slate-50 text-sm text-left p-5">
            Please enter your name and select your account type to continue:
          </p>
          <label
            htmlFor="name"
            className="font-Open text-sm text-amber-500 font-bold w-full text-left"
          >
            Full Name
          </label>
          <input
            className="w-80 h-14 bg-slate-300 text-slate-800 border-amber-600 border-2 rounded-md font-Open text-sm"
            id="name"
            name="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <p className={nameWarningColour}>{nameWarning}</p>
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
