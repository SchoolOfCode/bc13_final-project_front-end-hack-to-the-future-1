import React from "react";
import { twMerge } from "tailwind-merge";
import { useBusiness } from "../../hooks/useBusiness";
import { RxCross2 } from "react-icons/rx";
import { RiRestaurantFill } from "react-icons/ri";

export interface BusinessDealProps {
  id: string;
  businessName: string;
  dealTime: string;
  dealText: string;
  onClick?: (id: string) => void;
  dealHighlight: String;
  className?: string;
}

export default function BusinessDeal({
  dealText,
  businessName,
  id,
  onClick,
  dealTime,
  dealHighlight,
  className,
}: BusinessDealProps) {
  const classes = twMerge(`
    flex
    flex-none
    flex-col
    justify-center
    w-80
    md:w-120
    xl:w-124
    h-80
    md:h-120
    xl:h-124
    p-10
    border-box
    overflow-y-hidden
    bg-slate-700
    rounded-3xl
    text-slate-50
    text-center
    shadow-md
    shadow-slate-900
    ${className ?? ""}
  `);
  const { business } = useBusiness();
  return (
    <div id="card-container" className={classes}>
      <div className="flex justify-between items-center">
        <div
          id="Business-Icon"
          className="flex justify-center  py-5 text-4xl xl:text-5xl  text-slate-50"
        >
          <RiRestaurantFill />
        </div>
        <div id="Delete-Icon" className="flex justify-end items-end p-5">
          {onClick ? (
            <RxCross2
              onClick={() => {
                onClick(id);
              }}
              className="text-3xl xl:text-5xl text-slate-50 cursor-pointer"
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center text-center mb-8">
        <h1 className="font-Open font-bold text-slate-50 text-2xl xl:text-3xl">
          {businessName}
        </h1>
        <h2 className="font-Open text-indigo-200 text-xl xl:text-2xl mb-2 break-normal">{dealText}</h2>
        <hr className="border-1 w-4/5 border-slate-800 py-2"></hr>
        <h3 className="font-Open font-semibold text-slate-200 text-md xl:text-xl">
          {dealTime}
        </h3>
        <h3 className="font-Open font-semibold text-amber-500 text-md xl:text-xl">
          {dealHighlight}
        </h3>
      </div>
    </div>
  );
}
