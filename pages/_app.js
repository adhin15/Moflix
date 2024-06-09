import { useEffect } from 'react'
import '../styles/globals.scss'

export default function App({ Component, pageProps }) {
  useEffect(()=>{
    window.AOS.init({ // Initialization
      duration: 1000
    });
  },[])
  return <Component {...pageProps} />
}
