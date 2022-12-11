import { XCircleIcon } from '@heroicons/react/solid'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import Bottombar from './navigation/bottombar'
import Topbar from './navigation/topbar'

const Wallet= () => {
    const [deposits,setdeposits] = useState(true)
    const [depositmodal, setdepositmodal] = useState(false)
    const [withdrawmodal, setwithdrawmodal] = useState(false)
    const {data:user_data,error} = useSWR(`/api/user`)
    const userdata = user_data?user_data.user_data :{}
    const {data:deposit_history,error2} = useSWR(`/api/deposithistory`)
    // console.log(data)
    const depositdata = deposit_history?deposit_history.deposit_history : []
    const {data:withdrawal_history,error3} = useSWR(`/api/withdrawalhistory`)
    const withdrawalhistory = withdrawal_history?withdrawal_history.withdrawal_history : []

    const handledeposit=async (e)=>{
        e.preventDefault()
        const payload = {
            phone:e.target.phone.value,
            amount:e.target.amount.value
        }
        await axios.post('/api/deposit',payload).then(res=>{
            console.log(res)
        })
    }

    const handlewithdrawal=async (e)=>{
        e.preventDefault()
        const payload = {
            username:userdata.username,
            phone:e.target.phone.value,
            amount:e.target.amount.value
        }
        await axios.post('/api/withdrawal',payload).then(res=>{
            console.log(res)
        })
    }


    const input = "h-10 p-2 rounded-md outline outline-1 outline-black focus:outline outline-1"

  return (
    <div>
        <Topbar/>
         <div className='h-screen flex flex-col mx-2 relative'>
            <div className=''>
                <div className='flex justify-between items-center my-4 sm:justify-start sm:gap-10'>
                    <div className='flex flex-col'>
                        <span className='text-lg'>Total Balance</span>
                        <span className='font-semibold text-3xl'>KSH {userdata.balance}</span>
                    </div>

                    <div className='flex gap-2 sm:ml-24'>
                        <button className='bg-yellow-400 text-black py-2 px-4 rounded-md' onClick={()=>{
                            setdepositmodal(true)
                            setwithdrawmodal(false)
                        }}>Deposit</button> 
                        <button className='bg-yellow-400 text-black py-2 px-4 rounded-md' onClick={()=>{
                            setwithdrawmodal(true)
                            setdepositmodal(false)
                        }}>Withdraw</button> 
                    </div>
                    
                </div>
                <div className='mt-2'>
                    <div>
                        <button className={`${deposits?'bg-gray-300':'bg-white'} p-2`} onClick={()=>{
                            setdeposits(true)
                        }}>Deposits</button>
                        <button className={`${!deposits?'bg-gray-300':'bg-white'} p-2`} onClick={()=>{
                            setdeposits(false)
                        }}>Withdrawals</button>
                    </div>
                </div>
            </div> 

            {/* deposit history */}
            <div className={`${deposits?'block':'hidden'}`}>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                                scope="col"
                                className="px-3 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                            >
                                MPESA Code
                            </th>
                            <th
                                scope="col"
                                className="px-3 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                            >
                                Amount
                            </th>
                            <th
                                scope="col"
                                className="px-3 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                            >
                                Date
                            </th>
                        </tr>
                    
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {depositdata.map(trx=>{
                            return (
                                <tr key={trx.mpesa_ref}>
                                    <td className="px-3 py-2 text-sm font-medium text-gray-800 whitespace-nowrap">
                                        {trx.mpesa_ref}
                                    </td>
                                    <td className="px-3 py-2 text-sm text-gray-800 whitespace-nowrap">
                                        {trx.amount}
                                    </td>
                                    <td className="px-3 py-2 text-sm text-gray-800 whitespace-nowrap">
                                        {trx.created}
                                    </td>
                                </tr>
                            )
                        })}
                        
                    </tbody>
                </table>
            </div>

            {/* withdrawal history */}
            <div className={`${deposits?'hidden':'block'}`}>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                                scope="col"
                                className="px-3 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                            >
                                Amount
                            </th>
                            <th
                                scope="col"
                                className="px-3 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                            >
                                Status
                            </th>
                            <th
                                scope="col"
                                className="px-3 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                            >
                                Date
                            </th>
                        </tr>
                    
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {withdrawalhistory.map(trx=>{
                            return (
                                <tr key={trx.amount + trx.date}>
                                    <td className="px-3 py-2 text-sm font-medium text-gray-800 whitespace-nowrap">
                                        {trx.amount}
                                    </td>
                                    <td className="px-3 py-2 text-sm text-gray-800 whitespace-nowrap">
                                        {trx.status}
                                    </td>
                                    <td className="px-3 py-2 text-sm text-gray-800 whitespace-nowrap">
                                        {trx.created}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>


            {/* deposits modal */}
            <div className={`${depositmodal?'flex':'hidden'} justify-center absolute z-10 top-10 left-5 sm:left-[35%] self-center rounded-md  bg-purple-400 min-h-[50%]`}>
            <XCircleIcon className='h-9 text-white absolute self-start right-2 top-2' onClick={()=>{setdepositmodal(false)}}/>
                <form onSubmit={handledeposit} className='flex flex-col gap-4 items-center justify-center px-10'>
                    <p className='text-white font-semibold text-lg'>Deposit</p>
                    <input className={input} placeholder='phone number' name='phone'/>
                    <input className={input} placeholder='amount' name='amount'/>
                
                    <button className='bg-white text-black p-2 rounded-md font-semibold' >Deposit</button>
                    <p className='text-white'>pppp</p>

                </form>
            </div>

            {/* withdrawals modal */}
            <div className={` ${withdrawmodal?'flex':'hidden'} justify-center absolute z-10 top-10 left-5 sm:left-[35%] self-center rounded-md  bg-purple-400 min-h-[50%]`}>
            <XCircleIcon className='h-9 text-white absolute self-start right-2 top-2' onClick={()=>{setwithdrawmodal(false)}}/>
                <form onSubmit={handlewithdrawal} className='flex flex-col gap-4 items-center justify-center px-10'>
                    <p className='text-white font-semibold text-lg'>Withdraw</p>
                    <input className={input} placeholder='phone number' name='phone'/>
                    <input className={input} placeholder='amount' name='amount'/>
                    <button className='bg-white text-black p-2 rounded-md font-semibold'>Withdraw</button>
                </form>
            </div>
            
        </div>
        <Bottombar/>
    </div>
  )
}

export default Wallet