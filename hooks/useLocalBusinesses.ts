import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "./useLocation";
import DemoModeContext from "../contexts/demoMode";
import { PostcodesFetch, Business, Deal } from "../types/fetch";

/**
 * Custom hook that be called from anywhere else in the application to retrieve details of the business associated with a user, if one exists.
 * Works by checking the active session and user, and if one exists, queries the businesses table in supabase using the userid obtained from the useUser helper function.
 * @returns
 */
export function useLocalBusinesses() {
  const supabase = useSupabaseClient();
  const { pos } = useLocation();
  const { demoModeActive, setDemoModeActive } = useContext(DemoModeContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any | null>(null);
  const [businesses, setBusinesses] = useState<any[]>([]);

  const [postcodes, setPostcodes] = useState<PostcodesFetch[]>([]);
  const mappedPostcodes: any = [];

  useEffect(() => {
    const getAllLocalPostcodes = async () => {
      if (demoModeActive === true) {
        const response = await fetch(
          `https://api.postcodes.io/postcodes?lon=${-1.501914}&lat=${53.367459}&radius=1000`
        );
        const localPostcodes = await response.json();
        if (localPostcodes) {
          localPostcodes.result.map((item: any) => {
            mappedPostcodes.push(item.postcode);
          });
          setPostcodes(mappedPostcodes);
        }
      } else if (pos) {
        const response = await fetch(
          `https://api.postcodes.io/postcodes?lon=${pos.lng}&lat=${pos.lat}&radius=1000`
        );
        const localPostcodes = await response.json();
        if (localPostcodes) {
          localPostcodes.result.map((item: any) => {
            mappedPostcodes.push(item.postcode);
          });
          setPostcodes(mappedPostcodes);
        }
      }
    };
    getAllLocalPostcodes();
  }, [pos, demoModeActive]);

  useEffect(() => {
    if (postcodes.length > 0) {
      const getAllLocalBusinesses = async () => {
        const { data } = await supabase
          .from("businesses")
          .select("*, deals (*)")
          .in("postcode", [postcodes]);
        if (data != null) {
          setBusinesses(data);
        }
      };
      getAllLocalBusinesses();
    }
  }, [postcodes]);

  return { loading, error, businesses };
}
