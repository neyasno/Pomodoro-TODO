'use client'
import { tick } from '@/store/slices/timeSlice';
import { useAppDispatch , useAppSelector } from '@/store/store'
import React, { useEffect } from 'react'

export default function Timer() {
    const dispatch = useAppDispatch();
    const state =  useAppSelector((state) => state.time);
    useEffect(()=>{
        console.log("UseEffeck!")
        if(state.isActive){
            setInterval(()=>{
                dispatch(tick())
            },1000)
        }else{

        }
    } ,[state.isActive])
  return (
    <div className='text-7xl text-center'>
        {state.time}
    </div>
  )
}
