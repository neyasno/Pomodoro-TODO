'use client'
import React, { ReactNode, useState } from 'react'
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/store";
import { setIsLogined } from "@/store/slices/userSlice";
import Image from 'next/image';

export default function Wrapper( {children }:{ children : ReactNode}) {

    const [ isLoanding , setIsLoanding] = useState(true);

    const router = useRouter();
    const dispatch = useAppDispatch();

    useEffect(()=>{
        const verifyRequest = async () => {
        const token = localStorage.getItem('token')

        console.log("STORED TOKEN : " + token)

        const response = await fetch("/api/users/verification" , {method : "GET" , headers : {
            authorization : `Bearer ${token}`
        }});

        if(!response.ok)
            throw new Error("Verification failed");
        };

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
            <div className='w-full p-10'>
                <Image alt='' src='/load.gif' width={50} height={50}/> 
            </div>
        )
    }
    else{
        return (
            <div>{children}</div>
          )
    }

  
}
