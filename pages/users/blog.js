import React from 'react'
import useSWR from 'swr'
import Bottombar from './navigation/bottombar'
import Topbar from './navigation/topbar'

const Blog = () => {
  const {data,error} = useSWR(`/api/user`)

  const userdata = data?data.user_data :{}
  // let userdata={
  //   status:'inactive'
  // }
 
  return (
    <div>
        <Topbar/>
        <div className={`${userdata.status==='inactive'?'hidden':'flex'} h-screen items-center justify-center`}>
          It is not Blog day.</div>
          <div className={`${userdata.status==='inactive'?'flex':'hidden'} h-screen items-center justify-center`}>
          Activate account to access.</div>
        <Bottombar/>
    </div>
  )
}

export default Blog