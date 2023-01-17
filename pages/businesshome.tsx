import React from "react";
import Button from "../components/Button/Button";
import DealCard from "../components/DealCard/DealCard";
import Image from "next/image";
import { useRouter } from "next/router";

export default function BusinessAccountDetails() {
  const handleClick = () => {};
  const router = useRouter()
  function redirectToSettings() {
    router.push("/usersettings");
  }
  function redirectToNewDeal() {
    router.push("/newdeal");
  }
  return (
    <div className="bg-slate-800 h-full w-full p-1">
      <header className="flex justify-between items-center border-box pb-4 pr-4 pl-4 mt-5">
        <Image src="/logo.svg" alt="logo" width="100" height="100" />
        <Button onClick={redirectToSettings} buttonText="SETTINGS" />
      </header>
      <div className="flex flex-col justify-center items-center p-5">
        <Button onClick={redirectToNewDeal} buttonText="NEW DEAL" className="w-5/6 h-14 border-indigo-400  "/>

      </div>
      <div className="flex flex-col justify-center items-center gap-5">
        <DealCard
          businessName="Pam's Bakery"
          businessDistance="10m away"
          dealText="Buy one get one free on sausage rolls"
          dealTime=" Offer ends 15:00 21/12/2023"
          dealHighlight="2 Hours remaining"
          onClick={handleClick}
        />
      </div>
    </div>
  );
}
