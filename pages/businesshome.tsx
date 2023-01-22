import React, { useState, useEffect } from "react";
import Button from "../components/Button/Button";
import DealCard from "../components/DealCard/DealCard";
import Image from "next/image";
import { useRouter } from "next/router";
import { supabase } from "../supabase";
import { useBusiness } from "../hooks/useBusiness";

interface Deals {
  name: string;
  expiration_time: Date;
  business_id: string;
  business_name: string;
}

export default function BusinessAccountDetails() {
  const [offers, setOffers] = useState<Deals[]>([]);
  const { business } = useBusiness();
  useEffect(() => {
    async function getDeals() {
      if (business) {
        const { data } = await supabase
          .from("deals")
          .select("*, businesses (id, name)")
          .eq("business_id", business.id);

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
    }
    getDeals();
  }, [business]);

  const handleDeleteDeal = () => {};

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
          className="w-5/6 h-14 border-indigo-400  "
        />
      </div>
      <div className="flex flex-col gap-5 justify-center items-center h-full pt-5">
        {offers.length ? (
          offers.map((offer, i) => (
            <DealCard
              key={i}
              businessName={offer.business_name}
              dealText={offer.name}
              dealTime=" Offer ends 15:00 21/12/2023"
              dealHighlight="2 Hours remaining"
              onClick={handleDeleteDeal}
              className="h-80"
            />
          ))
        ) : (
          <h1 className="font-Open font-bold text-xl text-slate-50">
            No Active Offers
          </h1>
        )}
      </div>
    </div>
  );
}
