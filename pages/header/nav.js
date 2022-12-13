import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const Nav = () => {
    
    
    const [open, setopen] = useState(false)
    const handleopen = ()=>{
        open ? setopen(false) : setopen(true)
    }
  return (
    <div className='relative py-5 px-2 flex flex-row items-center justify-between bg-white w-full sm:p-5 text-lg'>
        <div className='w-[50%] sm:w-[20%]'>
            <Image src='/logos/cashtrends.png' width={150} height={50} alt='logo'/>
        </div>
        <div className='hidden sm:flex self-center gap-3'>
            <p><Link href="/">Home</Link></p>
            <p><Link href="/about">About</Link></p>
            <p><Link href="products">Products</Link></p>
            <p><Link href="why">Why Us?</Link></p>
        </div>
        <div className='flex gap-2 sm:gap-3'>
            <p><Link href="/auth/login">Sign In</Link></p>
            <p><Link href="/auth/register">Sign Up</Link></p>
        </div>   
        <div className='sm:hidden' onClick={handleopen}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
            </svg>
        </div>
        <div className={`${!open?'hidden':'block'} absolute sm:hidden bg-white top-20 right-0 
        min-w-[50%] h-screen`}>
            <div className='flex flex-col items-center gap-3'>
                <p><Link href="/">Home</Link></p>
                <p><Link href="/about">About</Link></p>
                <p><Link href="products">Products</Link></p>
                <p><Link href="why">Why Us?</Link></p>
            </div> 
        </div>      
    </div>
  )
}

export default Nav