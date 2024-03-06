import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { CircularProgress, Typography } from '@mui/material'
import { paymentMethods } from 'Constants/constants'
import { TertiaryBtn } from '../Buttons'
import EmptyCart from '../EmptyCart'
import { useRouter } from 'next/navigation'
import useTaxRates from 'hooks/baker/useTaxRates'
import Link from 'next/link'

interface OrderCardProps {
  items: any[]
  cartFunctions: any
  setTotalAmountWithTax: (value: number) => void
}

const OrderCard = ({ items, cartFunctions, setTotalAmountWithTax }: OrderCardProps) => {
  console.log('cartFunctions in OrderCard is', cartFunctions, items)
  const [salesTax, setSalesTax] = useState(0)
  // const [taxRate, loadingTaxRate, refetchTaxRate] = useTaxRates(cartFunctions?.cart?.shop?._id)
  const router = useRouter()
  // const [salesTax, setSalesTax] = useState(cartFunctions?.cart?.shop?.taxRate)
  // let totalTaxIfApplicableonItems
  useEffect(() => {
    console.log('Refreshed')
    setSalesTax(cartFunctions?.cart?.shop?.taxRate)
  }, [cartFunctions?.cart?.shop?.taxRate])

  const totalAmount = cartFunctions?.cart?.checkout?.summary?.itemTotal?.amount

  const totalSalesTax = cartFunctions?.cart?.items?.reduce((total: any, item: any) => {
    if (item?.isTaxable) return total + item.subtotal.amount * (salesTax / 100)
    else return total
  }, 0)

  console.log('totalSalesTax is', totalSalesTax)

  useEffect(() => {
    setTotalAmountWithTax(totalAmount + totalSalesTax)
  }, [totalAmount, totalSalesTax])

  // useEffect(() => {
  //   console.log('tax rate is ', taxRate)
  // }, [taxRate])

  // useEffect(() => {
  //   totalTaxIfApplicableonItems = items?.reduce((total, item) => {
  //     if (item?.isTaxable) return total + item.subtotal.amount * (5 / 100)
  //     else return total
  //   }, 0)

  //   console.log('totalTaxIfApplicableonItems is', totalTaxIfApplicableonItems)

  //   const totalAmountWithTax = totalAmount + totalTaxIfApplicableonItems

  //   setTotalAmountWithTax(totalAmountWithTax)
  // }, [salesTax])

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

  if (items?.length === 0 || !cartFunctions?.cart)
    return (
      <div className={styles.card}>
        <div className='w-full flex justify-center'>
          <EmptyCart />
        </div>
      </div>
    )

  return (
    <div className={styles.card}>
      <Typography
        sx={{
          fontSize: '28px !important',
          fontFamily: 'Open Sans',
          fontWeight: '700 !important',
          lineHeight: 'normal',
          color: '#000',
          textTransform: 'capitalize',
          '@media (max-width: 767px)': {
            fontSize: '24px !important',
          },
        }}
      >
        your order
      </Typography>

      <div className='mt-[24px] md:[20px]'>
        <div
          className='w-full flex justify-between py-[16px]'
          style={{
            borderBottom: '1px solid #DEE2E6',
          }}
        >
          <Typography
            sx={{
              fontSize: '18px !important',
              fontFamily: 'Open Sans',
              fontWeight: '500 !important',
              lineHeight: 'normal',
              color: '#000',
              textTransform: 'capitalize',
            }}
          >
            product
          </Typography>

          <Typography
            sx={{
              fontSize: '18px !important',
              fontFamily: 'Open Sans',
              fontWeight: '500 !important',
              lineHeight: 'normal',
              color: '#000',
              textTransform: 'capitalize',
            }}
          >
            total
          </Typography>
        </div>

        {/* Cart item */}

        {items?.map((item, index) => {
          // const { title, price, quantity } = item

          return (
            <div
              key={item?._id}
              className='w-full flex justify-between py-[8px]'
              style={{
                borderBottom: '1px solid #212529',
              }}
            >
              <Typography
                sx={{
                  fontSize: '16px !important',
                  fontFamily: 'Open Sans',
                  fontWeight: '500 !important',
                  lineHeight: '29px',
                  color: '#000',
                  letterSpacing: '0.32px',
                  textTransform: 'capitalize',
                }}
              >
                {item.title}{' '}
                <span
                  style={{
                    textTransform: 'lowercase',
                  }}
                >
                  x
                </span>{' '}
                <span
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  {item.quantity}
                </span>
              </Typography>

              <Typography
                sx={{
                  fontSize: '16px !important',
                  fontFamily: 'Open Sans',
                  fontWeight: '500 !important',
                  lineHeight: '29px',
                  color: '#000',
                  letterSpacing: '0.32px',
                  textTransform: 'capitalize',
                }}
              >
                ${item.subtotal.amount.toFixed(2)}
              </Typography>
            </div>
          )
        })}

        <div
          className='w-full flex justify-between py-[8px]'
          style={{
            borderBottom: '1px solid #212529',
          }}
        >
          <Typography
            sx={{
              fontSize: '16px !important',
              fontFamily: 'Open Sans',
              fontWeight: '500 !important',
              lineHeight: '29px',
              color: '#000',
              letterSpacing: '0.32px',
              textTransform: 'capitalize',
            }}
          >
            Sales Tax
          </Typography>

          <Typography
            sx={{
              fontSize: '16px !important',
              fontFamily: 'Open Sans',
              fontWeight: '500 !important',
              lineHeight: '29px',
              color: '#000',
              letterSpacing: '0.32px',
              textTransform: 'capitalize',
            }}
          >
            ${totalSalesTax?.toFixed(2)}
          </Typography>
        </div>

        <div
          className='w-full flex justify-between py-[16px]'
          style={{
            borderBottom: '1px solid #212529',
          }}
        >
          <Typography
            sx={{
              fontSize: '16px !important',
              fontFamily: 'Open Sans',
              fontWeight: '700 !important',
              lineHeight: '29px',
              color: '#000',
              letterSpacing: '0.32px',
              textTransform: 'capitalize',
            }}
          >
            Cart Subtotal
          </Typography>

          <Typography
            sx={{
              fontSize: '16px !important',
              fontFamily: 'Open Sans',
              fontWeight: '500 !important',
              lineHeight: '29px',
              color: '#000',
              letterSpacing: '0.32px',
              textTransform: 'capitalize',
            }}
          >
            ${totalAmount?.toFixed(2)}
          </Typography>
        </div>

        <div
          className='w-full flex justify-between py-[16px]'
          style={{
            borderBottom: '1px solid #212529',
          }}
        >
          <Typography
            sx={{
              fontSize: '18px !important',
              fontFamily: 'Open Sans',
              fontWeight: '700 !important',
              lineHeight: '29px',
              color: '#000',
              letterSpacing: '0.32px',
              textTransform: 'capitalize',
            }}
          >
            Order Total
          </Typography>

          <Typography
            sx={{
              fontSize: '16px !important',
              fontFamily: 'Open Sans',
              fontWeight: '700 !important',
              lineHeight: '29px',
              color: '#000',
              letterSpacing: '0.32px',
              textTransform: 'capitalize',
            }}
          >
            {/* ${(totalAmount + totalTaxIfApplicableonItems).toFixed(2)}{' '} */}$
            {(totalAmount + totalSalesTax).toFixed(2)}{' '}
          </Typography>
        </div>

        <div className='mt-[16px]'>
          <Typography
            sx={{
              fontSize: '16px !important',
              fontFamily: 'Open Sans',
              fontWeight: '600 !important',
              lineHeight: '24px',
              color: '#000',
            }}
          >
            Accepted Payment Methods
          </Typography>
        </div>

        <div className='mt-[16px] flex flex-wrap justify-start gap-x-[10px] md:gap-x-[20px] gap-y-[20px]'>
          {paymentMethods.map((item) => (
            <img key={item.title} src={item.img} alt={item.title} className='h-[22px]' />
          ))}
        </div>

        <div className='mt-[24px] w-full flex justify-between'>
          {/* Desktop View */}
          <div className='h-[38px] md:h-[57px] w-full md:w-[45%]'>
            <Link href='/search'>
              <TertiaryBtn text='Continue Shopping' />
            </Link>
          </div>

          {/* Mobile View
          <div className='block md:hidden h-[38px] md:h-[57px] w-full md:w-[50%]'>
            <TertiaryBtn text='Continue' />
          </div> */}

          {/* <div className='h-[38px] md:h-[57px] w-fit md:w-[45%]'>
            <PrimaryBtn text='Proceed to Checkout' />
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default OrderCard
