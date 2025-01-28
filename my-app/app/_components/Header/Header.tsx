'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

export default function Header() {

    const router = useRouter();

    const handleRegistration = ()=>{
        router.push("/registration")
    }

    const handleLogin = ()=>{
        router.push("/login")
    }

    const handleLogo = ()=>{
        router.push("/")
    }

  return (
    <div className='w-full flex px-7 py-3 justify-between'>
        <h1 className='text-2xl' onClick={handleLogo}>PomoApp</h1>
        <nav className='flex gap-2'>
            <button className='border-2 border-white p-4 py-2' onClick={handleLogin}>Login</button>
            <button className='border-2 border-white p-4 py-2' onClick={handleRegistration}>Registration</button>
        </nav>
    </div>
  )
}
