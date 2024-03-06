import { Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { PrimaryBtn } from '../Buttons'
// import CustomSwitch from '../CustomSwitch/CustomSwitch'
import PasswordField from '../PasswordField'
import hashPassword from 'lib/utils/hashPassword'
import styles from './styles.module.css'
import useChangePassword from '../../hooks/Authentication/ChangePassword/useChangePassword.js'
import toast from 'react-hot-toast'
import { withApollo } from 'lib/apollo/withApollo'
import ErrorMessage from '../ErrorMessage'
import { checkPassword } from 'helpers/validations'

const PreferencesForm = () => {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  // const [error, setError] = useState({ message: '' })
  const [changePassword, loadingChangePassword] = useChangePassword()
  const [oldPasswordError, setOldPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
  const [newPasswordError, setNewPasswordError] = useState('')
  const [genError, setGenError] = useState<String | any>('')
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  // const [orderPlaced, setOrderPlaced] = useState(false)
  // const [orderCompleted, setOrderCompleted] = useState(false)
  // const [promotionsAvailable, setPromotionsAvailable] = useState(false)

  //   Error state for input fields

  //   switch change functions
  // const handleOrderPlacedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setOrderPlaced(event.target.checked)
  // }

  // const handleOrderCompletedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setOrderCompleted(event.target.checked)
  // }

  // const handlePromotionsAvailableChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setPromotionsAvailable(event.target.checked)
  // }

  // handleChange function for input fields
  const handleChange = (name: string, value: string) => {
    if (name === 'old_password') {
      setOldPassword(value)
      setOldPasswordError(value ? '' : 'Please enter the old password')
    } else if (name === 'new_password') {
      setNewPassword(value)
      setNewPasswordError(value ? '' : 'Please enter the new password')
    } else if (name === 'confirm_password') {
      setConfirmPassword(value)
      setConfirmPasswordError(value ? '' : 'Please confirm the password')
    }
  }
  // const validateInput = () => {
  //   if (!oldPassword || oldPassword == '') {
  //     setError({ message: 'Current Password is required' })
  //     // throw new Error('Current Password is required')
  //   } else if (!newPassword || newPassword == '') {
  //     setError({ message: 'New Password is required' })
  //     // throw new Error('New Password is required')
  //   } else if (confirmPassword != newPassword) {
  //     setError({ message: 'Password does not match' })
  //     // throw new Error('Password does not match')
  //   }
  // }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // setError({ message: '' })
    setOldPasswordError('')
    setConfirmPasswordError('')
    setNewPasswordError('')
    setGenError('')
    // setSuccess('')
    const isPasswordMatched = checkPassword(newPassword, confirmPassword)
    console.log('passwords', oldPassword, newPassword)
    if (!oldPassword || !confirmPassword || !newPassword) {
      if (!oldPassword) {
        setOldPassword('Password is required')
      }
      if (!confirmPassword) {
        console.log(confirmPassword)
        setConfirmPasswordError('Confirm password is required')
      }
      if (!newPassword) {
        console.log(newPassword)

        setNewPasswordError('New Password is required')
      }
      return
    }
    if (!isPasswordMatched) {
      setConfirmPasswordError('Passwords do not match')
      return
    }
    try {
      setIsLoggingIn(true)
      const res = await changePassword({
        variables: {
          oldPassword: hashPassword(oldPassword),
          newPassword: hashPassword(newPassword),
        },
      })
      console.log('password client response is ', res)
      if (res?.data?.changePassword) {
        setIsLoggingIn(false)
        toast.success('Password changed successfully')
      }

      if (res?.status === 401 && !res?.ok) {
        setIsLoggingIn(false)
        setGenError('Invalid email or password')
        return
      }
    } catch (err: any) {
      toast.error(`Error is '${err?.message}`)
      setIsLoggingIn(false)
      setGenError(err?.message)
    }
    // Reset form fields
    setOldPassword('')
    setNewPassword('')
    setConfirmPassword('')
    // Reset error states
    setOldPasswordError('')
    setNewPasswordError('')
    setConfirmPasswordError('')
  }
  const handleChangeGenError = (value: String) => {
    setGenError(value)
  }

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <div>
        <Typography
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '18px !important',
            fontFamily: 'Open Sans',
            fontWeight: '700 !important',
            lineHeight: 'normal',
            letterSpacing: '0.5px',
            color: '#090909',
            textTransform: 'capitalize',
            '@media (max-width: 767px)': {
              fontSize: '16px !important',
            },
          }}
        >
          <img src='/Images/profile-icon-pink.svg' alt='Customize' className='w-[22px] h-[22px]' />
          <span>Profile</span>
        </Typography>
      </div>

      <div className='mt-[32px]'>
        <div className='mt-[22px] w-full'>
          <PasswordField
            label='Current Password'
            placeholder='Enter your current password'
            name='old_password'
            errorText={oldPasswordError}
            required
            value={oldPassword}
            inputColor='#888'
            onChange={handleChange}
          />
          <PasswordField
            label='new password'
            placeholder='Enter your new password'
            name='new_password'
            errorText={newPasswordError}
            required
            value={newPassword}
            inputColor='#888'
            onChange={handleChange}
          />
          <PasswordField
            label='confirm password'
            placeholder='Confirm your new password'
            name='confirm_password'
            errorText={confirmPasswordError}
            required
            value={confirmPassword}
            inputColor='#888'
            onChange={handleChange}
          />

          <div>
            <ErrorMessage error={genError} setError={handleChangeGenError} />
          </div>
          <Typography
            sx={{
              marginTop: '4px',
              fontSize: '14px !important',
              fontFamily: 'Open Sans',
              fontWeight: '600 !important',
              lineHeight: '20px',
              color: '#676767',
            }}
          >
            Please change your password by entering previous and current password
          </Typography>
        </div>

        {/* <div className='mt-[48px]'>
          <Typography
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '18px !important',
              fontFamily: 'Open Sans',
              fontWeight: '700 !important',
              lineHeight: 'normal',
              letterSpacing: '0.5px',
              color: '#090909',
              textTransform: 'capitalize',
              '@media (max-width: 767px)': {
                fontSize: '16px !important',
              },
            }}
          >
            <img
              src='/Images/notification-icon.svg'
              alt='notification'
              className='w-[22px] h-[22px]'
            />
            <span>Notifications</span>
          </Typography>
        </div> */}

        {/* <div className='mt-[32px] flex flex-col gap-y-[16px]'>
          <div className='flex justify-between w-full md:w-[40%] items-center'>
            <Typography
              sx={{
                fontSize: '16px !important',
                fontFamily: 'Open Sans',
                fontWeight: '400 !important',
                lineHeight: 'normal',
                color: '#747474',
              }}
            >
              Order placed
            </Typography>
            <CustomSwitch value={orderPlaced} handleChange={handleOrderPlacedChange} />
          </div>
          <div className='flex justify-between w-full md:w-[40%] items-center'>
            <Typography
              sx={{
                fontSize: '16px !important',
                fontFamily: 'Open Sans',
                fontWeight: '400 !important',
                lineHeight: 'normal',
                color: '#747474',
              }}
            >
              Order completed
            </Typography>
            <CustomSwitch value={orderCompleted} handleChange={handleOrderCompletedChange} />
          </div>
          <div className='flex justify-between w-full md:w-[40%] items-center'>
            <Typography
              sx={{
                fontSize: '16px !important',
                fontFamily: 'Open Sans',
                fontWeight: '400 !important',
                lineHeight: 'normal',
                color: '#747474',
              }}
            >
              Promotions available
            </Typography>
            <CustomSwitch
              value={promotionsAvailable}
              handleChange={handlePromotionsAvailableChange}
            />
          </div>
        </div> */}

        <div className='mt-[48px] w-full h-[45px]'>
          <PrimaryBtn type='submit' text='Save personalization settings' loading={isLoggingIn} />
        </div>
      </div>
    </form>
  )
}

export default withApollo()(PreferencesForm)
