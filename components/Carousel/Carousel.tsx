import React, { useState, useEffect } from "react";
import { supabase } from "../../supabase";
import { GiSombrero } from "react-icons/gi";
import { RiCake3Line } from "react-icons/ri";
import { RiRestaurantFill } from "react-icons/ri";
import { isTemplateExpression } from "typescript";
import DealCard from "../DealCard/DealCard";
import { useLocation } from "../../hooks/useLocation";


export interface Deals {
  id: string;
  name: string;
  expiration_time: string;
  business_id: string;
  business_name: string;
}

export default function Carousel({ businessData }: any) {

  const [offers, setOffers] = useState<Deals[]>([]);
  //todo type will be what ever is returned from fetch
  const [postcodes,setPostcodes]= useState<any[]>([])
  // long and lat from geolocation (useLocation())
  const {pos} = useLocation()

  
  useEffect(() => {
      const getAllLocalDeals = async () => {
          const deals = await getAllLocalDeals();
          await fetch("http://api.postcodes.io/postcodes", {
            method: "POST",
            headers: { "content-type": "application/json" },
            mode: "cors",
            body: JSON.stringify(geoLocationObj),
          });
          const response = await fetch(`http://api.postcodes.io/postcodes`);
        const localPostcodes = await response.json();
console.log(localPostcodes)
        //localPostcodes needs to be mapped into a new array which we use to update postcodes
        // setPostcodes([array])

        //supaBase fetch goes here :
          // setOffers(deals);
        };
        getAllLocalDeals();
      
      
      
      }, [pos]);
      
      const geoLocationObj ={
        "geolocations" : [ {
          "longitude": pos?.lng ,
          "latitude":  pos?.lat ,
          "radius": 1000
       
        }]
      }

// save the fetch object as variable (localPostcodes) 
// access the fetch object to find postcodes
  //! map through the fetch result and push the postcodes into a new array stored in state
//? store the postcodes in their own states? Do we limit the number of returned postcodes to 5?
//! when fetching from supabase db setting the query to return: 
// * deals WHERE postcode of business matches one of the stored postcode states
//? What is the dependency? 
//! DO NOT let this send infinite requests!! 


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
