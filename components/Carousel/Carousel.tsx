import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabase';

//Deals constant below is hard-coded data used during development

// const deals: string[] = [
//   "Free Muffin",
//   "50% off fresh loaves",
//   "£5 Coffee and cake",
// ];

//Change from hard-coded deals to data fetched from the database

export interface Deals {
  name: string;
  expiration_time: Date;
  business_id: string;
}

export default function Carousel() {
  const [offers, setOffers] = useState<Deals[]>([]);

  useEffect(() => {
    async function getDeals() {
      const { data } = await supabase.from('deals').select();

      const dealsData: any = data
        ? data.map((item) => ({
            name: item.name,
            business_id: item.business_id,
            expiration_time: item.expiration_time,
          }))
        : console.log('No data found');
      setOffers(dealsData);
    }
    getDeals();
  }, []);

  return (
    <div className='flex flex-col justify-center z-10 '>
      <ul className='flex flex-row px-5 gap-5 overflow-y-auto z-10 '>
        {offers.map((offer, i) => (
          <li
            key={i}
            className='flex-none max-w-10/12 py-10 bg-slate-700 rounded-3xl text-white text-center'
          >
            <h1 className='flex-none text-center max-w-sm text-2xl font-bold my-12 z-10 '>
              {offer.business_id}
            </h1>
            {offer.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
