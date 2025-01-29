'use client'

import { useAppSelector } from '@/store/store';
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Header() {

    const isLogined = useAppSelector(state => state.user.isLogined)

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

    console.log('LOGIN_STATUS:' + isLogined)

  return (
    <div className='w-full flex px-7 py-3 justify-between'>
        <h1 className='text-2xl' onClick={handleLogo}>PomoApp</h1>
        <nav className={`gap-2  ${isLogined ? 'hidden': 'flex'}`}>
            <button className='border-2 border-white p-4 py-2' onClick={handleLogin}>Login</button>
            <button className='border-2 border-white p-4 py-2' onClick={handleRegistration}>Registration</button>
        </nav>
    </div>
  )
}
