import React from 'react'
import NavBar from '../NavBar/NavBar'
import PurchaseHistoryCard from '../PurchaseHistoryCard/PurchaseHistoryCard'
import { withApollo } from 'lib/apollo/withApollo'
import withAuth from 'hocs/withAuth'

const PurchaseHistory = () => {
  return (
    <div>
      <NavBar />

      <div className='mt-[24px] md:mt-[100px] flex justify-center'>
        <PurchaseHistoryCard />
      </div>
    </div>
  )
}

// export default withApollo()(PurchaseHistory)
export default withApollo()(withAuth(PurchaseHistory))
