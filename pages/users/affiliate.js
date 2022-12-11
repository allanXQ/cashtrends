import useSWR from "swr"
import Bottombar from "./navigation/bottombar"
import Topbar from "./navigation/topbar"
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";



const Affiliate = () => {
    const {data,error} = useSWR(`/api/referrals`)
    const userdata = data?data.downlines :[]
    // let hostname

    const router = useRouter();
    const [hostname, setOgUrl] = useState("");


    useEffect(() => {
    const host = window.location.origin;
    const baseUrl = host;

    setOgUrl(`${baseUrl}`);
    }, [router.pathname]); 
    let balance = 0

    userdata.map((user)=>{
        balance = balance + parseInt(user.earnings)
    })
        
      return (
        <div className="overflow-x-hidden">
            <Topbar/>
            <div className="flex flex-col mt-2 ml-2">
                <div>
                    <div className='flex flex-col'>
                        <span className='text-lg'>Affiliate Balance</span>
                        <span className='font-semibold text-3xl'>KSH {balance}
                        </span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-start w-screen my-2">
                        <div>Affiliate Link:</div>
                        <div className="bg-gray-300 p-1">{hostname}/auth/register/{userdata[0]?.userid}
                        </div>

                    </div>
                </div>
                <table className="min-w-full divide-y divide-gray-200 mt-2">
                        <thead className="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-3 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                >
                                    Username
                                </th>
                                {/* <th
                                    scope="col"
                                    className="px-3 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                >
                                    Package
                                </th> */}
                                <th
                                    scope="col"
                                    className="px-3 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                >
                                    Earnings
                                </th>
                                
                            </tr>
                        
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {userdata.map((user)=>{
                                return (
                                    <tr key={user.downline}>
                                        <td className="px-3 py-2 text-sm font-medium text-gray-800 whitespace-nowrap">
                                            {user.downline}
                                        </td>
                                        <td className="px-3 py-2 text-sm text-gray-800 whitespace-nowrap">
                                            {user.earnings}
                                        </td>
                                
                                    </tr>

                                )
                            })}
                            
                        </tbody>
                    </table>
            </div>
            <Bottombar/>
        </div>
      )
    }
    
    export default Affiliate