import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabase';

import DealCard from '../DealCard/DealCard';
import { useLocation } from '../../hooks/useLocation';
import { PostcodesFetch } from '../../types/fetch';

export interface Business {
  id: string;
  name: string;
  business_type: string | null;
  website: string | null;
  user_id: string | null;
  deals: Deal[];
  created_at: string | null;
  lat: number | null;
  lon: number | null;
  address_line1: string | null;
  postcode: string | null;
}

export interface Deal {
  id: string;
  name: string;
  created_at: string | null;
  expiration_time: string;
  business_id: string;
  user_id: string;
}

export default function Carousel() {
  const [businesses, setBusinesses] = useState<any[]>([]);
  //todo type will be what ever is returned from fetch
  const [postcodes, setPostcodes] = useState<PostcodesFetch[]>([]);
  // long and lat from geolocation (useLocation())
  const { pos } = useLocation();
  const mappedPostcodes: any = [];

  useEffect(() => {
    if (pos) {
      const getAllLocalPostcodes = async () => {
        const response = await fetch(
          `https://api.postcodes.io/postcodes?lon=${pos.lng}&lat=${pos.lat}&radius=1000`
        );
        const localPostcodes = await response.json();
        //localPostcodes needs to be mapped into a new array which we use to update postcodes
        if (localPostcodes) {
          localPostcodes.result.map((item: any) => {
            //! Create interface for item type
            mappedPostcodes.push(item.postcode);
          });
          setPostcodes(mappedPostcodes);
        }

        //supaBase fetch goes here :
        // const {deals, error} = await supabase.from('businesses').select().in('postcode',postcodes);

        // setBusinesses(deals);
      };
      getAllLocalPostcodes();
    }
  }, [pos]);
  console.log('Postcodes state', postcodes);

  useEffect(() => {
    if (postcodes.length > 0) {
      const getAllLocalDeals = async () => {
        const { data } = await supabase
          .from('businesses')
          .select('*, deals (*)')
          .in('postcode', [postcodes]);
        console.log('deals', data, postcodes);
        if (data != null) {
          setBusinesses(data);
        }
        console.log('businesses', businesses);
      };
      getAllLocalDeals();
    }
  }, [postcodes]);

  useEffect(() => {
    console.log('businesses2', businesses);
  }, [businesses]);

  // save the fetch object as variable (localPostcodes)
  // access the fetch object to find postcodes
  //! map through the fetch result and push the postcodes into a new array stored in state
  //? store the postcodes in their own states? Do we limit the number of returned postcodes to 5?
  //! when fetching from supabase db setting the query to return:
  // * deals WHERE postcode of business matches one of the stored postcode states
  //? What is the dependency?
  //! DO NOT let this send infinite requests!!

  // useEffect(() => {
  //   async function getDeals() {
  //     const { data } = await supabase
  //       .from('deals')
  //       .select('*, businesses (name)');

  //     const dealsData: any = data
  //       ? data.map((item) => ({
  //           id: item.id,
  //           name: item.name,
  //           business_id: item.business_id,
  //           expiration_time: item.expiration_time,
  //           business_name: Array.isArray(item.businesses)
  //             ? item.businesses[0].name
  //             : item.businesses?.name,
  //         }))
  //       : console.log('No data found');
  //     setBusinesses(dealsData);
  //   }
  //   getDeals();
  // }, []);

  function getTimeRemaining(offerExpiry: string) {
    let expiration_string = '';
    const current = new Date();
    const expiryDate = new Date(offerExpiry);
    const diff = expiryDate.getTime() - current.getTime();

    let msec = diff;
    let dd = Math.floor(msec / 1000 / 60 / 60 / 24);
    msec -= dd * 1000 * 60 * 60 * 24;
    let hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    let mm = Math.floor(msec / 1000 / 60);
    msec -= mm * 1000 * 60;
    let ss = Math.floor(msec / 1000);
    msec -= ss * 1000;

    if (dd >= 1) {
      expiration_string = dd + ' days : ' + hh + ' hrs';
    } else {
      expiration_string = hh + ' hrs : ' + mm + ' mins';
    }

    return 'Offer Expires in ' + expiration_string;
  }
  return (
    <div className='flex flex-col justify-center z-10 w-screen h-full'>
      <div
        id='deal-carousel'
        className='flex absolute bottom-5 items-end px-5 gap-5 overflow-y-auto z-10 w-screen h-full p-3  bg-slate-500 bg-opacity-50'
      >
        {businesses ? (
          businesses.map((business) =>
            business.deals.map((offer: any) => (
              <DealCard
                key={offer.id}
                businessName={business.name}
                dealText={offer.name}
                dealHighlight={getTimeRemaining(offer.expiration_time)}
              />
            ))
          )
        ) : (
          <h1>No businesses</h1>
        )}
      </div>
    </div>
  );
}
