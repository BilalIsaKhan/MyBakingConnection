'use client'

import { PrimaryBtn } from '@/components/Buttons'
import NavBar from '@/components/NavBar'
import { Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const OrderPlacedPage = () => {
  return (
    <>
      <div className=''>
        <div className='w-full'>
          {/* <div className={`${styles.signup} pb-[180px] md:h-[1072px] md:bg-cover md:bg-center`}> */}
          <NavBar />
          {/* <button onClick={() => setStep(step + 1)}>step</button>
        <button onClick={() => setStep(1)}>reset</button>
        <button onClick={() => setIsSuccess(!isSuccess)}>success</button>
        <button onClick={() => setIsOtp(!isOtp)}>otp</button> */}

          <div className='w-full justify-center'>
            <div className='w-full h-[100vh] flex items-center justify-center'>
              <div className='w-[90vw] h-[fit-content] relative md:w-[760px] bg-[rgba(0,0,0,0.8999999761581421)] px-[30px] md:px-[112px] py-[49px] md:py-[122px] rounded-[6px] md:rounded-[15px] '>
                {/* <img
                  src='/Images/x-circle.svg'
                  alt='close'
                  className='absolute top-[18px] md:top-[48px] right-[18px] md:right-[48px] cursor-pointer'
                  onClick={() => setIsSuccess(false)}
                /> */}
                <div className='w-full flex flex-col gap-y-[14px] md:gap-y-[36px]'>
                  <div className='w-full flex flex-col items-center gap-y-[9px] md:gap-y-[24px]'>
                    <img
                      src='/Images/smiley.svg'
                      alt='success'
                      className='w-[37px] md:w-[95px] h-[37px] md:h-[95px]'
                    />

                    <Typography
                      // variant='h1'
                      sx={{
                        color: '#7DDEC1',
                        fontSize: '36px !important',
                        fontFamily: 'Josefin Sans',
                        fontWeight: '700 !important',
                        lineHeight: 'normal',
                        textTransform: 'uppercase',
                        '@media (max-width: 768px)': {
                          fontSize: '18px !important',
                        },
                      }}
                    >
                      ORDER PLACED!
                    </Typography>
                  </div>

                  <div className='w-full flex flex-col items-center gap-y-[9px] md:gap-y-[24px]'>
                    <Typography
                      // variant='h1'
                      sx={{
                        color: '#fff',
                        fontSize: '24px !important',
                        fontFamily: 'Open Sans',
                        fontWeight: '500 !important',
                        lineHeight: 'normal',
                        textAlign: 'center',
                        '@media (max-width: 768px)': {
                          fontSize: '12px !important',
                        },
                      }}
                    >
                      {`Thanks for ordering! Your order is being processed and will be delivered soon.`}
                    </Typography>
                  </div>

                  <div className='w-80%'>
                    ,
                    <Link href='/profile/purchase-history'>
                      <PrimaryBtn text='View Order' />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  )
}

export default OrderPlacedPage
