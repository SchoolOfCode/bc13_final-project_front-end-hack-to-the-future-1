import { useProfile } from "../hooks/useProfile";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Button from "../components/Button/Button";
import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function UserSettings() {
  const { profile } = useProfile();
  const user = useUser();
  const router = useRouter();
  const supabase = useSupabaseClient();

  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [emailWarning, setEmailWarning] = useState<string>();
  const [emailWarningColour, setEmailWarningColour] = useState<string>(
    "text-red-600 text-xs"
  );
  const [nameWarning, setNameWarning] = useState<string>();
  const [nameWarningColour, setNameWarningColour] = useState<string>(
    "text-red-600 text-xs"
  );
  const [passwordWarning, setPasswordWarning] = useState<string>();
  const [passwordWarningColour, setPasswordWarningColour] = useState<string>(
    "text-red-600 text-xs"
  );

  useEffect(() => {
    if (profile) {
      setName(profile.full_name);
    }
    if (user) {
      setEmail(user.email);
    }
  }, [user, profile]);

  useEffect(() => {
    if (profile?.user_type === "") {
      router.push("/usertype");
    }
  }, [profile]);

  const saveChanges = async () => {
    if (user) {
      const { data, error } = await supabase.auth.updateUser({
        email: email,
      });
      if (error) {
        // throw error;
        // console.log(error)
      }
      // console.log(data, 'this is from email')
      if (data.user === null) {
        setEmailWarning("Error: The email address may already be in use");
        setEmailWarningColour("text-red-600 text-xs");
      } else if (user.email != email) {
        setEmailWarning("Please check email to confirm the change");
        setEmailWarningColour("text-lime-400 text-xs");
      }
    }

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
      console.log(data, `is from full name`);
      if (data === null) {
        setNameWarning("Error: Please try again");
        setNameWarningColour("text-red-600 text-xs");
      } else if (name != profile?.full_name) {
        setNameWarning("Name updated");
        setNameWarningColour("text-lime-400 text-xs");
      }
    }

    if (password) {
      const { data, error } = await supabase.auth.updateUser({
        password: password,
      });
      if (error) {
        // throw error;
        console.log(error);
      }
      console.log(`${data} this is from password`);
      if (error) {
        setPasswordWarning(
          "Error: Passwords should be at least 6 characters please try again"
        );
        setPasswordWarningColour("text-red-600 text-xs");
      } else {
        setPasswordWarning("Please check your email to confirm the changes");
        setPasswordWarningColour("text-lime-400 text-xs");
      }
    }
  };

  const handleClick = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const redirectToRoot = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col bg-slate-800 h-screen w-full">
      {!profile ? (
        <p>Redirecting...</p>
      ) : (
        <div className="flex flex-col h-screen w-full  justify-start items-center">
          <header className="flex justify-between items-center w-full border-box p-4 mt-5">
            <Image src="/logo.svg" alt="logo" width="100" height="100" />
            <Button onClick={handleClick} buttonText="LOG OUT" />
          </header>
          <div className="flex flex-col justify-start gap-4 items-center text-center h-5/6 w-5/6 max-w-md bg-slate-800 py-10">
            <h1 className="font-Open font-bold text-xl text-slate-50">
              Edit Account Details
            </h1>
            <form className="flex flex-col justify-start gap-4 items-center text-center h-5/6 w-5/6 max-w-md bg-slate-800 py-10">
              <label
                htmlFor="name"
                className="font-Open text-sm text-amber-500 font-bold w-full text-left"
              >
                Full Name
              </label>
              <input
                className="w-full h-14 bg-slate-300 text-slate-800 border-amber-600 border-2 rounded-md font-Open text-sm px-2"
                id="name"
                name="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <p className={nameWarningColour}>{nameWarning}</p>

              <label
                htmlFor="email"
                className="font-Open text-sm font-bold text-amber-500 w-full text-left"
              >
                Email Address
              </label>
              <input
                className="w-full h-14 bg-slate-300 text-slate-800 border-amber-600  border-2 rounded-md font-Open text-sm px-2"
                id="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <p className={emailWarningColour}>{emailWarning}</p>

              <label
                htmlFor="password"
                className="font-Open text-sm first-line:font-bold text-amber-500 w-full text-left"
              >
                New Password
              </label>
              <input
                className="w-full h-14 bg-slate-300 text-slate-800 border-amber-600 border-2 rounded-md font-Open text-sm px-2"
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <p className={passwordWarningColour}>{passwordWarning}</p>
            </form>
            <div className="flex justify-between gap-4">
              <Button
                onClick={redirectToRoot}
                buttonText="BACK"
                className="border-indigo-400 bg-opacity-0 text-indigo-400 "
              />
              <Button
                onClick={saveChanges}
                buttonText="SAVE CHANGES"
                className="border-indigo-400"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
