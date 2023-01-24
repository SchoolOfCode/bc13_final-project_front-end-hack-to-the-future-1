import { useEffect, useState } from "react";
import {
  useSession,
  useUser,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";

/**
 * Creating TypeScript for the values that we are going to retrive from the profiles table in Supabase.
 */
export interface Profile {
  id: string;
  user_type: string;
  full_name: string;
  business_id: string;
}

/**
 * Custom hook that be called from anywhere else in the application to retrieve a user's profile details.
 * Works by checking the active session and user, and if one exists, queries the profiles table in supabase using the userid obtained from the useUser helper function.
 * @returns
 */
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
            .select(`id, user_type, full_name, business_id`)
            .eq("id", user.id)
            .single();
          if (error) {
            throw error;
          }

          if (data) {
            setProfile({
              id: data.id ?? "",
              user_type: data.user_type ?? "",
              full_name: data.full_name ?? "",
              business_id: data.business_id ?? "",
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
