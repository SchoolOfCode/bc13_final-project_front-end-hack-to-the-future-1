import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Button from "../components/Button/Button";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import BusinessDeal from "../components/DealCard/BusinessDeal";
import { useBusiness } from "../hooks/useBusiness";
import getTimeRemaining from "../helperFunctions/getTimeRemaining";

export default function Newdeal() {
  const supabase = useSupabaseClient();
  const user = useUser();
  const router = useRouter();
  const { business } = useBusiness();
  const [offerText, setOfferText] = useState<any>();
  const [startDate, setStartDate] = useState<any>();
  const [endDate, setEndDate] = useState<any>();

  /* function to return to businesshome  */

  const tobusinesshome = () => {
    router.push("/businesshome");
  };

  /* submits the newly created offer to the deals table in database */
  const handleSubmit = async () => {
    const response = await supabase
      .from("deals")
      .insert({
        name: offerText,
        created_at: startDate,
        expiration_time: endDate,
        business_id: business?.id,
        user_id: user?.id,
      })
      .select()
      .single();
    router.push("/businesshome");
  };

  return (
    <div className="flex flex-col w-full h-full bg-slate-800 pb-10">
      <div className="flex flex-col w-full  justify-start items-center">
        <header className="flex justify-between items-center w-full border-box pt-4 px-4 mt-5">
          <Image src="/logo.svg" alt="logo" width="100" height="100" />
          <Button onClick={tobusinesshome} buttonText="CANCEL" />
        </header>
      </div>
      <div className="flex flex-col justify-start items-center pb-10">
        <h1 className="font-Open font-bold text-xl text-slate-50 pb-10">
          Create New Offer
        </h1>
        <form className="flex flex-col justify-start gap-4 items-center text-center h-5/6 w-5/6 max-w-md bg-slate-800">
          {/* Offer Details text */}
          <label
            htmlFor="offerName"
            className="font-Open text-sm text-amber-500 font-bold w-full text-left"
          >
            What are you offering?
          </label>
          <input
            className="w-full h-14 bg-slate-300 text-slate-800 border-amber-600 border-2 rounded-md font-Open text-sm px-2 focus:ring-indigo-400 focus:ring-4"
            id="offerName"
            name="offerName"
            value={offerText}
            onChange={(e) => {
              setOfferText(e.target.value);
            }}
          />
          {/* Start Date/Time */}
          <label
            htmlFor="start"
            className="font-Open text-sm font-bold text-amber-500 w-full text-left"
          >
            Offer Start:
          </label>
          <input
            className="w-full h-14 bg-slate-300 text-slate-800 border-amber-600  border-2 rounded-md font-Open text-sm px-2 focus:ring-indigo-400 focus:ring-4"
            id="start"
            name="start"
            type="datetime-local"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
            }}
          />
          {/* End Date/Time */}
          <label
            htmlFor="End"
            className="font-Open text-sm first-line:font-bold text-amber-500 w-full text-left"
          >
            Offer End:
          </label>
          <input
            className="w-full h-14 bg-slate-300 text-slate-800 border-amber-600 border-2 rounded-md font-Open text-sm px-2 focus:ring-indigo-400 focus:ring-4"
            id="End"
            name="End"
            type="datetime-local"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
            }}
          />
        </form>
      </div>
      <div
        id="Card, Preview & Button"
        className="flex flex-col justify-center items-center w-full h-85"
      >
        <Button onClick={handleSubmit} buttonText="ADD OFFER" className="mb-6"/>
        <h1 className="font-Open text-sm font-bold text-amber-500 w-full text-center">
          PREVIEW
        </h1>

        <div
          id="DealCard container"
          className="flex justify-center items-center h-full min-h-full py-3  w-full"
        >
          {business ? (
            <BusinessDeal
            id={business.id}
            businessName={business.name}
            dealText={offerText ? offerText : "Your Offer Here"}
            dealHighlight={
              endDate ? getTimeRemaining(endDate) : "Time Remaining"
            }
            dealTime={
              endDate ? new Date(endDate).toLocaleString() : "Deal End Date"
            }
            />
            ) : (
              <></>
              )}
              </div>
            </div>
    </div>
  );
}
