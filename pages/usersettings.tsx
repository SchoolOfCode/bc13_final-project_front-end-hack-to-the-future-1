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
  const [emailWarning,setEmailWarning] = useState <string>();
  const [emailWarningColour,setEmailWarningColour] = useState <string>("text-red-600 text-xs");
  const [nameWarning,setNameWarning] = useState <string>();
  const [nameWarningColour,setNameWarningColour] = useState <string>("text-red-600 text-xs");
  const [passwordWarning,setPasswordWarning] = useState <string>();
  const [passwordWarningColour,setPasswordWarningColour] = useState <string>("text-red-600 text-xs");

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
      if (error) {
        // throw error;
        // console.log(error)
      }
      // console.log(data, 'this is from email')
      if(data.user === null){
        setEmailWarning("Error: The email address may already be in use")
        setEmailWarningColour("text-red-600 text-xs")
      } else if(user.email != email){
        setEmailWarning("Success: Please check email to confirm the change")
        setEmailWarningColour("text-lime-400 text-xs")
      }
    }


    if (user) {
      const { data, error } = await supabase
        .from("profiles")
        .update({ full_name: name })
        .eq("id", user.id)
        .select()
      if (error) {
        // throw error;
        // console.log(error)
      }
      console.log(data, `is from full name`)
      if(data === null){
        setNameWarning("Error: Please try again")
        setNameWarningColour("text-red-500 text-xs")
      } else if(name !=profile?.full_name){
        setNameWarning("Success: Name updated")
        setNameWarningColour("text-lime-400 text-xs")

      }
    }

    if (password) {
      const { data, error } = await supabase.auth.updateUser({
        password: password,
      });
      if (error) {
        // throw error;
        console.log(error)
      }
      console.log(`${data} this is from password`)
      if(error){
        setPasswordWarning("Error: Passwords should be at least 6 characters please try again")
        setPasswordWarningColour("text-red-500 text-xs")
      } else{ 
        setPasswordWarning("Success: Please check your email to confirm the changes")
        setPasswordWarningColour("text-lime-400 text-xs")

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
        <div className="flex flex-col h-screen w-full  justify-center items-center">
          <header className="flex justify-between w-full border-box p-4">
            <Image src="/logo.svg" alt="logo" width="59" height="59" />
            <Button onClick={handleClick} buttonText="Logout" />
          </header>
          <div className="flex flex-col justify-center gap-4 items-center text-center h-5/6 w-5/6 max-w-md bg-slate-800 py-10">
            <h1 className="font-Open-semi-bold text-md text-slate-50">
              Edit Account Details
            </h1>
            <p>{name}</p>
            <p>{email}</p>
            <form className="flex flex-col justify-center gap-4 items-center text-center h-5/6 w-5/6 max-w-md bg-slate-800 py-10">
              <label
                htmlFor="name"
                className="font-Open text-sm text-amber-500"
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
              <p className={nameWarningColour}>{nameWarning}</p>

              <label
                htmlFor="email"
                className="font-Open text-sm text-amber-500"
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
              <p className={emailWarningColour}>{emailWarning}</p>

              <label
                htmlFor="password"
                className="font-Open text-sm text-amber-500"
              >
                New Password
              </label>
              <input
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
            <Button onClick={saveChanges} buttonText="Save Changes" />
            <Button onClick={redirectToRoot} buttonText="Back" />
          </div>
        </div>
      )}
    </div>
  );
}
