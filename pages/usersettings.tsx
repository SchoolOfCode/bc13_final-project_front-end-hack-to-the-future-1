import { useSession } from "@supabase/auth-helpers-react";
import { useProfile } from "../hooks/useProfile";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Button from "../components/Button/Button";

export default function UserSettings() {
  const { profile } = useProfile();

  const supabase = useSupabaseClient() 
  const handleClick=async () => {
    await supabase.auth.signOut()
  }

  return (
   
    <div className="container" style={{ padding: "50px 0 100px 0" }}>
      {!profile ? (
        <p>not logged in</p>
      ) : (
        <div>
          <p>
            Hello {profile.full_name}. You are a {profile.user_type}
          </p>
          <Button onClick={handleClick} buttonText="Logout"/>
        </div>
      )}
    </div>
  );
}
