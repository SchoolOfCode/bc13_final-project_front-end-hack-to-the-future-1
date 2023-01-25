import React, { useState, useEffect } from "react";
import Button from "../components/Button/Button";
import Image from "next/image";
import { useRouter } from "next/router";
import { supabase } from "../supabase";
import { useBusiness } from "../hooks/useBusiness";
import BusinessDeal from "../components/DealCard/BusinessDeal";
import getTimeRemaining from "../helperFunctions/getTimeRemaining";

interface Deals {
  name: string;
  expiration_time: string;
  business_id: string;
  business_name: string;
  id: string;
}

export default function BusinessHome() {
  const [offers, setOffers] = useState<Deals[]>([]);
  const { business } = useBusiness();

  useEffect(() => {
    async function getDeals() {
      if (business) {
        const { data } = await supabase
          .from("deals")
          .select("*, businesses (id, name)")
          .eq("business_id", business.id);

        if (!data) {
          return;
        }
        const dealsData: any = data.map((item) => ({
          id: item.id,
          name: item.name,
          business_id: item.business_id,
          expiration_time: item.expiration_time,
          business_name: Array.isArray(item.businesses)
            ? item.businesses[0].name
            : item.businesses?.name,
        }));
        console.log("No data found");
        console.log("this is deals data", dealsData);
        setOffers(dealsData);
      }
    }
    getDeals();
  }, [business]);

  const handleDeleteDeal = async (id: string) => {
    const { data, error } = await supabase.from("deals").delete().eq("id", id);
    router.reload();
  };

  const router = useRouter();
  function redirectToSettings() {
    router.push("/businessdetails");
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
          className="w-5/6 md:w-128 h-14 border-indigo-400  "
        />
      </div>
      {offers.length > 0 ? (
        <div className="flex flex-wrap w-full h-full justify-center items-center gap-5 pt-5">
          {offers.map((offer) => (
            <BusinessDeal
              key={offer.id}
              dealText={offer.name}
              businessName={offer.business_name}
              dealTime={new Date(offer.expiration_time).toLocaleString()}
              dealHighlight={getTimeRemaining(offer.expiration_time)}
              onClick={handleDeleteDeal}
              id={offer.id}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-5 justify-center items-center h-full pt-5">
          <BusinessDeal
            id={"1"}
            key={1}
            businessName="No Active Deals"
            dealText=""
            dealTime=""
            dealHighlight="Select 'New Deal' above to add a deal for your business!"
          />
        </div>
      )}
    </div>
  );
}
