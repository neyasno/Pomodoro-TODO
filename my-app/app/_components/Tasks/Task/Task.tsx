'use client'

import { startTimer } from '@/store/slices/timeSlice';
import { useAppDispatch } from '@/store/store'
import React from 'react'

export type TaskProps = {
    title : string , 
    text? : string , 
    deadline? :  Date ,
    isActive : boolean , 
}

export default function Task({title , text , isActive}:TaskProps) {
    const dispatch = useAppDispatch();

    return (
        <li className='flex p-10 gap-3'>
            <div className='flex items-center justify-center p-5'>
                <div className={`rounded-full size-5 ${isActive ? 'bg-blue-400' : 'bg-gray-400'}`}>

                </div>
            </div>
            <div className='flex justify-between items-center w-full gap-10'>
                <div className='flex flex-col'>
                    <p className='text-2xl'>{title}</p>
                    <p>{text}</p>
                </div>
                {isActive && 
                <div className='flex gap-2'>
                    <button className='py-2 px-10 border-white border-2'
                        onClick={(e)=>{
                            e.preventDefault()
                            dispatch(startTimer())
                        }}
                    >Start</button>
                    <button className='py-2 px-10 border-white border-2'>Close</button>
                </div>
                }
            </div>
        </li>
    )
}
