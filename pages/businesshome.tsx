import React from "react";
import DealCard from "../components/DealCard/DealCard";

export default function BusinessAccountDetails() {
  const handleClick = () =>{}
  return <div className="bg-slate-800 h-screen w-full p-5">
    <DealCard businessName="Pam's Bakery"businessDistance="10m away" dealText="Buy one get one free on sausage rolls" dealTime=" Offer ends 15:00 21/12/2023" dealHighlight="2 Hours remaining" onClick={handleClick}/>
  </div>;
}
