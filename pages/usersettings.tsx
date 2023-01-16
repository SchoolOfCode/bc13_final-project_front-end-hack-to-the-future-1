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

  useEffect(() => {
    if (profile) {
      setName(profile.full_name);
    }
    if (user) {
      setEmail(user.email);
    }
  }, [user, profile]);

  const saveChanges = async () => {
    if (user) {
      const { data, error } = await supabase.auth.updateUser({
        email: email,
      });
    }

    if (user) {
      const { error } = await supabase
        .from("profiles")
        .update({ full_name: name })
        .eq("id", user.id);
      if (error) {
        throw error;
      }
    }

    if (password) {
      const { data, error } = await supabase.auth.updateUser({
        password: password,
      });
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
            <h1 className="font-Open-semi-bold text-md text-slate-800">
              Edit Account Details
            </h1>
            <p>{name}</p>
            <p>{email}</p>
            <form className="flex flex-col justify-center gap-4 items-center text-center h-5/6 w-5/6 max-w-md bg-slate-400 py-10">
              <label
                htmlFor="name"
                className="font-Open text-sm text-slate-800"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />

              <label
                htmlFor="email"
                className="font-Open text-sm text-slate-800"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />

              <label
                htmlFor="password"
                className="font-Open text-sm text-slate-800"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </form>
            <Button onClick={saveChanges} buttonText="Save Changes" />
            <Button onClick={redirectToRoot} buttonText="Back" />
          </div>
        </div>
      )}
    </div>
  );
}
