import { twMerge } from "tailwind-merge";
import React, { useEffect, useRef } from "react";
import { IoStorefront } from "react-icons/io5";
import { AiFillShopping } from "react-icons/ai";
import { RiRestaurantFill } from "react-icons/ri";
import { IoIosHappy } from "react-icons/io";

export interface ButtonProps {
  businessType: string | undefined;
  className?: string;
}

/**
 * An icon component that renders one of multiple icons to represent a business, based on its type
 * @param string className - The TailwindCSS used to style the component
 * @param string businessType - The type of the business. used to determine which icon to render
 * @returns A React component, a clickable button
 */
export default function BusinessIcon({ businessType, className }: ButtonProps) {
  const classes = twMerge(`
  flex justify-center py-2 mt-2 text-2xl md:text-4xl text-slate-50
    ${className ?? ""}
  `);

  let businessIconRef = useRef(<IoStorefront />);

  useEffect(() => {
    switch (businessType) {
      case "Food/Drink":
        businessIconRef.current = <RiRestaurantFill />;
        break;
      case "Retail":
        businessIconRef.current = <AiFillShopping />;
        break;
      case "Entertainment":
        businessIconRef.current = <IoIosHappy />;
        break;
      default:
      // code block
    }
  }, [businessType]);

  return <div className={classes}>{businessIconRef.current}</div>;
}
