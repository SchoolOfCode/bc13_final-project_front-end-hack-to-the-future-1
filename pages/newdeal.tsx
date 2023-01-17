import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useProfile } from "../hooks/useProfile";
import Image from "next/image";
import Button from "../components/Button/Button";
import { supabase } from "../supabase";

export default function Newdeal() {
  const { profile } = useProfile();
  const router = useRouter();
  const [offerText, setOfferText] = useState<string>();
  const [startDate, setStartDate] = useState<any>();
  const [endDate, setEndDate] = useState<any>();

  const handleClick = () => {
    router.push("/businesshome"); //<--- CHECK BUSINESS HOME PAGE NAME
  };

  const handleSubmit = async () => {
    const formSubmit  = await supabase
  .from('deals')
  .insert({ offerText, startDate, endDate })
  }

 return (
    <div className="flex flex-col w-full h-screen bg-slate-800">
      <div className="flex flex-col h-screen w-full  justify-start items-center">
        <header className="flex justify-between items-center w-full border-box p-4 mt-5">
          <Image src="/logo.svg" alt="logo" width="100" height="100" />
          <Button onClick={handleClick} buttonText="CANCEL" />
        </header>
      </div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-Open font-bold text-xl text-slate-50">
          Create New Offer
        </h1>
        <form className="flex flex-col justify-start gap-4 items-center text-center h-5/6 w-5/6 max-w-md bg-slate-800 py-10">
          {/* Offer Details text */}
          <label
            htmlFor="offerName"
            className="font-Open text-sm text-amber-500 font-bold w-full text-left"
          >
            What are you offering?
          </label>
          <input
            className="w-full h-14 bg-slate-300 text-slate-800 border-amber-600 border-2 rounded-md font-Open text-sm px-2"
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
            className="w-full h-14 bg-slate-300 text-slate-800 border-amber-600  border-2 rounded-md font-Open text-sm px-2"
            id="start"
            name="start"
            type="datetime-local"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
              console.log("Start Date", startDate);
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
            className="w-full h-14 bg-slate-300 text-slate-800 border-amber-600 border-2 rounded-md font-Open text-sm px-2"
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
      <div className="flex flex-col justify-center items-center py-8">
        <h1 className="font-Open text-sm font-bold text-amber-500 w-full text-center">
          PREVIEW
        </h1>
        <div>
          <p>Card Component</p>
        </div>
        <Button onClick={handleSubmit} buttonText="ADD OFFER" />
      </div>
    </div>
  );
}
