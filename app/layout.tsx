'use client'
import './globals.css'

import { PropsWithChildren, useEffect, useState } from 'react'
import { lightTheme } from './theme/themes'
import ContextProvider from './context-provider'

import { ThemeProvider, CssBaseline } from '@mui/material'
import Header from '@/components/Header'
import Footer from '@/components/Footer/Footer'

// import NextAuthProvider from './nextAuthProvider'
// import { ToastContainer, toast } from 'react-toastify'
import toast, { Toaster } from 'react-hot-toast'
import { usePathname } from 'next/navigation'
// import 'react-toastify/dist/ReactToastify.css'

export default function RootLayout({ children }: PropsWithChildren<{}>) {
  const [shopId, setShopId] = useState('')
  const pathname = usePathname()

  console.log('pathName in layout is', pathname)

  useEffect(() => {
    if (pathname?.includes('/shop')) {
      const path = pathname.split(`/`)
      const slug = path[2]
      const urlParams = path[4]
      setShopId(slug)
    }
  })

  return (
    <html lang='en'>
      <head>
        <title>Your Baking Connection</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </head>
      <body>
        <ThemeProvider theme={lightTheme}>
          <ContextProvider shopId={shopId}>
            {/* <NextAuthProvider> */}
            <CssBaseline />
            {/* {showHeader && <Header />} */}
            {<Header />}
            {children}
            {<Footer />}
            {/* <ToastContainer
              position='top-right'
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme='light'
            /> */}
            <Toaster
              position='bottom-center'
              reverseOrder={false}
              gutter={8}
              containerClassName=''
              containerStyle={{}}
              toastOptions={{
                // Define default options
                className: '',
                duration: 5000,
                style: {
                  fontFamily: 'Open Sans',
                  background: '#fff',
                  color: '#363636',
                },
              }}
            />
            {/* </NextAuthProvider> */}
          </ContextProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
