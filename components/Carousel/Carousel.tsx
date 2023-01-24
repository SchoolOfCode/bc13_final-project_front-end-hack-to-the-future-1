import React from "react";
import DealCard from "../DealCard/DealCard";
import { useLocalBusinesses } from "../../hooks/useLocalBusinesses";
import getTimeRemaining from "../../helperFunctions/getTimeRemaining";

export default function Carousel() {
  const { businesses } = useLocalBusinesses();

  return (
    <div className="flex flex-col justify-center z-10 w-screen h-full">
      <ul
        id="deal-carousel"
        className="flex absolute bottom-5 items-end px-5 gap-5 overflow-y-auto z-10 w-screen h-full"
      >
        {businesses ? (
          businesses.map((business) =>
            business.deals.map((offer: any) => (
              <DealCard
                key={offer.id}
                businessName={business.name}
                dealText={offer.name}
                dealHighlight={getTimeRemaining(offer.expiration_time)}
              />
            ))
          )
        ) : (
          <h1>No businesses</h1>
        )}
      </ul>
    </div>
  );
}
