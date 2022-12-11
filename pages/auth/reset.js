import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Register = () => {
    const logo_dimensions = 30
    const input = "h-10 p-2 rounded-sm outline outline-1 outline-black focus:outline outline-1"
    return (
        <div className='flex h-screen items-center justify-center'>
            <div className='flex flex-col gap-5 items-center bg-white p-10 sm:p-20 '>
                <div className='font-semibold text-2xl self-start'>
                    Password Reset
                </div>
                    <div className='flex flex-col gap-3 min-w-full'>
                        <div className='flex flex-col'>
                            <label htmlFor='username'>Username</label>
                            <input className={input} type='text' placeholder='username'/>
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='email'>Email</label>
                            <input className={input} type='email' placeholder='Email'/>
                        </div>
                    </div>    
                    <button types='submit' className='text-white bg-black py-2 font-semibold rounded-md min-w-full'>Reset</button>                
            </div>
        </div>
    )
}

export default Register