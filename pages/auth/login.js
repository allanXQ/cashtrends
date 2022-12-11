import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'


const Login = () => {
    const [visibility, setvisibility] = useState(false)
    const [message,setmessage] = useState('')
    const router = useRouter();
    
    const handleSubmit = async (e)=>{
        e.preventDefault()
        const data = {
            username:e.target.username.value,
            password:e.target.password.value,
        }
        await axios.post('/api/auth/login',data).then(res=>{
            // console.log(res)
            if(res.data.status === 200){
                const userdata = res.data.userdata
                
                router.push('/users/dashboard')
            }
            else{
                setmessage(res.data.message)
                setvisibility(true)
            }
        }).catch(error=>{
            setmessage('An error occurred')
            setvisibility(true)
        })
    }

    const logo_dimensions = 30
    const input = "h-10 p-2 rounded-md outline outline-1 outline-black focus:outline outline-1"
    return (
        <div className='flex h-screen items-center justify-center'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-5 items-center bg-white p-10 sm:p-20 '>
                <div className='font-semibold text-2xl'>
                    Welcome Back!
                </div>
                <div className='flex flex-col gap-3 min-w-full'>
                    <input className={input} type='text' name='username' placeholder='username' required/>
                    <input className={input} type='password' name='password' placeholder='password' required/>
                    <button type='submit' className='text-black bg-yellow-400 py-2 rounded-md'>Sign In</button>
                </div>
                
                <div className='flex gap-24'>
                    <Link href='/auth/reset' className='text-yellow-400'>Password Reset</Link>
                    <Link href='/auth/register' className='text-yellow-400'>Sign up</Link>
                </div>
                <div>
                    <p>Or Sign In using</p>
                    <div className='flex gap-10'> 
                        <Image src='/logos/google.svg' width={logo_dimensions} height={logo_dimensions} alt='google logo'/>
                        <Image src='/logos/facebook.svg' width={logo_dimensions} height={logo_dimensions} alt='facebook logo'/>
                    </div>
                </div>
                
                
            </form>
            <p className={`${!visibility?'hidden':'block'} text-red-600`}>{message}</p>

        </div>
    )
}

export default Login