import axios from "axios"
import { useRouter } from "next/router"
import { useEffect } from "react"

const Logout = () => {
    const router = useRouter()
    useEffect(()=>{
        axios.get('/api/auth/logout').then(res=>{
            router.push('/auth/login')
        })
    })
  return (
    <div>Logout</div>
  )
}

export default Logout