'use client'
import React, { ReactNode, useState } from 'react'
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/store";
import { setIsLogined } from "@/store/slices/userSlice";
import Loading from '../common/Loading';
import fetchApi from '@/utils/fetchApi';

export default function Wrapper( {children }:{ children : ReactNode}) {

    const [ isLoanding , setIsLoanding] = useState(true);

    const router = useRouter();
    const dispatch = useAppDispatch();

    useEffect(()=>{
        const verifyRequest = async () => {
            await fetchApi("/api/users/verification" , "GET");
        }

        verifyRequest().then(()=>{

            console.log("Verification completed")
            dispatch(setIsLogined(true))
            setIsLoanding(false)

        }).catch((err)=>{
            console.log("Verification error : " + err)
            setIsLoanding(false)
            router.push("/login")
            
        });

    }, []);

    if(isLoanding){
        return (
            <div className='w-full flex items-center p-10'>
                <Loading/>
            </div>
        )
    }
    else{
        return (
            <>{children}</>
          )
    }

  
}
