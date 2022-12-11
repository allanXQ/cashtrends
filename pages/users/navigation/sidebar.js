import {DashboardIcon,WalletIcon} from '@remixicons/react/fill'
import {PencilAltIcon, 
    UserGroupIcon,
    AcademicCapIcon,
    PuzzleIcon,
    CashIcon
} from '@heroicons/react/solid'
import Link from 'next/link'
const Sidebar = () => {
    const icons = 'h-6'
    const links = [
        {icon:<DashboardIcon className={icons}/>,name:'Dashboard',link:'/users/dashboard'},
        {icon:<WalletIcon className={icons}/>,name:'Wallet',link:'/users/wallet'},
        {icon:<UserGroupIcon className={icons}/>,name:'Affiliate',link:'/users/affiliate'},
        {icon:<PencilAltIcon className={icons}/>,name:'Blog',link:'/users/blog'},
        {icon:<AcademicCapIcon className={icons}/>,name:'Trivia',link:'/users/trivia'},
        {icon:<PuzzleIcon className={icons}/>,name:'Games',link:'/users/games'},
        {icon:<CashIcon className={icons}/>,name:'Transfer',link:'/users/transfer'}


    ]
  return (
    <div className='hidden sm:flex bg-white max-w-[12%]'>
       <div className='flex flex-col justify-evenly items-center self-center gap-10'>
        {
            links.map(link=>{
                return (
                    <Link href={link.link} key={link.name} className='flex justify-center'>
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

export default Sidebar