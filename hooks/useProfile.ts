import { useEffect, useState } from "react";
import {
  useSession,
  useUser,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
//figure out types

export interface Profile {
  user_type: string;
  full_name: string;
  avatar_url: string;
}

export function useProfile() {
  const session = useSession();
  const user = useUser();
  const supabase = useSupabaseClient();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);

        if (user) {
          const { data, error } = await supabase
            .from("profiles")
            .select(`user_type, full_name, avatar_url`)
            .eq("id", user.id)
            .single();
          if (error) {
            throw error;
          }

          if (data) {
            setProfile({
              user_type: data.user_type ?? "",
              full_name: data.full_name ?? "",
              avatar_url: data.avatar_url ?? "",
            });
          }
        }
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [session]);

  return { loading, error, profile };
}
