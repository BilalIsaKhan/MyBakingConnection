import React from 'react'
import NavBar from '../NavBar/NavBar'
import { withApollo } from 'lib/apollo/withApollo'
import withAuth from 'hocs/withAuth'

const PaymentDetails = () => {
  return (
    <div>
      <NavBar />

      <div className='mt-[24px] md:mt-[100px] flex justify-center'>PaymentDetails</div>
    </div>
  )
}

// export default withApollo()(PaymentDetails)
export default withApollo()(withAuth(PaymentDetails))
