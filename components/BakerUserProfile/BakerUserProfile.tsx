import React from 'react'
import NavBar from '../NavBar/NavBar'
import BakerProfileCard from '../BakerProfileCard/BakerProfileCard'
import { withApollo } from 'lib/apollo/withApollo'
import withAuth from 'hocs/withAuth'

const BakerUserProfile = () => {
  return (
    <div>
      <NavBar />

      <div className='mt-[24px] md:mt-[100px] flex justify-center'>
        <BakerProfileCard />
      </div>
    </div>
  )
}

export default withApollo()(withAuth(BakerUserProfile))
