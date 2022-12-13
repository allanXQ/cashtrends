import Head from 'next/head'
import { useRouter } from 'next/router'

import Nav from './header/nav'

export default function Home() {
  useEffect(()=>{
    const router = useRouter()
    router.push("/auth/login")
},[])
  return (
    <div>
      <Nav/>
      <div>
      </div>  

    </div>
  )
}
