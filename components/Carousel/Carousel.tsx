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
  expiration_time: Date;
  business_id: string;
  business_name: string;
}

export default function Carousel({ businessData }: any) {
  //   Storing the props object in a variable.

  //Map through offers. Compare offers.business_id with businessData.business_id. If match replace offers.business_name with businessData.name. Update a mergedInfo state with the new array.
  const [offers, setOffers] = useState<Deals[]>([]);

  // useEffect(() => {
  //   let updatedOffers: any = [];
  //   offers.forEach((item1) => {
  //     businessData.forEach((item2: any) => {
  //       if (item1.business_id === item2.business_id) {
  //         item1.business_name = item2.name;
  //         updatedOffers.push(item1);
  //       }
  //     });
  //   });
  //   setOffers(updatedOffers);
  // }, [businessData]);

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
            dealHighlight="hello"
          />
          // <li
          //   key={i}
          //   id="deal-card"
          //   className="flex-none min-w-80 w-10/12 py-10 px-10 bg-slate-700 rounded-3xl text-white text-center h-full border-box overflow-y-hidden"
          // >
          //   <div
          //     id="b-type-icon"
          //     className="flex justify-center flex-wrap max-w-sm max-h-sm z-10"
          //   >
          //     <RiRestaurantFill size="2rem" />
          //   </div>
          //   <h1
          //     id="business-name"
          //     className="flex justify-center items-center text-center flex-wrap max-w-sm text-2xl font-bold my-4 z-10 "
          //   >
          //     {offer.business_name}
          //   </h1>
          //   {offer.name}
          // </li>
        ))}
      </ul>
    </div>
  );
}
