import React, { useEffect, useState } from 'react'
import NavBar from '../NavBar/NavBar'
import OrderCard from '../OrderCard/OrderCard'
import DeliveryDetails from '../DeliveryDetails/DeliveryDetails'
import withInjectedStores from 'hocs/inject'
import withCart from 'containers/cart/withCart'
import { withApollo } from 'lib/apollo/withApollo'
import withAuth from 'hocs/withAuth'

interface AddToCartProps {
  [key: string]: any
  slug: string
}

const Checkout = ({ slug, ...restProps }: AddToCartProps) => {
  const [totalAmount, setTotalAmount] = useState(0)

  const fetchTotalAmount = (value: number) => {
    setTotalAmount(value)
  }

  useEffect(() => {
    // console.log('restProps in checkout is', restProps)
    // restProps?.uiStore?.closeCart()
  }, [totalAmount])

  return (
    <div>
      <NavBar />

      <div className='w-full mt-[24px] md:mt-[100px] flex justify-center'>
        <div className='w-[90vw] md:[95vw] flex flex-col gap-y-[24px]'>
          <div className='w-full flex flex-col lg:flex-row items-start lg:justify-between gap-y-[24px]'>
            <div className='w-full lg:w-[48%]'>
              <DeliveryDetails
                totalAmountWithTax={totalAmount}
                cartFunctions={restProps}
                slug={slug}
              />
            </div>

            <div className='w-full lg:w-[48%]'>
              <OrderCard
                items={restProps?.cart?.items}
                cartFunctions={restProps}
                setTotalAmountWithTax={fetchTotalAmount}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// export default Checkout
export default withApollo()(withAuth(withCart(withInjectedStores('uiStore')(Checkout))))
