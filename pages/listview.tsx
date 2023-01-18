import React, { useState, useEffect } from "react";
import Button from "../components/Button/Button";
import DealCard from "../components/DealCard/DealCard";
import Image from "next/image";
import { useRouter } from "next/router";
import { supabase } from "../supabase";
import { Database } from "../types/supabase";

//should be a type (interface is like a contract)
interface Deals {
  name: string;
  expiration_time: Date;
  business_id: string;
  business_name: string;
}

export default function BusinessAccountDetails() {
  const [offers, setOffers] = useState<Deals[]>([]);
  // const [businessid, setBusinessID] = useState<Deals[]>([])
  useEffect(() => {
    async function getDeals() {
      const { data } = await supabase
        .from("deals")
        .select("*, businesses (name)");
      console.log("Data from supabase", data);

      const dealsData: any = data
        ? data.map((item) => ({
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

  const handleDeleteDeal = () => {};
  // pull down business info and check business_id
  // check that the business_id of the user matches the business_id stored within the currently selected deal
  //query the DB and delete the selected deal from the DB

  //from supabase api doc

  //const { data, error } = await supabase
  // .from('deals')
  // .delete()
  // .eq('id', 'someValue')

  //we need to work out the filter + matching

  const router = useRouter();
  function redirectToSettings() {
    router.push("/usersettings");
  }
  function redirectToNewDeal() {
    router.push("/newdeal");
  }

  return (
    <div className="bg-slate-800 h-full w-full p-1">
      <header className="flex justify-between items-center border-box pr-4 pl-4 mt-5">
        <Image src="/logo.svg" alt="logo" width="100" height="100" />
        <Button onClick={redirectToSettings} buttonText="SETTINGS" />
      </header>
      <div className="flex flex-col justify-center items-center p-3">
        <Button
          onClick={redirectToNewDeal}
          buttonText="NEW DEAL"
          className="w-5/6 h-14 border-indigo-400  "
        />
      </div> 
      <div className="flex flex-col justify-center items-center h-full">
        {offers.map((offer, i) => (
          <DealCard
            key={i}
            businessName={offer.business_name}
            businessDistance="10m away"
            dealText={offer.name}
            dealTime=" Offer ends 15:00 21/12/2023"
            dealHighlight="2 Hours remaining"
            onClick={handleDeleteDeal}
          />
        ))}
      </div>
      {/* <div className="flex flex-col justify-center items-center">
        <DealCard
          businessName="Pam's Bakery"
          businessDistance="10m away"
          dealText="Buy one get one free on sausage rolls"
          dealTime=" Offer ends 15:00 21/12/2023"
          dealHighlight="2 Hours remaining"
          onClick={handleDeleteDeal}
        />
      </div> */}
    </div>
  );
}
