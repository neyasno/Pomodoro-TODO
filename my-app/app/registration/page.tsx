'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import TextInput from '../_components/common/TextInput';

export default function Page() {

    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [password_confirm , setPasswordConfirm] = useState('');
    const [error , setError] = useState('');

    const [isLoanding , setIsLoanding] = useState(false);

    const router = useRouter();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setError("")
        if(isLoanding) return;

        if(password === password_confirm){
            const fetchUsers = async () => {
                const userData = {
                    email:email,
                    password : password , 
                }
                
                try{
                    const response = await fetch("/api/users/registration" , {method : "POST" , body : JSON.stringify(userData)});

                    if(!response.ok){
                        const errorData = await response.json();
                        throw new Error(errorData.error || "Registration error");                    
                    }

                    return await response.json();
                }
                catch (error) {
                    throw new Error(`Registration error: ${error}`);
                }
            };
            setIsLoanding(true)
            fetchUsers().then((res)=>{
                console.log("Registration success!" , res)
                router.push("/login")
                
            }).catch((err)=>{
                console.log("Registration error!" , err)
                setError("Registration error")
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

        <h1 className='text-3xl'>Registration</h1>
        <TextInput value={email} placeholder='E-mail' handleChange={setEmail}/>
        <TextInput value={password} placeholder='Password' handleChange={setPassword} isPassword/>
        <TextInput value={password_confirm} placeholder='Password Confirmation' handleChange={setPasswordConfirm} isPassword/>

        {isLoanding ? 
            <Image alt='' src='/load.gif' width={50} height={50}/> 
            : <button className='px-5 py-2 border-2 border-white' onClick={handleClick}>Create</button> 
        }
        
        <Link href='/login'> <p className=''>Already have account? <u>Login</u></p></Link>
        <p className='text-center text-lg p-2 text-red-700'>{error}</p>

        </form>
    </div>
  )
}
