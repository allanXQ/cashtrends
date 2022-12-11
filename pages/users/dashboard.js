import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { Router, useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { baseurl} from '../../components/constants'
import Bottombar from './navigation/bottombar'
import Topbar from './navigation/topbar'

const Dashboard = () => {
  const {data,error} = useSWR(`/api/user`)

  const userdata = data?data.user_data :{}
  const pills = 'flex flex-col min-w-fill p-3 rounded-md min-h-[15vh] sm:h-24 items-center justify-center'
  const features = 'flex flex-col items-center'
  let status = userdata.status
  const router = useRouter()

  const handleactivate = ()=>{
    axios.post('/api/activate',{username:userdata.username,phone:userdata.phone}).then(res=>{
      console.log(res)
    })
  }

  // const boturl = "https://github.com/DarkMakerofc/Queen-Elisa-MD"
  const vcf = "/files/1.vcf"

  const boturl = ()=>{
    router.push('https://github.com/DarkMakerofc/Queen-Elisa-MD')
  }

  const handlebonus = ()=>{
    if(status === 'inactive'){
      return alert('Activate account to access')
    }
    return alert('Not yet qualified')
  }
  const handlemystery = ()=>{
    if(status === 'inactive'){
      return alert('Activate account to access')
    }
    return alert('Not yet qualified')
  }

  const handletrade = ()=>{
    if(status === 'inactive'){
      return alert('Activate account to access')
    }
    return alert('Coming Soon')
    
  }

  return(
    <div>
        <Topbar/>
        <div className='p-2 relative mb-20'>
          <div className='grid grid-cols-2 gap-2 sm:grid-cols-3'>
            <div className={`${pills} bg-purple-600 text-white font-semibold`}>
              <span>Status</span>
              {status === 'inactive' 
              ?
              <div className='flex items-center gap-3'>
                <span>{status}</span>
                <button className='p-1 bg-fuchsia-600 ' onClick={handleactivate}>Activate</button>
              </div>
              : <span>{status}</span>
              }
            </div>
            <div className={`${pills} bg-blue-600  text-white font-semibold`}>
              <span>Package</span>
              <span>{userdata.package}</span>
            </div>
            
            <div className={`${pills} bg-fuchsia-600  text-white font-semibold`}>
              <span>Upline</span>
              <span>{userdata.upline}</span>
            </div>
            <div className={`${pills} bg-rose-600  text-white font-semibold`}>
              <span>Deposit Balance</span>
              <span>{userdata.balance}</span>
            </div>
            <div className={`${pills} bg-indigo-600  text-white font-semibold`}>
              <span>Trivia balance</span>
              <span>0</span>
            </div>
            <div className={`${pills} bg-pink-600  text-white font-semibold`}>
              <span>Blog Balance</span>
              <span>0</span>
            </div>           
          </div>

          <div className='flex flex-wrap mt-2 justify-evenly gap-4  sm:justify-evenly'>
            <div className={features}>
              <Image src='/logos/whatsapp.svg' width={80} height={50} alt='whatsapp logo'/>
              <span>Marketing API</span>
              <div className='flex gap-2'>
                <Link href='#' onClick={boturl} className={`${status==='Active'?'block':'hidden'} bg-indigo-600 px-4 text-white`}>Get</Link>
                <a download href="/files/1.vcf" className={`${status==='Active'?'block':'hidden'} bg-indigo-600 px-4 text-white`}>VCF</a>
                <button onClick={()=>{
                  return alert('Activate account to access')
                }} className={`${status==='Active'?'hidden':'block'} bg-indigo-600 px-4 text-white`}>Get</button>
                <button onClick={()=>{
                  return alert('Activate account to access')
                }} className={`${status==='Active'?'hidden':'block'} bg-indigo-600 px-4 text-white`}>VCF</button>
              </div>
              </div>
            <div className={features}>
              <Image src='/mysterybox.jpeg' width={80} height={50} alt='mystery box'/>
              <span>Mystery Box</span>
              <button onClick={handlemystery} className='bg-indigo-600 px-4 text-white'>Open</button>
            </div>
            <div className={features}>
              <Image src='/bonus.jpeg' width={80} height={50} alt='bonus'/>
              <span>Weekly Bonus</span>
              <button onClick={handlebonus} className='bg-indigo-600 px-4 text-white'>Get</button>
            </div>
            <div className={features}>
              <Image src='/trade.jpeg' width={105} height={50} alt='trade'/>
              <span>Trade</span>
              <button onClick={handletrade} className='bg-indigo-600 px-4 text-white'>Start</button>
            </div>
          </div>
            
        </div>

        <Bottombar/>
    </div>
  )
}

export default Dashboard