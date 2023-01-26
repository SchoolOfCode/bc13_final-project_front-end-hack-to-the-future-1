import React from 'react';
import { twMerge } from 'tailwind-merge';
import { useBusiness } from '../../hooks/useBusiness';
import { RxCross2 } from 'react-icons/rx';
import { RiRestaurantFill } from 'react-icons/ri';
import BusinessIcon from '../BusinessIcon/BusinessIcon';

export interface BusinessDealProps {
  id: string;
  businessName: string;
  dealTime: string;
  dealText: string;
  onClick?: (id: string) => void;
  dealHighlight: String;
  className?: string;
  page?: string;
}

/**
 * Deal card component for business use. Includes the delete functionality.
 * @param dealText String - The description of the offer
 * @param businessName String - The name of your business, pre-populated
 * @param id String - The id of the deal, used for deletion
 * @param onClick Function - The delete function used when the cross is clicked
 * @param dealTime String - The end date & time of the deal
 * @param dealHighlight String - The time remaining on the deal
 * @param className String - The TailWindCSS used to style the card
 * @param page String - The page the user is on, and whether the preview is used or not
 * @returns
 */
export default function BusinessDeal({
  dealText,
  businessName,
  id,
  onClick,
  dealTime,
  dealHighlight,
  className,
  page,
}: BusinessDealProps) {
  const classes = twMerge(`
    flex
    flex-none
    flex-col
    justify-center
    gap-10
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
    text-center
    shadow-md
    shadow-slate-900
    ${className ?? ''}
  `);
  const { business } = useBusiness();
  return (
    <div id='card-container' className={classes}>
      {page === 'newdeal' ? (
        <BusinessIcon
          className='flex justify-center  pt-5 text-4xl xl:text-6xl  text-slate-50'
          businessType={business?.business_type}
        />
      ) : (
        <div id='Delete-Icon' className='flex justify-end items-end px-5 '>
          {onClick ? (
            <RxCross2
              onClick={() => {
                onClick(id);
              }}
              className='text-3xl xl:text-5xl text-slate-50 cursor-pointer hover:text-red-600'
            />
          ) : (
            <></>
          )}
        </div>
      )}
      <div className='flex flex-col justify-center items-center text-center mb-8'>
        <h1 className='font-Open font-bold text-slate-50 text-2xl xl:text-3xl'>
          {businessName}
        </h1>
        <h2 className='font-Open text-indigo-200 text-xl xl:text-2xl mb-2 break-normal'>
          {dealText}
        </h2>
        <hr className='border-1 w-4/5 border-slate-800 py-2'></hr>
        <h3 className='font-Open font-semibold text-slate-200 text-md xl:text-xl'>
          {dealTime}
        </h3>
        <h3 className='font-Open font-semibold text-amber-500 text-md xl:text-xl'>
          {dealHighlight}
        </h3>
      </div>
      <div></div>
    </div>
  );
}
