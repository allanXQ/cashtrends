import Head from 'next/head'
import Router from 'next/router'
// import {useRouter } from 'next/router'
import { useEffect } from 'react'
import Nav from './header/nav'

export default function Home() {
  useEffect(()=>{
    // const router = useRouter()
    Router.push("/auth/login")
  },[])
    
  return (
    <div>
      <Nav/>
      <div>
      </div>  

    </div>
  )
}
