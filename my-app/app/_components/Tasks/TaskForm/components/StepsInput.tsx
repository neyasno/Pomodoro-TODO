import React from 'react'

type StepsInputProps ={
    handleChange : (value : number)=>void
    value : number
}

export default function StepsInput({value , handleChange}:StepsInputProps) {

  return (
    <div className='flex gap-4 items-center'>
        <p className='w-1/2 text-center'>Steps : </p>
        <input type="number" value={value}
        className='px-3 py-2 border-2 border-black dark:border-white w-full bg-transparent'
        onChange={e => handleChange(Number.parseInt(e.target.value))}/>
    </div>
  )
}
