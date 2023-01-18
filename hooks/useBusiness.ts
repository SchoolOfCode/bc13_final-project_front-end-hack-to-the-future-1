import { useEffect, useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useProfile } from "./useProfile";

/**
 * Creating TypeScript for the values that we are going to retrive from the profiles table in Supabase.
 */
export interface Business {
  id: string;
  name: string;
  business_type: string;
  website: string;
  postcode: string;
}

/**
 * Custom hook that be called from anywhere else in the application to retrieve a user's profile details.
 * Works by checking the active session and user, and if one exists, queries the profiles table in supabase using the userid obtained from the useUser helper function.
 * @returns
 */
export function useBusiness() {
  const session = useSession();
  const { profile } = useProfile();
  const supabase = useSupabaseClient();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any | null>(null);
  const [business, setBusiness] = useState<Business | null>(null);

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        if (profile) {
          const { data } = await supabase
            .from("businesses")
            .select()
            .eq("id", profile.business_id)
            .single();
          if (error) {
            throw error;
          }
          if (data) {
            setBusiness({
              id: data.id ?? "",
              name: data.name ?? "",
              business_type: data.business_type ?? "",
              website: data.website ?? "",
              postcode: data.postcode ?? "",
            });
          }
        }
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [profile]);

  return { loading, error, business };
}
