import React, { useState, useEffect } from "react";
import Button from "../components/Button/Button";
import DealCard from "../components/DealCard/DealCard";
import Image from "next/image";
import { useRouter } from "next/router";
import { supabase } from "../supabase";
import { Database } from "../types/supabase";
import { useProfile } from "../hooks/useProfile";

//should be a type (interface is like a contract)
interface Deals {
  name: string;
  expiration_time: string;
  business_id: string;
  business_name: string;
  id: string;
}


export default function BusinessAccountDetails() {
  const [offers, setOffers] = useState<Deals[]>([]);
  const { profile } = useProfile();
 
  useEffect(() => {
    async function getDeals() {
      if (profile) {
        console.log(profile.business_id);
        const { data } = await supabase
          .from("deals")
          .select("*, businesses (id,name)")
          .eq("business_id", profile.business_id);

        console.log("Data from supabase", data);

        if (!data) {
          return
        }
        const dealsData:any =
           data.map((item) => ({
              id: item.id,
              name: item.name,
              business_id: item.business_id,
              expiration_time: item.expiration_time,
              business_name: Array.isArray(item.businesses)
                ? item.businesses[0].name
                : item.businesses?.name,
            }))
           console.log("No data found");
          console.log("this is deals data",dealsData)
        setOffers(dealsData);
        
      }
    }
    getDeals();
  }, [profile]);

  const handleDeleteDeal = async (id:string) => {
    const { data, error } = await supabase
  .from('deals')
  .delete()
  .eq('id', id)
  };
  // pull down business info and check business_id
  // check that the business_id of the user matches the business_id stored within the currently selected deal
  //query the DB and delete the selected deal from the DB

  //from supabase api doc

  

  //we need to work out the filter + matching

  

  function getTimeRemaining (offerExpiry:string) {
      let expiration_string = '';
      const current = new Date();
      const expiryDate = new Date(offerExpiry)
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
      
      return "Offer Expires in " + expiration_string;
  }
  

  const router = useRouter();
  function redirectToSettings() {
    router.push("/businessdetails");
  }
  function redirectToNewDeal() {
    router.push("/newdeal");
  }
//conditional logic
//if there is an offer and its not empty map through everything
//else render only the buttons

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
      {offers?(
      <div className="flex flex-col gap-5 justify-center items-center h-full pt-5">
        {offers.map((offer) => (
          <DealCard
            key={offer.id}
            businessName={offer.business_name}
            dealText={offer.name}
            dealTime={new Date(offer.expiration_time).toLocaleString()}
            dealHighlight={getTimeRemaining(offer.expiration_time)}
            onClick={handleDeleteDeal}
            className="h-80"
            id={offer.id}
          />
        ))}
      </div>

      ):( <div className="flex flex-col gap-5 justify-center items-center h-full pt-5">
      <DealCard 
        businessName="My Business"
        dealText="Example deal"
        dealTime="Offer valid until: "
        dealHighlight="ENDING SOON"
        onClick={handleDeleteDeal}
        className="h-80"
      />
       <DealCard 
        businessName="My Business"
        dealText="Example deal"
        dealTime="Offer valid until: "
        dealHighlight="ENDING SOON"
        onClick={handleDeleteDeal}
        className="h-80"
      />
       <DealCard 
        businessName="My Business"
        dealText="Example deal"
        dealTime="Offer valid until: "
        dealHighlight="ENDING SOON"
        onClick={handleDeleteDeal}
        className="h-80"
      />
      </div>

      )}
    </div>
  );
}
