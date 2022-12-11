import {PencilAltIcon, 
    UserGroupIcon,
    AcademicCapIcon,
    PuzzleIcon,
    CashIcon
} from '@heroicons/react/solid'
import {WalletIcon} from '@remixicons/react/fill'

import Link from 'next/link'

const Bottombar = () => {
    const icons = 'h-6'
    const links = [
        {icon:<WalletIcon className={icons} fill='white'/>,name:'Wallet',link:'/users/wallet'},
        {icon:<UserGroupIcon className={icons}/>,name:'Affiliate',link:'/users/affiliate'},
        {icon:<PencilAltIcon className={icons}/>,name:'Blog',link:'/users/blog'},
        {icon:<AcademicCapIcon className={icons}/>,name:'Trivia',link:'/users/trivia'},
        {icon:<PuzzleIcon className={icons}/>,name:'Games',link:'/users/spin'},
        {icon:<CashIcon className={icons}/>,name:'Transfer',link:'/users/transfer'}
    ]
  return (
    <div className='fixed bottom-0 w-full sm:hidden'>
        <div className='flex justify-evenly bg-black p-2'>
            {
                links.map((link)=>{
                    return(
                        <Link key={link.name} href={link.link} className='flex items-center flex-col text-white text-xs'>
                            {/* <Link href={link.link}></Link> */}
                            {link.icon}
                            {link.name}
                        </Link>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Bottombar