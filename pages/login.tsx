import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

// useSession is a helper function that shows if there is an active session and it displays the session information.
// use case for session would be conditional rendering based on if there is an active session (user logged in) or not

export default function Login() {
  const session = useSession();
  const supabase = useSupabaseClient();

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
        <p>You are logged in</p>
      )}
    </div>
  );
}
