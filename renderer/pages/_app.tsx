import React from 'react'
import type { AppProps } from 'next/app'

import '../styles/globals.css'
import ToolsBox from "./tools-box";

function MyApp({ Component, pageProps }: AppProps) {
  return  <>
    <div className="w-screen h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/background.jpg')" }}>
      <ToolsBox />
      <Component {...pageProps} />
    </div>
  </>
}

export default MyApp
