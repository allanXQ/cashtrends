import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const Topbar = () => {
  const links = [
    {name:'Dashboard',link:'/users/dashboard'},
    {name:'Wallet',link:'/users/wallet'},
    {name:'Affiliate',link:'/users/affiliate'},
    {name:'Blog',link:'/users/blog'},
    {name:'Trivia',link:'/users/trivia'},
    {name:'Games',link:'/users/spin'},
    {name:'Transfer',link:'/users/transfer'}
]


    const [open, setopen] = useState(false)
    const handleopen = ()=>{
        open ? setopen(false) : setopen(true)
    }
  return (
    <div className='relative py-2 px-2 flex flex-row items-center justify-between bg-white w-full sm:px-5 sm:py-2 text-lg'>
        <Link href='/users/dashboard' className='w-[35%] sm:w-[20%]'>
            <Image src='/logos/cashtrends.png' width={150} height={50} alt='logo'/>
        </Link>
        <div className='hidden sm:flex gap-5'>
          {
            links.map(link=>{
              return (
                <Link key={link.name} href={link.link}>{link.name}</Link>
              )
            })
          }

        </div>
        {/* <div > */}
          <Link className='bg-yellow-400 text-black py-2 px-4 rounded-md' href='/logout'>Logout</Link> 
        {/* </div> */}
           
    </div>
  )
}

export default Topbar

// <sm: logout