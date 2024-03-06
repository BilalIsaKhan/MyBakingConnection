import Navbar from '../NavBar/NavBar'
import styles from './styles.module.css'
import SigninForm from '../SigninForm'
import { withApollo } from 'lib/apollo/withApollo'
import withAuth from 'hocs/withAuth'

import React from 'react'

const Signin = () => {
  return (
    <div className={`${styles.signIn} md:h-[1072px]`}>
      <Navbar itemsColor='white' />
      <SigninForm />
    </div>
  )
}

export default withApollo()(withAuth(Signin))
