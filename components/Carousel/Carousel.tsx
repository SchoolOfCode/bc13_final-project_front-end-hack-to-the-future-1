import React from "react";

const deals: string[] = [
  "Free Muffin",
  "50% off fresh loaves",
  "£5 Coffee and cake",
];

export default function Carousel() {
  return (
    <div className="flex flex-col justify-center z-10">
      
        <ul className="flex flex-row px-5 gap-5 overflow-y-auto z-10">
          {deals.map((deal, i) => (
            <li
              key={i}
              className="flex-none w-10/12 py-10 bg-slate-700 rounded-3xl text-white text-center"
            >
              <h1 className="flex-none text-center text-2xl font-bold my-12 z-10">
                Deal card
              </h1>
              {deal}
            </li>
          ))}
        </ul>
      
    </div>
  );
}
