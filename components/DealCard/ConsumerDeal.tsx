import React from "react";
import { twMerge } from "tailwind-merge";
import { RiRestaurantFill } from "react-icons/ri";

export interface ConsumerDealProps {
  businessName?: string;
  dealText: string;
  dealHighlight: String;
  className?: string;
}

export default function ConsumerDeal({
  businessName,
  dealText,
  dealHighlight,
  className,
}: ConsumerDealProps) {
  const classes = twMerge(`
    flex
    flex-none
    flex-col
    justify-center
    w-80
    h-full
    p-10
    border-box
    overflow-y-hidden
    bg-slate-700
    rounded-3xl
    text-white
    text-center
    shadow-md
    shadow-slate-900
    ${className ?? ""}
  `);
  return (
    <div id="card-container" className={classes}>
      <div
        id="Business-Icon"
        className="flex justify-center py-5 text-4xl text-slate-50"
      >
        <RiRestaurantFill />
      </div>
      <div className="flex flex-col justify-center items-center text-center mb-8">
        <h1 className="font-Open font-bold text-slate-50 text-2xl">
          {businessName}
        </h1>
        <h2 className="font-Open text-indigo-200 text-xl mb-2">{dealText}</h2>
        <hr className="border-1 w-4/5 border-slate-800 py-2"></hr>
        <h3 className="font-Open font-semibold text-amber-500 text-md">
          {dealHighlight}
        </h3>
      </div>
    </div>
  );
}
