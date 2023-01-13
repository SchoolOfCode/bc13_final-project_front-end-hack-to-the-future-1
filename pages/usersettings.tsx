import { useSession } from "@supabase/auth-helpers-react";
import { useProfile } from "../hooks/useProfile";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Button from "../components/Button/Button";
import { useRouter } from "next/router";
import Image from "next/image";
import { useState } from "react";

export default function UserSettings() {
  const { profile } = useProfile();
  const router = useRouter();

  const supabase = useSupabaseClient();
  const handleClick = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };
  const redirectToRoot = () => {
    router.push("/");
  };
  const saveChanges = async () => {
    //not sure on the logic of how to do this? is it a state based thing with handle submit?
  };

  return (
    <div className="flex flex-col bg-slate-300 h-screen w-full">
      {!profile ? (
        <p>Redirecting...</p>
      ) : (
        <div className="flex flex-col h-screen w-full  justify-center items-center">
          <header className="flex justify-between w-full border-box p-4">
            <Image src="/logo.svg" alt="logo" width="59" height="59" />
            <Button onClick={handleClick} buttonText="Logout" />
          </header>
          <div className="flex flex-col justify-center gap-4 items-center text-center h-5/6 w-5/6 max-w-md bg-slate-400 py-10">
            <h1 className="font-Open-semi-bold text-xl text-slate-800">
              Hello {profile.full_name}
            </h1>
            <h2 className="font-Open-semi-bold text-md text-slate-800">
              {" "}
              Edit account details
            </h2>
            <form className= "flex flex-col justify-center gap-4 items-center text-center h-5/6 w-5/6 max-w-md bg-slate-400 py-10">
              <label
                htmlFor="email"
                className="font-Open text-sm text-slate-800"
              >
                Account Email
              </label>
              <input id="email" name="email" />
              <label
                htmlFor="password"
                className="font-Open text-sm text-slate-800"
              >
                Password
              </label>
              <input id="password" name="password" />
              <label
                htmlFor="name"
                className="font-Open text-sm text-slate-800"
              >
                Full Name
              </label>
              <input id="name" name="name" />
            </form>
            <Button onClick={saveChanges} buttonText="Save Changes" />
            <Button onClick={redirectToRoot} buttonText="Back" />
          </div>
        </div>
      )}
    </div>
  );
}
