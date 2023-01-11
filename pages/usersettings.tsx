import { useSession } from "@supabase/auth-helpers-react";
import { useProfile } from "../hooks/useProfile";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Button from "../components/Button/Button";
import { useRouter } from 'next/router'

export default function UserSettings() {
  const { profile } = useProfile();
  const router = useRouter()

  const supabase = useSupabaseClient() 
  const handleClick=async () => {
    await supabase.auth.signOut()
    router.push('/')
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
