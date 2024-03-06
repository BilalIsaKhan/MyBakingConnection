import { Alert, AlertTitle, Collapse, Typography } from '@mui/material'
import { validateEmail, validatePhone } from 'helpers/validations'
import useCustomOrder from 'hooks/order/useCustomOrder'
import { withApollo } from 'lib/apollo/withApollo'
import React, { useState } from 'react'
import { ProductMediaURLsInterface } from 'types'
import AddCustomOrderImages from '../AddCustomOrderImages/AddCustomOrderImages'
import { PrimaryBtn } from '../Buttons'
import InputField from '../InputField/InputField'
import toast from 'react-hot-toast'

interface CustomOrdersFormProps {
  shopId: string
}

const CustomOrdersForm = ({ shopId }: CustomOrdersFormProps) => {
  const [createCustomOrder, loadingCustomOrder] = useCustomOrder()

  const [open, setOpen] = React.useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [date, setDate] = useState('')
  const [occasion, setOccasion] = useState('')
  const [quantity, setQuantity] = useState('')
  const [details, setDetails] = useState('')

  const [productMedia, setProductMedia] = useState<ProductMediaURLsInterface[]>([])
  const [mediaPriority, setMediaPriority] = useState<number>(1)

  //   error states
  const [nameErr, setNameErr] = useState('')
  const [emailErr, setEmailErr] = useState('')
  const [phoneErr, setPhoneErr] = useState('')
  const [dateErr, setDateErr] = useState('')
  const [occasionErr, setOccasionErr] = useState('')
  const [quantityErr, setQuantityErr] = useState('')
  const [detailsErr, setDetailsErr] = useState('')
  // const [productImagesError, setProductImagesError] = useState('')

  //update Custom Order images

  const handleUpdateProductMedia = (image: string) => {
    // console.log('image in parent is ', image)

    // setProductImagesError('')

    setMediaPriority((prev) => prev + 1)

    setProductMedia([
      ...productMedia,
      {
        // productId: '',
        // URLs: {
        large: image,
        medium: image,
        original: image,
        small: image,
        thumbnail: image,
        // },
        // priority: mediaPriority,
      },
    ])
  }

  // handleChange function for input fields
  const handleChange = (name: string, value: string) => {
    if (name === 'name') {
      setName(value)
      setNameErr(value ? '' : 'Name is required')
    } else if (name === 'email') {
      setEmail(value)
      setEmailErr(value ? '' : 'Email is required')
    } else if (name === 'phone') {
      setPhone(value)
      setPhoneErr(value ? '' : 'Phone is required')
    } else if (name === 'occassion') {
      setOccasion(value)
      setOccasionErr(value ? '' : 'Occassion is required')
    } else if (name === 'date') {
      setDate(value)
      setDateErr(value ? '' : 'Date is required')
    } else if (name === 'quantity') {
      setQuantity(value)
      setQuantityErr(value ? '' : 'Quantity is required')
    } else if (name === 'details') {
      setDetails(value)
      setDetailsErr(value ? '' : 'Details are required')
    }
  }

  const resetForm = () => {
    // Resets the form fields
    setName('')
    setEmail('')
    setPhone('')
    setDate('')
    setOccasion('')
    setQuantity('')
    setDetails('')
    setProductMedia([])

    // Resets the error states
    setNameErr('')
    setEmailErr('')
    setPhoneErr('')
    setDateErr('')
    setOccasionErr('')
    setQuantityErr('')
    setDetailsErr('')
  }

  // handleSubmit function for form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // console.log('product media in custom order form is ', productMedia)

    // return
    const selectedDate = new Date(date)
    const currentDate = new Date()
    console.log('dates are', selectedDate, currentDate, selectedDate < currentDate)
    console.log(!name || !email || !phone || !date || !details || !occasion || !quantity)
    // Checks if email is valid
    const isEmailValid = validateEmail(email)
    const isPhoneValid = validatePhone(phone)

    // Checks if all fields are filled
    if (!name || !email || !phone || !date || !details || !occasion || !quantity) {
      if (!name) {
        setNameErr('Name is required')
      }

      if (!email) {
        setEmailErr('Email is required')
      } else {
        if (!isEmailValid) {
          setEmailErr('Email is not valid')
        }
      }

      if (!phone) {
        setPhoneErr('Phone is required')
      } else {
        if (!isPhoneValid) {
          setPhoneErr('Phone number is not valid')
        }
      }

      if (!date) {
        console.log('error')
        setDateErr('Please select a valid date in the future')
      }

      if (!quantity) {
        setQuantityErr('Quantity is required')
      }

      if (!details) {
        setDetailsErr('Details are required')
      }

      if (!occasion) {
        setOccasionErr('Occasion is required')
      }

      // Stops the execution of the function
      return
    }

    // Checks if email is valid
    if (!isEmailValid) {
      setEmailErr('Email is not valid')
      return
    }

    if (selectedDate < currentDate) {
      setDateErr('Please select a valid date')
      return
    }
    if (!isPhoneValid) {
      setPhoneErr('Phone number is not valid')
      return
    }

    try {
      const input = {
        itemName: name,
        email: email,
        phoneNumber: phone,
        quantity: parseInt(quantity),
        details: details,
        shopId: shopId,
        occasion: occasion,
        fulfillmentDate: date,
        inspirationMedia: productMedia,
      }

      //@ts-ignore
      const result = await createCustomOrder({
        variables: {
          input,
        },
      })

      if (result?.data?.createCustomOrder?.referenceId) {
        toast.success('Custom Order created successfully')
        setErrorMsg('')
        setOpen(false)
        resetForm()
      }
    } catch (error: any) {
      // console.log('error in creating custom order is ', error?.message)
      setErrorMsg(error?.message)
      setOpen(true)
      setTimeout(() => {
        setOpen(false)
      }, 7000)
    }
  }
  return (
    <div
      className='w-full py-[24px] md:py-[48px]'
      style={{
        background: '#fff',
        boxShadow: '0px 1px 30px 0px rgba(0, 0, 0, 0.15)',
      }}
    >
      <Typography
        sx={{
          textAlign: 'center',
          fontSize: '26px !important',
          color: '#F8B4CB',
          fontFamily: 'Josefin Sans',
          fontWeight: '700',
          textTransform: 'capitalize',
          lineHeight: 'normal',
          fontFeatureSettings: "'clig' off, 'liga' off",
          '@media (max-width: 767px)': {
            fontSize: '18px !important',
          },
        }}
      >
        {`Looking for something custom? `}
      </Typography>
      <Typography
        sx={{
          textAlign: 'center',
          fontSize: '26px !important',
          color: '#F8B4CB',
          fontFamily: 'Josefin Sans',
          fontWeight: '700',
          textTransform: 'capitalize',
          lineHeight: 'normal',
          fontFeatureSettings: "'clig' off, 'liga' off",
          '@media (max-width: 767px)': {
            fontSize: '18px !important',
          },
        }}
      >
        {`Submit a Custom Order Request to connect!`}
      </Typography>

      <div className='mt-[24px] md:mt-[48px]'>
        <form onSubmit={handleSubmit} className='flex justify-center'>
          <div className='w-[95%] md:w-[80%] flex flex-wrap gap-y-[24px] md:gap-y-[48px] justify-between'>
            <div className='w-full md:w-[45%]'>
              <InputField
                label='name'
                type='text'
                //   placeholder='Search'
                inputColor='#090909'
                name='name'
                value={name}
                //   startIcon={<img src='/Images/search-input-icon.svg' alt='search' />}
                // error={isError}
                errorText={nameErr}
                required
                onChange={handleChange}
              />
            </div>
            <div className='w-full md:w-[45%]'>
              <InputField
                label='email'
                type='text'
                //   placeholder='Search'
                inputColor='#090909'
                name='email'
                value={email}
                //   startIcon={<img src='/Images/search-input-icon.svg' alt='search' />}
                // error={isError}
                errorText={emailErr}
                required
                onChange={handleChange}
              />
            </div>
            <div className='w-full md:w-[45%]'>
              <InputField
                label='phone number'
                type='number'
                //   placeholder='Search'
                inputColor='#090909'
                name='phone'
                value={phone}
                //   startIcon={<img src='/Images/search-input-icon.svg' alt='search' />}
                // error={isError}
                errorText={phoneErr}
                required
                onChange={handleChange}
              />
            </div>

            <div className='w-full md:w-[45%]'>
              <InputField
                label={`Date you'd like item(s)`}
                type='date'
                //   placeholder='Search'
                inputColor='#090909'
                name='date'
                value={date}
                //   startIcon={<img src='/Images/search-input-icon.svg' alt='search' />}
                // error={isError}
                errorText={dateErr}
                required
                onChange={handleChange}
              />
            </div>
            <div className='w-full md:w-[45%]'>
              <InputField
                label='occasion'
                type='text'
                //   placeholder='Search'
                inputColor='#090909'
                name='occassion'
                value={occasion}
                //   startIcon={<img src='/Images/search-input-icon.svg' alt='search' />}
                // error={isError}
                errorText={occasionErr}
                required
                onChange={handleChange}
              />
            </div>
            <div className='w-full md:w-[45%]'>
              <InputField
                label='quantity'
                type='number'
                //   placeholder='Search'
                inputColor='#090909'
                name='quantity'
                value={quantity}
                //   startIcon={<img src='/Images/search-input-icon.svg' alt='search' />}
                // error={isError}
                errorText={quantityErr}
                required
                onChange={handleChange}
              />
            </div>
            <div className='w-full'>
              <InputField
                label={`Details (product, colors, flavors and any other specific details)`}
                type='textarea'
                rows={6}
                //   placeholder='Search'
                inputColor='#090909'
                name='details'
                value={details}
                //   startIcon={<img src='/Images/search-input-icon.svg' alt='search' />}
                // error={isError}
                errorText={detailsErr}
                required
                onChange={handleChange}
              />
            </div>

            <div className='mt-[24px]  w-full flex justify-center'>
              <AddCustomOrderImages
                productMedia={productMedia}
                handleUpdateProductMedia={handleUpdateProductMedia}
                setProductMedia={setProductMedia}
              />
              {/* <div
                className='w-[90%] md:max-w-[350px] flex flex-col items-center px-[24px] py-[40px]'
                style={{
                  border: '1px dashed #6C6C6C',
                }}
              >
                <div className='flex justify-center'>
                  <Typography
                    variant='body1'
                    sx={{
                      textAlign: 'center',
                      color: '#090909',
                      fontSize: '14px',
                      fontWeight: '400',
                      letterSpacing: '0.5px',
                      lineHeight: '23px',
                      fontFamily: 'Open Sans',
                      textTransform: 'capitalize',
                      display: 'flex',
                      gap: '16px',
                      width: 'fit-content',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                    onClick={() => console.log('upload btn clicked')}
                  >
                    <img src='/Images/upload-product.svg' alt='upload-icon' />

                    <span>{`Upload inspiration pictures`}</span>
                  </Typography>
                </div>
              </div> */}
            </div>

            <div className='w-full flex flex-col items-center'>
              {/* <SecondaryBtn
                text='select from favourites'
                color='#090909'
                handleClick={() => console.log('fav btn clicked')}
              />

              <Typography>or</Typography> */}
              <Collapse
                in={open}
                sx={{
                  width: '100%',
                }}
              >
                <Alert
                  severity='error'
                  sx={{
                    width: '100%',
                  }}
                >
                  <AlertTitle>Error</AlertTitle>
                  {errorMsg}
                </Alert>
              </Collapse>

              <div className='w-full mt-[12px]'>
                {/* @ts-ignore */}
                <PrimaryBtn loading={loadingCustomOrder} text='send message' type='submit' />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default withApollo()(CustomOrdersForm)
