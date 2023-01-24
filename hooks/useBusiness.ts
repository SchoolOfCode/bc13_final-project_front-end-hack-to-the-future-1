import { useEffect, useState } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

/**
 * Creating TypeScript for the values that we are going to retrive from the profiles table in Supabase.
 */
export interface Business {
  id: string;
  name: string;
  business_type: string;
  website: string;
  postcode: string;
  address_line1: string;
  lat: number;
  lon: number;
  user_id: string;
}

/**
 * Custom hook that be called from anywhere else in the application to retrieve details of the business associated with a user, if one exists.
 * Works by checking the active session and user, and if one exists, queries the businesses table in supabase using the userid obtained from the useUser helper function.
 * @returns
 */
export function useBusiness() {
  const user = useUser();
  const supabase = useSupabaseClient();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any | null>(null);
  const [business, setBusiness] = useState<Business | null>(null);

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        if (user) {
          const { data } = await supabase
            .from("businesses")
            .select()
            .eq("user_id", user.id)
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
              address_line1: data.address_line1 ?? "",
              lat: data.lat ?? "",
              lon: data.lon ?? "",
              user_id: data.user_id ?? "",
            });
          }
        }
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  return { loading, error, business };
}
