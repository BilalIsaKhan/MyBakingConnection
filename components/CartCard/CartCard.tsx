import React from 'react'
import styles from './styles.module.css'
import CartTable from '../CartTable/CartTable'
import { CircularProgress, Typography } from '@mui/material'
import CartCardDetailsItem from '../CartCardDetailsItem/CartCardDetailsItem'
import EmptyCart from '../EmptyCart'
import { PrimaryBtn } from '../Buttons'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface CartCardProps {
  cartFunctions: any
}

const CartCard = ({ cartFunctions }: CartCardProps) => {
  console.log('cartFunctions in CartCard is', cartFunctions)

  const router = useRouter()

  if (
    cartFunctions?.isLoadingCart ||
    cartFunctions?.uiStore?.isUpdatingQuantity ||
    cartFunctions?.removeCartItemsLoading ||
    cartFunctions?.addOrCreateCartLoading
  )
    return (
      <div className={styles.card}>
        {/* <div className='w-full flex flex-col gap-y-[40px] md:gap-y-[24px]'> */}
        <div className='w-full min-h-[calc(300px-64px)] flex justify-center items-center'>
          <CircularProgress
            sx={{
              color: '#7DDEC1',
            }}
          />
        </div>
        {/* </div> */}
      </div>
    )

  if (cartFunctions?.cart?.items?.length === 0)
    return (
      <div className={styles.card}>
        <div className='w-full flex flex-col gap-y-[40px] md:gap-y-[24px]'>
          <div className='w-full flex justify-center'>
            <EmptyCart />
          </div>
        </div>
      </div>
    )
  else
    return (
      <div className={styles.card}>
        <div className='w-full flex flex-col gap-y-[40px] md:gap-y-[24px]'>
          <div className='w-full'>
            <CartTable cartFunctions={cartFunctions} items={cartFunctions?.cart?.items} />
          </div>
          {cartFunctions?.cart?.items?.length != 0 && (
            <>
              <div className='w-full flex flex-col items-start gap-y-[16px]'>
                <CartCardDetailsItem
                  icon='/Images/cart-pickup.svg'
                  title='Pickup'
                  description='Available for pickup on 12 Sep'
                  value='Free'
                />
                <CartCardDetailsItem
                  icon='/Images/cart-sales-tax.svg'
                  title='Sales Tax'
                  description='Eligible for sales tax'
                  value='Not included                     '
                />
                <CartCardDetailsItem
                  icon='/Images/cart-delivery-icon.svg'
                  title='Home Delivery'
                  description='Same day delivery available'
                  value='$3.95'
                />
              </div>

              <div className='flex flex-col items-start gap-y-[8px] md:gap-y-[10px]'>
                <Typography
                  sx={{
                    fontSize: '16px !important',
                    fontFamily: 'Open Sans',
                    fontWeight: '600 !important',
                    lineHeight: '24px',
                    textTransform: 'capitalize',
                    color: '#000',
                  }}
                >
                  Need Help?
                </Typography>
                <Typography
                  sx={{
                    fontSize: '16px !important',
                    fontFamily: 'Open Sans',
                    fontWeight: '500 !important',
                    lineHeight: '24px',
                    textTransform: 'capitalize',
                    color: '#000',
                    letterSpacing: '0.64px',
                    textDecoration: 'underline',
                  }}
                >
                  Pickup and delivery
                </Typography>
                <Typography
                  sx={{
                    fontSize: '16px !important',
                    fontFamily: 'Open Sans',
                    fontWeight: '500 !important',
                    lineHeight: '24px',
                    textTransform: 'capitalize',
                    color: '#000',
                    letterSpacing: '0.64px',
                    textDecoration: 'underline',
                  }}
                >
                  Contact us
                </Typography>
              </div>

              <div className='w-fit self-end'>
                <Link href={`/checkout/${cartFunctions?.cart?.shop?._id}`}>
                  <PrimaryBtn
                    text='Proceed to checkout'
                    // handleClick={() => {
                    //   router.push('/checkout')
                    // }}
                    // loading={cartFunctions?.removeCartItemsLoading}
                  />
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    )
}

export default CartCard
