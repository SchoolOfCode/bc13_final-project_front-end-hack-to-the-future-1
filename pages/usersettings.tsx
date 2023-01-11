import { useSession } from "@supabase/auth-helpers-react";
import { useProfile } from "../hooks/useProfile";

export default function UserSettings() {
  const { profile } = useProfile();
  return (
    
    <div className="container" style={{ padding: "50px 0 100px 0" }}>
      {!profile ? (
        <p>not logged in</p>
      ) : (
        <div>
          <p>
            Hello {profile.full_name}. You are a {profile.user_type}
          </p>
        </div>
      )}
    </div>
  );
}
