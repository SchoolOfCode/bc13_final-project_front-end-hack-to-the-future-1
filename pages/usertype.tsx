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

  //remove typeof
  async function updateName() {
    if (typeof name === "string" && name.length > 0) {
      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .update({ full_name: name })
          .eq("id", user.id)
          .select();
        if (error) {
          // throw error;
          // console.log(error)
        }
        if (data === null) {
          setNameWarning("Error: Please try again");
          setNameWarningColour("text-red-600 text-xs");
          return false;
        } else if (name != profile?.full_name) {
          setNameWarning("Name updated");
          setNameWarningColour("text-lime-400 text-xs");
          return true;
        }
      }
    } else {
      setNameWarning("Please add your name to continue");
      setNameWarningColour("text-red-600 text-xs");
      return false;
    }
  }

  async function redirectConsumer() {
    const nameAdded = await updateName();
    if (nameAdded) {
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
  }

  async function redirectBusiness() {
    const nameAdded = await updateName();
    if (nameAdded) {
      if (user) {
        const { error } = await supabase
          .from("profiles")
          .update({ user_type: "business" })
          .eq("id", user.id);
        if (error) {
          throw error;
        }
        router.push("/businesshome");
      }
    }
  }

  return (
    <div className="flex flex-col w-full min-h-screen justify-center items-center bg-slate-800">
      <div className="flex flex-col justify-end items-center h-3/6">
        <Image src="/logo.svg" alt="logo" width="300" height="300" />
      </div>
      <div
        id="userTypeChoice"
        className="flex flex-col min-h-3/6 w-5/6 justify-center gap-4 items-center text-center max-w-md bg-slate-800 py-10"
      >
        <h1 className="font-Open text-amber-500 text-3xl text-left w-5/6">
          Welcome to IndyGo!
        </h1>
        <p className="font-Open text-slate-50 text-sm text-left w-5/6 py-5">
          Please enter your name and select your account type to continue:
        </p>
        <label
          htmlFor="name"
          className="font-Open text-sm text-amber-500 font-bold w-5/6 text-left"
        >
          Full Name
        </label>
        <input
          className="w-5/6 h-14 bg-slate-300 text-slate-800 border-amber-600 border-2 rounded-md font-Open text-sm px-2"
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
          buttonText="CONTINUE AS CUSTOMER"
          className="w-5/6 h-14"
        />
        <Button
          onClick={redirectBusiness}
          buttonText="CONTINUE AS BUSINESS"
          className="w-5/6 h-14 border-indigo-400 bg-opacity-0 text-indigo-400 "
        />
      </div>
    </div>
  );
}

