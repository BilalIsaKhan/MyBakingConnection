import { Typography } from '@mui/material'
import React from 'react'
import { PrimaryBtn } from '../Buttons'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface EmptyCartProps {
  handleModal?: () => void
}

const EmptyCart = ({ handleModal }: EmptyCartProps) => {
  const router = useRouter()

  return (
    <div className='w-[70%] flex flex-col'>
      <img
        src='/Images/empty-cart.svg'
        alt='empty-cart-icon'
        className='w-[80%] h-[233px] md:h-[333px]'
      />

      <Typography
        sx={{
          marginTop: '40px',
          color: '#090909',
          fontSize: '24px !important',
          fontWeight: '700 !important',
          lineHeight: 'normal',
          fontFamily: 'Open Sans',
          textAlign: 'center',
          '@media (max-width: 767px)': {
            marginTop: '14px',
            fontSize: '18px !important',
          },
        }}
      >
        Your bag is empty
      </Typography>

      <Typography
        sx={{
          marginTop: '12px',
          color: '#6C6C6C',
          textAlign: 'center',
          fontSize: '20px !important',
          fontWeight: '500 !important',
          lineHeight: 'normal',
          fontFamily: 'Open Sans',
          '@media (max-width: 767px)': {
            fontSize: '16px !important',
          },
        }}
      >
        {`You have no items in  your bag. Let’s go buy something!`}
      </Typography>

      <div className='mt-[24px] w-[80%] self-center'>
        <Link href='/search'>
          <PrimaryBtn
            text='Go to Bakers'
            handleClick={() => {
              // router.push('/search')
              handleModal ? handleModal() : null
            }}
          />
        </Link>
      </div>
    </div>
  )
}

export default EmptyCart
