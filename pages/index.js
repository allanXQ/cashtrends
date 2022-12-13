import Head from 'next/head'
import Router from 'next/router'
import Nav from './header/nav'

export default function Home() {
    // const router = useRouter()
    Router.push("/auth/login")
  return (
    <div>
      <Nav/>
      <div>
      </div>  

    </div>
  )
}
