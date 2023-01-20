import React, { useState, useEffect } from "react";
import { supabase } from "../../supabase";
import { GiSombrero } from "react-icons/gi";
import { RiCake3Line } from "react-icons/ri";
import { RiRestaurantFill } from "react-icons/ri";
import { isTemplateExpression } from "typescript";
import DealCard from "../DealCard/DealCard";

//Deals constant below is hard-coded data used during development

// const deals: string[] = [
//   "Free Muffin",
//   "50% off fresh loaves",
//   "£5 Coffee and cake",
// ];

//Change from hard-coded deals to data fetched from the database

export interface Deals {
  id: string;
  name: string;
  expiration_time: string;
  business_id: string;
  business_name: string;
}

export default function Carousel({ businessData }: any) {
  //   Storing the props object in a variable.

  //Map through offers. Compare offers.business_id with businessData.business_id. If match replace offers.business_name with businessData.name. Update a mergedInfo state with the new array.
  const [offers, setOffers] = useState<Deals[]>([]);

// api.postcodes.io/postcodes
// send a POST request to postcode.io reverse geolocator
// {
//   "geolocations" : [ {
//     "longitude": -2.49690382054704,
//     "latitude": 53.5351312861402,
//     "radius": 800
 
//   }]
// }

// useEffect(() => {
//   const getUsers = async () => {
//     const users = await fetchUsers();
//     setUsers(users);
//   };

//   getUsers(); // run it, run it

//   return () => {
//     // this now gets called when the component unmounts
//   };
// }, []);

// await fetch("http://localhost:3001/api/posts", {
//       method: "POST",
//       headers: { "content-type": "application/json" },
//       mode: "cors",
//       body: JSON.stringify(newObj),
//     });
//     const response = await fetch(`http://localhost:3001/api/posts`);
//     const data = await response.json();

// long and lat from geolocation (useGeo())
// save the fetch object as variable 
// access the fetch object to find postcodes
// store the postcodes in their own states
// when fetching from supabase db setting the query to return ALL deals
// WHERE postcode of business matches one of the stored postcode states
// What is the dependency? 
// will this send infinite requests? 


  useEffect(() => {
    async function getDeals() {
      const { data } = await supabase
        .from("deals")
        .select("*, businesses (name)");
      console.log("Data from supabase", data);

      const dealsData: any = data
        ? data.map((item) => ({
            id: item.id,
            name: item.name,
            business_id: item.business_id,
            expiration_time: item.expiration_time,
            business_name: Array.isArray(item.businesses)
              ? item.businesses[0].name
              : item.businesses?.name,
          }))
        : console.log("No data found");
      setOffers(dealsData);
    }
    getDeals();
  }, []);

  function getTimeRemaining(offerExpiry:string) {
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
        {offers.map((offer) => (
          <DealCard
            key={offer.id}
            businessName={offer.business_name}
            dealText={offer.name}
            dealHighlight={getTimeRemaining(offer.expiration_time)}
          />
        ))}
      </ul>
    </div>
  );
}
