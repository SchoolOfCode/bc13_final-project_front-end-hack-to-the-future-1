import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Button from "../components/Button/Button";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useProfile } from "../hooks/useProfile";

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
    <div className="container" style={{ padding: "50px 0 100px 0" }}>
      {!session ? (
        <Auth
          providers={["facebook", "google"]}
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
        />
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
