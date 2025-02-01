import Image from 'next/image'
import React from 'react'

export default function Loading() {
  return (
    <Image alt='' src='/load.gif' width={50} height={50}/> 
  )
}
