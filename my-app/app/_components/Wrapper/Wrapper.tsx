'use client'
import React, { ReactNode, useState } from 'react'
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/store";
import { changeIsLogined } from "@/store/slices/userSlice";

export default function Wrapper( {children }:{ children : ReactNode}) {

    const [ isLoanding , setIsLoanding] = useState(true);

    const router = useRouter();
    const dispatch = useAppDispatch();

    useEffect(()=>{
        const verifyUser = async () => {
        const token = {
            token : localStorage.getItem('token')
        }
        console.log("STORED TOKEN : " + token.token)
        await fetch("/api/users/verification" , {method : "POST" , body : JSON.stringify(token)});
    };

    verifyUser().then(()=>{
        console.log("Verification completed")
        dispatch(changeIsLogined())
        setIsLoanding(false)
    }).catch((err)=>{
        console.log("Verification error : " + err)
        router.push("/login")
        
    });

    }, []);

    if(isLoanding){
        return (
            <div>Loanding...</div>
        )
    }
    else{
        return (
            <div>{children}</div>
          )
    }

  
}
