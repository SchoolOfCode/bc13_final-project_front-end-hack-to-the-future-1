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
  dealHighlight: String;
  onClick?: (id: string) => void;
  className?: string;
  id?: string;
}
function DealCard({
  businessName,
  dealText,
  dealTime,
  dealHighlight,
  onClick,
  className,
  id,
}: DealProps) {
  const classes = twMerge(`

  flex flex-none flex-col justify-center w-10/12 h-full p-10 border-box overflow-y-hidden bg-slate-700 rounded-3xl text-white text-center shadow-md shadow-slate-900
    ${className ?? ""}

  `);
  const { profile } = useProfile();

  return (
    <div id="card-container" className={classes}>
      {profile?.user_type === "business" && id && onClick ? (
        <div id="Delete-Icon" className="flex justify-end items-end p-5">
          <RxCross2
            onClick={() => {
              onClick(id);
            }}
            className="text-3xl text-slate-50"
          />
        </div>
      ) : (
        <div className="flex justify-end items-end p-5"></div>
      )}

      <div
        id="Business-Icon"
        className="flex justify-center py-5 text-4xl text-slate-50"
      >
        <RiRestaurantFill />
      </div>
      <div
        id="Card-text"
        className="flex flex-col justify-center items-center text-center mb-8"
      >
        {profile?.user_type === "business" ? (
          <BusinessDeal
            businessName={businessName}
            dealTime={dealTime}
            dealText={dealText}
            dealHighlight={dealHighlight}
            id={id}
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
