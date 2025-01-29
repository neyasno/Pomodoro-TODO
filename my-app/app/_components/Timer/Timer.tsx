'use client'
import { ETimerStates, tick } from '@/store/slices/timeSlice';
import { useAppDispatch , useAppSelector } from '@/store/store'
import React, { useEffect } from 'react'

export default function Timer() {
    const dispatch = useAppDispatch();
    const state =  useAppSelector((state) => state.time);
    useEffect(()=>{
        console.log("UseEffeck!")
        if(state.timerState == ETimerStates.WORKING){
            setInterval(()=>{
                dispatch(tick())
            },1000)
        }else{

        }
    } ,[state.timerState])
  return (
    <div className=' flex flex-col text-center'>
        <h1 className=' text-7xl'>{state.time}</h1>
        {state.timerState == ETimerStates.WORKING && <p>Working</p>}
        {state.timerState == ETimerStates.RESTING && <p>Rest</p>}
        {state.timerState == ETimerStates.STOP && <p>Stop</p>}
    </div>
  )
}
