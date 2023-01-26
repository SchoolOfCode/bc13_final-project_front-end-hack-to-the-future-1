import React from "react";
import { useMap } from "react-leaflet";
import { useLocalBusinesses } from "../../hooks/useLocalBusinesses";
import getTimeRemaining from "../../helperFunctions/getTimeRemaining";
import ConsumerDeal from "../DealCard/ConsumerDeal";

/**
 * The card carousel component, which maps the available offers to show as individual, scrollable cards
 * @returns A React component, a scrollable card carousel
 */
export default function Carousel() {
  const { businesses } = useLocalBusinesses();
  const map = useMap();

  function flyToBusiness(lat: number, lon: number) {
    if (map) {
      map.flyTo([lat, lon], 18);
    }
  }

  return (
    <div
      className="flex flex-col justify-center z-10 w-screen h-full"
      id="carousel"
    >
      <div
        id="deal-carousel"
        className="flex absolute bottom items-end px-5 gap-5 overflow-y-auto overflow-x-auto z-12 w-screen h-full p-3  bg-slate-900 bg-opacity-30"
      >
        {businesses ? (
          businesses.map((business) =>
            business.deals.map((offer: any) => (
              <ConsumerDeal
                key={offer.id}
                businessName={business.name}
                businessType={business.business_type}
                dealText={offer.name}
                dealHighlight={getTimeRemaining(offer.expiration_time)}
                onClick={() => flyToBusiness(business.lat, business.lon)}
              />
            ))
          )
        ) : (
          <h1>No businesses</h1>
        )}
      </div>
    </div>
  );
}
