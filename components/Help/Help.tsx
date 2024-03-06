import React from 'react'
import NavBar from '../NavBar/NavBar'
import { withApollo } from 'lib/apollo/withApollo'
import withAuth from 'hocs/withAuth'

const Help = () => {
  return (
    <div>
      <NavBar />

      <div className='mt-[24px] md:mt-[100px] flex justify-center'>Help</div>
    </div>
  )
}

// export default withApollo()(Help)
export default withApollo()(withAuth(Help))
