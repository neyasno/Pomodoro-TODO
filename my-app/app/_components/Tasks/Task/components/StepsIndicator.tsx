import React from 'react'

export default function StepsIndicator({steps , steps_amount} : {steps : number , steps_amount : number }) {

  return (
    <div className='flex gap-1 flex-wrap p-2'>
            {Array.from({length : steps}).map((item ,index)=><div key={index} className='size-1 rounded-full bg-blue-400'></div>)}
            {Array.from({length : steps_amount-steps}).map((item ,index)=><div key={index} className='size-1 rounded-full bg-gray-500'></div>)}
    </div>
  )
}
