'use client'
import { setIsLogined } from '@/store/slices/userSlice';
import { useAppDispatch } from '@/store/store';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import TextInput from '../_components/common/TextInput';


export default function Page() {

    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [error , setError] = useState('');

    const [isLoanding , setIsLoanding] = useState(false);

    const dispatch = useAppDispatch()

    const router = useRouter();
    

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setError("")
        if(password && !isLoanding){

            const loginUser = async () => {

                const userData = {
                    email:email,
                    password : password , 
                }
                
                try{
                    const response = await fetch("/api/users/login" , {method : "POST" , body : JSON.stringify(userData)});

                    if(!response.ok){
                        const errorData = await response.json();
                        throw new Error(errorData.error || "Login error");                    
                    }

                    return await response.json();
                }
                catch (error) {
                    throw new Error(`Login error: ${error}`);
                }
            };
        
            loginUser().then((res)=>{
                console.log("Login success!" + res.token)
                
                document.cookie = `token=${res.token}; path=/; max-age=60000; Secure`;
                localStorage.setItem("token" , res.token)

                dispatch(setIsLogined(true))
                router.push("/")
                
            }).catch((err)=>{
                console.log("Login error!" , err)
                setError("Login error")
                setIsLoanding(false)
            });
        }
        else{
            setError("Passwords not match")
        }
    }

    
  return (
    <div className='w-full flex items-center justify-center'>
        <form action="" className='lg:w-1/4 flex flex-col items-center gap-4
                                    md:w-1/3'>

        <h1 className='text-3xl'>Login</h1>
        <TextInput value={email} placeholder='E-mail' handleChange={setEmail}/>
        <TextInput value={password} placeholder='Password' handleChange={setPassword} isPassword/>
        
        {isLoanding ? 
                <Image alt='' src='/load.gif' width={50} height={50}/> 
                : <button className='px-5 py-2 border-2 border-white' onClick={handleClick}>Enter</button>
            }
        <Link href='/registration'> <p className=''>Dont have account? <u>Registration</u></p></Link>
        <p className='text-center text-lg p-2 text-red-700'>{error}</p>

        </form>
    </div>
  )
}
