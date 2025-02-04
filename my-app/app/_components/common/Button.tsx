import React from 'react'

type ButtonProps ={
    text : string
    handleClick : (e : React.MouseEvent<HTMLButtonElement, MouseEvent>)=>void
}

export default function Button({ text , handleClick}:ButtonProps) {
  return (
    <button className='py-2 px-10 border-2 transition border-black hover:bg-black hover:text-white 
                             dark:border-white dark:hover:bg-white dark:hover:text-black ' onClick={handleClick}>{text}</button>
  )
}
