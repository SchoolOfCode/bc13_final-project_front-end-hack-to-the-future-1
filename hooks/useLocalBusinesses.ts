import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import React, { useState, useEffect } from 'react';
import { useLocation } from './useLocation';
import { PostcodesFetch, Business, Deal } from '../types/fetch';

/**
 *
 * @returns loading, error, businesses
 */
export function useLocalBusinesses() {
  const supabase = useSupabaseClient();
  const { pos } = useLocation();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any | null>(null);
  const [businesses, setBusinesses] = useState<any[]>([]);

  const [postcodes, setPostcodes] = useState<PostcodesFetch[]>([]);
  const mappedPostcodes: any = [];

  useEffect(() => {
    if (pos) {
      const getAllLocalPostcodes = async () => {
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
      };
      getAllLocalPostcodes();
    }
  }, [pos]);

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
