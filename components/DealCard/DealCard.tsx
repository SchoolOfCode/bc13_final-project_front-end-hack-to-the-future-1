import React from "react";
import { RxCross2 } from "react-icons/rx";
import { RiRestaurantFill } from "react-icons/ri";
import { twMerge } from "tailwind-merge";
import { useProfile } from "../../hooks/useProfile";
import ConsumerDeal from "./ConsumerDeal";
import BusinessDeal from "./BusinessDeal";

export interface DealProps {
  businessName?: string;
  dealText: string;
  dealTime?: string;
  dealHighlight: string;
  onClick?: () => void;
  className?: string;
}
function DealCard({
  businessName,
  dealText,
  dealTime,
  dealHighlight,
  onClick,
  className,
}: DealProps) {
  const classes = twMerge(`
  flex flex-none flex-col justify-center w-10/12 h-full p-10 border-box overflow-y-hidden bg-slate-700 rounded-3xl text-white text-center
    ${className ?? ""}
  `);
  const { profile } = useProfile();

  return (
    <div id="card-container" className={classes}>
      {profile?.user_type === "business" ? (
        <div id="Delete-Icon" className="flex justify-end items-end p-5">
          <RxCross2 onClick={onClick} className="text-3xl text-slate-50" />
        </div>
      ) : (
        <div className="flex justify-end items-end p-5"></div>
      )}

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
        {profile?.user_type === "business" ? (
          <BusinessDeal
            businessName={businessName}
            dealTime={dealTime}
            dealText={dealText}
            dealHighlight={dealHighlight}
          />
        ) : (
          <ConsumerDeal
            businessName={businessName}
            dealText={dealText}
            dealHighlight={dealHighlight}
          />
        )}
      </div>
    </div>
  );
}
export default DealCard;
