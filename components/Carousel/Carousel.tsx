import React, { useState, useEffect } from "react";
import { supabase } from "../../supabase";

import { isTemplateExpression } from "typescript";
import DealCard from "../DealCard/DealCard";
import { useLocation } from "../../hooks/useLocation";
import { PostcodesFetch } from "../../types/fetch";

export interface Deals {
  id: string;
  expiration_time: string;
  business_id: string;
  business_name: string;
  address_id: string | null;
  business_type: string | null;
  created_at: string | null;
  lat: number | null;
  lon: number | null;
  name: string;
  website: string | null;
}

export default function Carousel({ businessData }: any) {
  const [offers, setOffers] = useState<Deals[]>([]);
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

        // setOffers(deals);
      };
      getAllLocalPostcodes();
    }
  }, [pos]);
  console.log("Postcodes state", postcodes);

  useEffect(() => {
    const getAllLocalDeals = async () => {
      const { data } = await supabase
        .from("businesses")
        .select("*, deals (id,name,expiration_time, created_at)")
        .in("postcode", [postcodes]);
      console.log("deals", data, postcodes);
      setOffers(data);
    };
    getAllLocalDeals();
  }, [postcodes]);

  useEffect(() => {
    console.log(offers);
  }, [offers]);

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
  //     setOffers(dealsData);
  //   }
  //   getDeals();
  // }, []);

  function getTimeRemaining(offerExpiry: string) {
    let expiration_string = "";
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
      expiration_string = dd + " days : " + hh + " hrs";
    } else {
      expiration_string = hh + " hrs : " + mm + " mins";
    }

    return "Offer Expires in " + expiration_string;
  }
  return (
    <div className="flex flex-col justify-center z-10 w-screen h-full">
      <ul
        id="deal-carousel"
        className="flex absolute bottom-5 items-end px-5 gap-5 overflow-y-auto z-10 w-screen h-full"
      >
        {offers ? (
          offers.map((business) =>
            business.deals.map((offer) => (
              <DealCard
                key={offer.id}
                businessName={business.name}
                dealText={offer.name}
                dealHighlight={getTimeRemaining(offer.expiration_time)}
              />
            ))
          )
        ) : (
          <h1>No Offers</h1>
        )}
      </ul>
    </div>
  );
}
