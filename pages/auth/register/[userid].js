import axios from 'axios'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import React, { useState } from 'react'

const Register = () => {
    const router = useRouter()
    const userid = router.query.userid
    // console.log(userid)
    // const userid_regex = /^[a-zA-Z0-9-]+$/
    // if(!userid_regex.test(userid)){router.push('/auth/register')}

    const [visibility, setvisibility] = useState(false)
    const [message,setmessage] = useState('')
    const handleSubmit = async (e)=>{
        e.preventDefault()
        const data = {
            firstname:e.target.firstname.value,
            lastname:e.target.lastname.value,
            username:e.target.username.value,
            email:e.target.email.value,
            phone:e.target.phone.value,
            upline:e.target.upline.value,
            password:e.target.password.value,
            cpassword:e.target.cpassword.value
        }
        console.log(data)
        await axios.post('/api/auth/register',data).then(res=>{
            // console.log(res)
            if(res.data.status === 200){
                console.log(res.data.message)
                Router.push('/auth/login')
            }
            else{
                console.log(res)
                setmessage(res.data.message)
                setvisibility(true)
            }
        }).catch(error=>{
            setmessage('An error occurred')
            setvisibility(true)
        })
    }
    const input = "h-10 p-2 rounded-sm outline outline-1 outline-black focus:outline outline-1"
    return (
        <div className='flex h-screen items-center justify-center'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-5 items-center bg-white p-20 '>
                <div className='font-semibold text-2xl self-start'>
                    Sign-Up form
                </div>
                    <div className='flex flex-col gap-3 min-w-full sm:grid grid-cols-2'>
                        <div className='flex flex-col'>
                            <label htmlFor='firstname'>Firstname</label>
                            <input className={input} type='text' name='firstname' placeholder='firstname' required/>
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='lastname'>Lastname</label>
                            <input className={input} type='text' name='lastname' placeholder='lastname' required/>
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='username'>Username</label>
                            <input className={input} type='text' name='username' placeholder='username' required/>
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='email'>Email</label>
                            <input className={input} type='email' name='email' placeholder='Email' required/>
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='Phone Number'>Phone Number</label>
                            <input className={input} type='text' name='phone' placeholder='07.../01...' required/>
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='Upline'>Upline</label>
                            <input className={input} type='text' name='upline' placeholder='upline' value={userid} required/>
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='password'>Password</label>
                            <input className={input} type='password' name='password' placeholder='Password' required/>
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='Confirm Password'>Confirm Password</label>
                            <input className={input} type='password' name='cpassword' placeholder='Confirm Password' required/>
                        </div>
                    </div>   
                    <p className='text-sm self-start'>By signing up you agree to our 
                        <Link href='terms'> Terms of service</Link></p>      
                    <button type='submit' className='text-black bg-yellow-400 py-2 rounded-md min-w-full'>Sign Up</button>                
                    <p className={`${!visibility?'hidden':'block'} text-red-600`}>{message}</p>

            </form>
        </div>
    )
}

export default Register