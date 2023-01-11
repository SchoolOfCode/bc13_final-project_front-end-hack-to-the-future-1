import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import {
  useSession,
  useUser,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";

export default function Login() {
  const session = useSession();

  const supabase = useSupabaseClient();

  const user = useUser();

  

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
