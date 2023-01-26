import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from './useLocation';
import DemoModeContext from '../contexts/demoMode';
import { PostcodesFetch, Business, Deal } from '../types/fetch';

/**
 * A React custom hook that searches the database for businesses within a radius of a given postcode.
 * @returns loading, error, businesses
 */
export function useLocalBusinesses() {
  const supabase = useSupabaseClient();
  const { pos } = useLocation();
  const { demoModeActive } = useContext(DemoModeContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any | null>(null);
  const [businesses, setBusinesses] = useState<any[]>([]);

  const [postcodes, setPostcodes] = useState<PostcodesFetch[]>([]);
  const mappedPostcodes: any = [];

  useEffect(() => {
    const getAllLocalPostcodes = async () => {
      if (demoModeActive === true) {
        const response = await fetch(
          `https://api.postcodes.io/postcodes?lon=${-1.501914}&lat=${53.367459}&radius=400&limit=100`
        );
        const localPostcodes = await response.json();
        if (localPostcodes) {
          localPostcodes.result.map((item: any) => {
            mappedPostcodes.push(item.postcode);
          });
          setPostcodes(mappedPostcodes);
          console.log('Postcodes State', mappedPostcodes);
        }
      } else if (pos) {
        const response = await fetch(
          `https://api.postcodes.io/postcodes?lon=${pos.lng}&lat=${pos.lat}&radius=400&limit=100`
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
          .from('businesses')
          .select('*, deals (*)')
          .in('postcode', [postcodes]);
        if (data != null) {
          setBusinesses(data);
        }
      };
      getAllLocalBusinesses();
    }
  }, [postcodes]);

  return { loading, error, businesses };
}
