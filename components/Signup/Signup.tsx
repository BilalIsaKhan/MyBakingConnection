import Navbar from '../NavBar/NavBar'
import SignupForm from '../SignupForm'
import styles from './styles.module.css'

import { useState } from 'react'

import OTPForm from '../OTPForm/OTPForm'
import { withApollo } from 'lib/apollo/withApollo'
import withAuth from 'hocs/withAuth'

const Signup = () => {
  const [isOtp, setIsOtp] = useState(false)

  const [tokens, setTokens] = useState({
    accessToken: '',
    refreshToken: '',
  })
  const handleChangeTokens = (accessToken: string, refreshToken: string) => {
    setTokens({ accessToken, refreshToken })
  }
  // const handleChangeStep = (value: number) => {
  //   setIsOtp(false)
  //   console.log('step value is ', value)
  //   setStep(value)
  // }

  const handleOtpOpen = () => {
    setIsOtp(true)
  }

  const handleOtpClose = () => {
    setIsOtp(false)
    console.log('close')
  }

  return (
    <div className={`${styles.signup} pb-[180px] md:h-[1072px] md:bg-cover md:bg-center`}>
      <Navbar itemsColor='white' />
      {isOtp ? (
        <OTPForm closeOtp={handleOtpClose} type={'registration'} tokens={tokens} />
      ) : (
        <SignupForm openOtp={handleOtpOpen} setTokens={handleChangeTokens} />
      )}
    </div>
  )
}

export default withApollo()(withAuth(Signup))
