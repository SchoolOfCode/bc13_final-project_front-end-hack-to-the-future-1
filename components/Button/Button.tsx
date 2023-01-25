import { twMerge } from 'tailwind-merge';
import React from 'react';
export interface ButtonProps {
  buttonText: string;
  onClick: (event: any) => void;
  className?: string;
}

/**
 * A universal button component that acts based on a given onClick parameter
 * @param function onClick - The functionality desired from the button.
 * @param string className - The TailwindCSS used to style the component
 * @param string buttonText - The text displayed on the button
 * @returns A React component, a clickable button
 */
export default function Button({
  buttonText,
  onClick,
  className,
}: ButtonProps) {
  const classes = twMerge(`
    border-2
    bg-indigo-400
    box-border
    h-10
    w-32
    border-indigo-400
    text-slate-800
    rounded-md
    shadow-md
    shadow-slate-900
    font-Open
    font-semibold
    z-10
    hover:bg-indigo-300 
    hover:border-indigo-300
    hover:text-slate-900 
    ${className ?? ''}
  `);
  return (
    <button onClick={onClick} className={classes} data-cy={buttonText}>
      {buttonText}
    </button>
  );
}
