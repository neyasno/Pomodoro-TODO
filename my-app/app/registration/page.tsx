'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function Page() {

    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [password_confirm , setPasswordConfirm] = useState('');
    const [error , setError] = useState('');

    const router = useRouter();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if(password === password_confirm){
            const fetchUsers = async () => {
                const userData = {
                    email:email,
                    password : password , 
                }
                
                try{
                    const response = await fetch("/api/users/" , {method : "POST" , body : JSON.stringify(userData)});

                    if(!response.ok){
                        const errorData = await response.json();
                        throw new Error(errorData.error || "Registration error");                    
                    }

                    return await response.json();
                }
                catch (error) {
                    throw new Error(`Ошибка при регистрации: ${error}`);
                }
            };
        
            fetchUsers().then((res)=>{
                console.log("Registration success!" , res)
                router.push("/")
                
            }).catch((err)=>{
                console.log("Registration error!" , err)
                setError("User exist")
            });
        }
        else{
            setError("Passwords not match")
        }
    }

    
  return (
    <div className='w-full flex items-center justify-center'>
        <form action="" className='w-1/4 flex flex-col items-center gap-4'>
        <h1 className='text-3xl'>Registration</h1>
        <input type="text" className='px-3 py-2 border-2 border-white w-full bg-transparent' value={email} placeholder='Email' 
            onChange={ e => setEmail(e.target.value)}/>
        <input type="password" className='px-3 py-2 border-2 border-white w-full bg-transparent' value={password} placeholder='Password' 
            onChange={ e => setPassword(e.target.value)}/>
        <input type="password" className='px-3 py-2 border-2 border-white w-full bg-transparent' value={password_confirm} placeholder='Confirm password' 
            onChange={ e => setPasswordConfirm(e.target.value)}/>
        <button className='px-5 py-2 border-2 border-white' onClick={handleClick}>Create</button>
        <p className='text-center text-lg p-2 text-red-700'>{error}</p>
        </form>
    </div>
  )
}
