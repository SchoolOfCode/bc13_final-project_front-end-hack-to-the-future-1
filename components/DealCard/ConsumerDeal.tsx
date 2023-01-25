import React from "react";
import { twMerge } from "tailwind-merge";
import L from "leaflet";
import BusinessIcon from "../BusinessIcon/BusinessIcon";

export interface ConsumerDealProps {
  businessName?: string;
  businessType?: string;
  dealText: string;
  dealHighlight: String;
  className?: string;
  onClick: () => void;
}

export default function ConsumerDeal({
  businessName,
  businessType,
  dealText,
  dealHighlight,
  className,
  onClick,
}: ConsumerDealProps) {
  const classes = twMerge(`
    flex
    flex-none
    flex-col
    justify-center
    w-60
    md:w-80
    h-full
    p-10
    gap-3
    border-box
    overflow-y-hidden
    bg-slate-700
    rounded-3xl
    text-white
    text-center
    shadow-md
    shadow-slate-900
    hover:ring-4
    hover:ring-indigo-400
    hover:bg-slate-600
    ${className ?? ""}
  `);

  return (
    <div id="card-container" className={classes} onClick={onClick}>
      <BusinessIcon businessType={businessType} />
      <div className="flex flex-col justify-center items-center text-center ">
        <h1 className="font-Open font-bold text-slate-50 text-md md:text-2xl">
          {businessName}
        </h1>
        <h2 className="font-Open text-indigo-200 text-sm md:text-xl mb-2">
          {dealText}
        </h2>
        <hr className="border-1 w-4/5 border-slate-800 py-1"></hr>
        <h3 className="font-Open font-semibold text-amber-500 text-sm md:text-lg">
          {dealHighlight}
        </h3>
      </div>
    </div>
  );
}
