import React from "react";
import { RxCross2 } from "react-icons/rx";
import { RiRestaurantFill } from "react-icons/ri";
import { twMerge } from "tailwind-merge";

export interface DealProps {
  businessName?: string;
  businessDistance?: string;
  dealText: string;
  dealTime: string;
  dealHighlight: string;
  onClick?: () => void;
  className?: string;
}
function DealCard({
  businessName,
  businessDistance,
  dealText,
  dealTime,
  dealHighlight,
  onClick,
  className,
}: DealProps) {
  const classes = twMerge(`
  w-4/5 h-1/3 bg-slate-600 flex flex-col rounded-3xl
    ${className ?? ""}
  `);
  return (
    <div id="container" className="w-full h-full flex justify-center ">
      <div id="Card-Container" className={classes}>
        <div id="Delete-Icon" className="flex justify-end items-end p-5">
          <RxCross2 onClick={onClick} className="text-3xl text-slate-50" />
        </div>
        <div
          id="Business-Icon"
          className="flex justify-center pb-5 text-4xl text-slate-50"
        >
          <RiRestaurantFill />
        </div>
        <div
          id="Card-text"
          className="flex flex-col justify-center items-center text-left mb-8"
        >
          <h1 className="font-Open font-bold text-slate-50 text-2xl">
            {businessName}
          </h1>
          <h3 className="font-Open font-semibold text-lime-400 text-md">
            {businessDistance}
          </h3>
          <h2 className="font-Open text-indigo-200 text-xl mb-2">{dealText}</h2>
          <hr className="border-1 w-4/5 border-slate-800 py-2"></hr>
          <p className="font-Open font-light text-slate-200 text-lg">
            {dealTime}
          </p>
          <h3 className="font-Open font-semibold text-amber-500 text-md">
            {dealHighlight}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default DealCard;
