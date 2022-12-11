import axios from 'axios'
import { SWRConfig } from 'swr'
import '../styles/globals.css'

const fetcher = async (url)=>{
  const response = await fetch(url)
  const data = response.json()
  return data
}

function MyApp({ Component, pageProps }) {
  

  return (
    <SWRConfig value={{dedupingInterval:5000 ,fetcher}}>
      <Component {...pageProps}/> 
    </SWRConfig>
              
  )
}

export default MyApp
