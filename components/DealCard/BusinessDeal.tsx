import React from 'react'
import { DealProps } from './DealCard'

function BusinessDeal({businessName,dealText,dealTime,dealHighlight}:DealProps) {
  return (
    <div className="flex flex-col justify-center items-center text-left mb-8">
    <h1 className="font-Open font-bold text-slate-50 text-2xl">
      {businessName}
    </h1>
    <h2 className="font-Open text-indigo-200 text-xl mb-2">
      {dealText}
    </h2>
    <hr className="border-1 w-4/5 border-slate-800 py-2"></hr>
    <p className="font-Open font-light text-slate-200 text-lg">
      {dealTime}
    </p>
    <h3 className="font-Open font-semibold text-amber-500 text-md">
      {dealHighlight}
    </h3>
  </div>
  )
}

export default BusinessDeal