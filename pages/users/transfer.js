import React from 'react'
import Bottombar from './navigation/bottombar'
import Topbar from './navigation/topbar'

const Transfer = () => {
    const input = "h-10 p-2 rounded-md outline outline-1 outline-black focus:outline outline-1"

  return (
    <div>
        <Topbar/>
            <div className={`flex justify-center absolute z-10 top-20 left-5 sm:left-[35%] self-center rounded-md  bg-purple-400 min-h-[50%]`}>
                <form className='flex flex-col gap-4 items-center justify-center px-10'>
                    <p className='text-white font-semibold text-lg'>Transfer</p>
                    <input className={input} placeholder='phone number'/>
                    <input className={input} placeholder='amount'/>
                    <button className='bg-white text-black p-2 rounded-md font-semibold'>Transfer</button>
                </form>
            </div>
        <Bottombar/>
    </div>
  )
}

export default Transfer