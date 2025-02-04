'use client'

import { useAppDispatch, useAppSelector } from '@/store/store';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Button from '../common/Button';
import { setIsLogined } from '@/store/slices/userSlice';

function Header() {

    const isLogined = useAppSelector(state => state.user.isLogined)

    const router = useRouter();

    const dispatch = useAppDispatch()

    const {theme , setTheme} = useTheme();

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

  if (!mounted) return null;

    const handleLogo = ()=>{
        router.push("/")
    }

    const handleExit = ()=>{
      localStorage.clear()
      document.cookie = ""
      dispatch(setIsLogined(false));
      router.push("/login")
  }

    const handleThemeChange = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    }

  return (
    <div className='w-full flex px-7 py-3 justify-between'>
        <h1 className='text-2xl' onClick={handleLogo}>PomoApp</h1>
        <nav className={`gap-2 flex`}>
            {isLogined && 
              <Button handleClick={handleExit} text='Exit'/>
            }
            <button className=' p-3 rounded-full dark:hover:bg-white hover:bg-black transition-all ' onClick={handleThemeChange}>
              {theme === "dark" ?  <>☀</>: <>🌑</>}
            </button>
        </nav>
    </div>
  )
}

export default React.memo(Header)
