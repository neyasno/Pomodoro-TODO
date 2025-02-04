import React from 'react'

export default function DeadlineInput({setDeadline} : {setDeadline : (value: React.SetStateAction<string>) => void}) {
  return (
    <div className='flex gap-4 items-center'>
            <p className='w-1/2 text-center'>Deadline : </p>
            <input type="date" className='border-black dark:border-white border-2 p-2  bg-transparent outline-none w-full'  placeholder='Date' 
                onChange={ e=> {
                    e.preventDefault()
                    setDeadline(e.target.value)
                }}/>
        </div>
  )
}
