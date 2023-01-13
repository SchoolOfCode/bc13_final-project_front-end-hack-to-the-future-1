import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Button from "../components/Button/Button";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useProfile } from "../hooks/useProfile";
import Image from "next/image";

// useSession is a helper function that shows if there is an active session and it displays the session information.
// use case for session would be conditional rendering based on if there is an active session (user logged in) or not

export default function Login() {
  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();
  const { profile } = useProfile();
  const handleClick = async () => {
    router.push("/usersettings");
  };
  // IF user = customer THEN route to /
  //IF user is business THEN route to business home
  useEffect(() => {
    if (profile?.user_type === "consumer") {
      router.push("/");
    } else if (profile?.user_type === "business") {
      router.push("/businesshome");
    } else if (profile?.user_type === "") {
      router.push("/usertype");
    }
  }, [profile]);

  return (
    <div className="flex w-full h-screen justify-center items-center bg-slate-700">
      {!session ? (
        <div className="flex flex-col justify-around h-4/6 items-center">
          <Image src="/logo.svg" alt="logo" width="400" height="400" />
          <Auth
            providers={["facebook", "google"]}
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: "#F87171",
                    brandAccent: "#fca5a5",
                    brandButtonText: "#334155",
                    anchorTextColor: "#F8FAFC",
                    messageText: "#F8FAFC",
                    inputText: "#F8FAFC",
                    inputLabelText: "#F8FAFC",
                    inputPlaceholder: "#E2E8F0",
                    defaultButtonBorder: "#334155",
                  },
                },
              },
            }}
            theme="light"
          />
        </div>
      ) : (
        <div>
          <Button onClick={handleClick} buttonText="User Settings" />
          <p>You are logged in</p>
          <p>{profile?.full_name}</p>
        </div>
      )}
    </div>
  );
}
