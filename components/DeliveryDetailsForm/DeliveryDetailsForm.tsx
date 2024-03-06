import {
  Checkbox,
  CircularProgress,
  FormControl,
  FormHelperText,
  Radio,
  Typography,
} from '@mui/material'
import { pickupDayOptions, pickupHoursOptions } from 'Constants/constants'
import useGetFlatRateFulfillmentByShopId from 'hooks/order/useGetFlatRateFulfillmentByShopId'
import usePlaceOrder from 'hooks/order/usePlaceOrder'
import useCreateStripeCheckOutSession from 'hooks/stripe/useCreateStripeCheckOutSession'
import useCreateStripeSinglePrice from 'hooks/stripe/useCreateStripeSinglePrice'
import useViewer from 'hooks/viewer/useViewer'
import { withApollo } from 'lib/apollo/withApollo'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { PrimaryBtn } from '../Buttons'
import CustomAutocomplete from '../CustomAutocomplete'
import DropdownField from '../DropdownField/DropdownField'
import InputField from '../InputField/InputField'
import toast from 'react-hot-toast'

interface DeliveryDetailsFormProps {
  amount: number
  cartFunctions: any
  slug: string
}

const DeliveryDetailsForm = ({ slug, amount, cartFunctions }: DeliveryDetailsFormProps) => {
  const router = useRouter()
  const [viewer, loadingViewer, refetchViewer] = useViewer()

  console.log('slug in delivery form', slug)

  const [createStripePrice, loadingStripePrice] = useCreateStripeSinglePrice()
  const [createStripeCheckoutSession, loadingStripeCheckout] = useCreateStripeCheckOutSession()

  const [flatRateData, loadingFlatRate] = useGetFlatRateFulfillmentByShopId(slug)

  // console.log('cart functions in delivery form', cartFunctions)

  useEffect(() => {
    // console.log('flat rate data is ', flatRateData)
  }, [flatRateData])

  const [placeOrderFunction, placeOrderLoading] = usePlaceOrder()

  const [address, setAddress] = useState('')
  // const [country, setCountry] = useState('')
  const [postCode, setPostCode] = useState('')
  const [states, setStates] = useState<any>([])
  const [isLoadingStates, setIsLoadingStates] = useState(false)
  const [state, setState] = useState<string | null>('')
  const [isLoadingCities, setIsLoadingCities] = useState(false)
  const [cities, setCities] = useState<any>([])
  const [city, setCity] = useState<string | null>('')
  const [additionalNotes, setAdditionalNotes] = useState('')
  const [deliveryMethod, setDeliveryMethod] = useState(true)
  const [pickupDay, setPickupDay] = useState('')
  const [pickupHours, setPickupHours] = useState('')
  const [termsAndConditions, setTermsAndConditions] = useState(false)

  useEffect(() => {
    // console.log('viwer in details form', viewer)
    setState(viewer?.state)
    setCity(viewer?.city)
    setAddress(viewer?.currentAddress)
  }, [viewer])

  // Error states
  const [addressError, setAddressError] = useState('')
  const [countryError, setCountryError] = useState('')
  const [postCodeError, setPostCodeError] = useState('')
  const [stateError, setStateError] = useState('')
  const [cityError, setCityError] = useState('')
  const [deliveryMethodError, setDeliveryMethodError] = useState('')
  const [termsAndConditionsError, setTermsAndConditionsError] = useState('')

  // handleChange function for input fields
  const handleChange = (name: string, value: string) => {
    if (name === 'address') {
      setAddress(value)
      setAddressError(value ? '' : 'Address is required')
    } else if (name === 'postCode') {
      setPostCode(value)
      setPostCodeError(value ? '' : 'Postcode is required')
    } else if (name === 'additionalNotes') {
      setAdditionalNotes(value)
    }
  }

  // handle Radio Button change  for Delivery Method
  const handleDeliveryMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === 'selfPickup') {
      setDeliveryMethod(true)
      setDeliveryMethodError('')
    } else {
      setDeliveryMethod(false)
      setDeliveryMethodError('')
    }
  }

  // handleCheckBox function for Terms and Conditions
  const handleCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target

    setTermsAndConditions(checked)
    setTermsAndConditionsError(checked ? '' : 'Please accept the terms and conditions')
  }

  // handleStateChange function for state dropdown
  const handleStateChange = (state: string) => {
    setState(state)
    setStateError(state ? '' : 'State is required')
  }

  // handleCityChange function for city dropdown
  const handleCityChange = (state: string) => {
    setCity(state)
    setCityError(state ? '' : 'City is required')
  }

  // handlePickupDayChange function for pickupDay dropdown
  const handlePickupDayChange = (day: string) => {
    setPickupDay(day)
    // setPickupDayError(day ? '' : 'Pickup Day is required')
  }

  // handlePickupHoursChange function for Pickup hour dropdown
  const handlePickupHoursChange = (hour: string) => {
    setPickupHours(hour)
    // setPickupHoursError(hour ? '' : 'Pickup Hour is required')
  }

  const resetForm = () => {
    // Resets the form fields
    setAddress('')
    setPostCode('')
    setState('')
    setCity('')
    setAdditionalNotes('')
    setDeliveryMethod(true)
    setPickupDay('')
    setPickupHours('')
    setTermsAndConditions(false)

    // Resets the error states
    setAddressError('')
    setCountryError('')
    setPostCodeError('')
    setStateError('')
    setCityError('')
    setDeliveryMethodError('')
    setTermsAndConditionsError('')
  }

  const [stripePriceId, setStripePriceId] = useState()
  const createStripePriceHandler = async () => {
    try {
      const totalAmount = parseFloat((amount * 100).toString()).toFixed(2)
      console.log('total amount is ', totalAmount)
      //@ts-ignore
      const price = await createStripePrice({
        variables: {
          unitAmount: parseFloat(totalAmount),
          currency: 'usd',
        },
      })

      // console.log('price is ', price)
      const priceId = price.data.createStripeSinglePrice.stripeData.id
      await createStripeCheckoutSessionHandler(priceId)
    } catch (err: any) {
      toast.error(`Error is '${err?.message}`)

      // console.log('err', err)
    }
  }

  const createStripeCheckoutSessionHandler = async (priceId: string) => {
    try {
      //@ts-ignore
      const session = await createStripeCheckoutSession({
        variables: {
          priceId,
          quantity: 1,
          mode: 'payment',
        },
      })
      // console.log('session', session)
      const url = session.data.createStripeCheckOutSession.stripeData
      // console.log('stripe url is ', url)
      await placeOrderHandler()
      window.location.href = url
    } catch (err: any) {
      toast.error(`Error is '${err?.message}`)
      // console.log(err)
    }
  }

  const placeOrderHandler = async () => {
    const items = cartFunctions?.cart?.items?.map((item: any, index: any) => {
      const quantity = item?.quantity
      const price = item?.price?.amount
      const productConfiguration = item?.productConfiguration

      return { quantity, price, productConfiguration }
    })

    console.log('items are ', items)

    const input = {
      order: {
        shopId: slug,
        cartId: cartFunctions?.cart?._id,
        currencyCode: 'USD',
        email: viewer?.primaryEmailAddress,
        fulfillmentGroups: {
          type: 'shipping',
          shopId: slug,
          selectedFulfillmentMethodId: flatRateData?._id ? flatRateData?._id : 0,
          data: {
            shippingAddress: {
              postal: postCode,
              isShippingDefault: true,
              address1: address,
              city,
              region: state,
              country: 'USA',
              firstName: viewer?.firstName,
              lastName: viewer?.lastName,
              fullName: `${viewer?.firstName} ${viewer?.lastName}`,
              isCommercial: false,
              phone: viewer?.phone,
            },
          },
          items,
        },
      },
      payments: {
        amount: amount,
        billingAddress: {
          address1: address,
          city: city,
          phone: viewer?.phone,
          firstName: viewer?.firstName,
          fullName: `${viewer?.firstName} ${viewer?.lastName}`,
          country: 'USA',
          region: state,
          postal: postCode,
          metafields: [
            {
              key: 'notes',
              description: additionalNotes,
            },
          ],
        },
        // method: 'stripe_payment_intent',
        method: 'iou_example',
      },
    }

    console.log('input', input)
    // return

    try {
      //@ts-ignore
      const response = await placeOrderFunction({
        variables: {
          input,
        },
      })

      console.log('response of place order is ', response)
      createStripePriceHandler()
    } catch (error: any) {
      toast.error(`Error is ', ${error?.message}`)
      // console.log('error in placeOrderHandler is', error?.message)
    }
  }

  // handleSubmit function for form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Checks if all fields are filled
    if (!address || !postCode || !state || !city || !deliveryMethod || !termsAndConditions) {
      if (!address) {
        setAddressError('Address is required')
      }

      if (!postCode) {
        setPostCodeError('Postcode is required')
      }

      if (!state) {
        setStateError('State is required')
      }

      if (!city) {
        setCityError('City is required')
      }

      if (!deliveryMethod) {
        setDeliveryMethodError('Delivery Method is required')
      }

      if (!termsAndConditions) {
        setTermsAndConditionsError('Please accept the terms and conditions')
      }

      console.log('all fields are not filled')
      // Stops the execution of the function
      return
    }

    // If all fields are filled, then place the order
    // await placeOrderHandler()
    console.log('before place order handler')
    await placeOrderHandler()

    // Resets the form fields
    // resetForm()
  }

  // useEffect(() => {
  //   if (loadingViewer) return

  //   if (viewer?.state) {
  //     setState(viewer?.state)
  //   }

  //   getStatesApi(setStates, setIsLoadingStates)
  // }, [])

  // useEffect(() => {
  //   if (loadingViewer) return

  //   if (viewer?.city) {
  //     setCity(viewer)
  //   }

  //   setCities([])
  //   setCity('')
  //   getCitiesApi(state, setCities, setIsLoadingCities)
  // }, [state])

  return (
    <>
      {loadingViewer ? (
        <>
          {' '}
          <CircularProgress
            sx={{
              color: '#7DDEC1',
              height: '20px !important',
              width: '20px !important',
            }}
          />
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className='w-full flex flex-wrap gap-y-[24px] md:gap-y-[24px] justify-between'>
            <div className='w-full'>
              <InputField
                label='Address'
                type='text'
                inputColor='#212529'
                name='address'
                value={address}
                errorText={addressError}
                required
                onChange={handleChange}
              />
            </div>

            {/* <div className='w-full md:w-[45%]'>
          <DropdownField
            label='country'
            required
            name='country'
            errorText={countryError}
            value={country}
            options={countries}
            inputColor='#212529'
            onChange={handleCountryChange}
          />
        </div> */}

            <div className='w-full md:w-[45%]'>
              <InputField
                label='postcode'
                type='text'
                inputColor='#212529'
                name='postCode'
                value={postCode}
                errorText={postCodeError}
                required
                onChange={handleChange}
              />
            </div>

            <div className='w-full md:w-[45%]'>
              <CustomAutocomplete
                label='state'
                required
                loading={isLoadingStates}
                name='state'
                errorText={stateError}
                value={state}
                options={states}
                inputColor='#212529'
                onChange={handleStateChange}
                disabled={true}
              />
            </div>

            <div className='w-full md:w-[45%]'>
              <CustomAutocomplete
                label='city'
                required
                loading={isLoadingCities}
                name='city'
                errorText={cityError}
                value={city}
                options={cities}
                inputColor='#212529'
                disabled={true}
                onChange={handleCityChange}
              />
            </div>

            <div className='w-full'>
              <InputField
                label='additional notes'
                type='textarea'
                rows={4}
                inputColor='#212529'
                name='additionalNotes'
                value={additionalNotes}
                // errorText={''}
                required={false}
                onChange={handleChange}
              />
            </div>

            <div className='w-full flex flex-wrap gap-y-[16px] md:gap-y-[16px] justify-between'>
              <Typography
                sx={{
                  fontSize: '24px !important',
                  fontFamily: 'Open Sans',
                  fontWeight: '700 !important',
                  lineHeight: '32px',
                  color: '#7DDEC1',
                  fontFeatureSettings: "'clig' off, 'liga' off",
                  textTransform: 'capitalize',
                  '@media (max-width: 767px)': {
                    fontSize: '24px !important',
                  },
                }}
              >
                Delivery Method
              </Typography>

              <div className='w-full mt-[20px]'>
                <div className='flex items-center gap-x-[12px]'>
                  <Radio
                    sx={{
                      color: '#212529',
                      padding: '0px',
                      '&.Mui-checked': {
                        color: '#7DDEC1',
                      },
                    }}
                    checked={deliveryMethod === true}
                    onChange={handleDeliveryMethodChange}
                    value={'selfPickup'}
                    name='radio-buttons'
                    inputProps={{ 'aria-label': 'A' }}
                  />
                  <Typography
                    sx={{
                      color: '#212529',
                      fontSize: '16px !important',
                      fontFamily: 'Open Sans',
                      fontWeight: '600 !important',
                      lineHeight: '24px',
                    }}
                  >
                    Self pickup
                  </Typography>
                </div>
              </div>

              <div className='w-full flex flex-wrap justify-between gap-y-[12px]'>
                <div className='w-full md:w-[45%]'>
                  <DropdownField
                    // label='pickupHours'
                    required={false}
                    name='pickup'
                    // errorText={''}
                    placeholder='Select pickup day'
                    value={pickupDay}
                    options={pickupDayOptions}
                    inputColor='#212529'
                    onChange={handlePickupDayChange}
                  />
                </div>

                <div className='w-full md:w-[45%]'>
                  <DropdownField
                    // label='pickupHours'
                    required={false}
                    name='city'
                    // errorText={''}
                    placeholder='Select pickup hours'
                    value={pickupHours}
                    options={pickupHoursOptions}
                    inputColor='#212529'
                    onChange={handlePickupHoursChange}
                  />
                </div>
              </div>

              <div className='w-full'>
                <div className='flex items-center gap-x-[12px]'>
                  <Radio
                    sx={{
                      color: '#212529',
                      padding: '0px',
                      '&.Mui-checked': {
                        color: '#7DDEC1',
                      },
                    }}
                    checked={deliveryMethod === false}
                    onChange={handleDeliveryMethodChange}
                    value={'delivery'}
                    name='radio-buttons'
                    inputProps={{ 'aria-label': 'A' }}
                  />
                  <Typography
                    sx={{
                      color: '#212529',
                      fontSize: '16px !important',
                      fontFamily: 'Open Sans',
                      fontWeight: '600 !important',
                      lineHeight: '24px',
                      textTransform: 'capitalize',
                    }}
                  >
                    Delivery
                  </Typography>
                </div>
              </div>
            </div>

            <div className=''>
              <FormControl error={termsAndConditions ? false : true}>
                <div className='flex justify-start items-center gap-x-[15px] text-[white]'>
                  <Checkbox
                    checked={termsAndConditions}
                    onChange={handleCheckBox}
                    inputProps={{ 'aria-label': 'controlled' }}
                    sx={{
                      padding: '0px',
                      width: '20px',
                      height: '20px',

                      '& .MuiSvgIcon-root': {
                        width: '20px',
                        height: '20px',
                        color: '#212529',
                        borderRadius: '2px',
                        padding: '0px',
                      },
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: '16px !important',
                      fontFamily: 'Open Sans',
                      fontWeight: '400 !important',
                      lineHeight: 'normal',
                      color: '#212529',
                      display: 'flex',
                      justifyContent: 'start',
                      alignItems: 'center',
                    }}
                  >
                    I agree to all the Term of conditions & Privacy Policy
                  </Typography>
                </div>
                {termsAndConditionsError ? (
                  <FormHelperText> {termsAndConditionsError} </FormHelperText>
                ) : (
                  ''
                )}
              </FormControl>
            </div>

            <div className='w-full h-[45px]'>
              <PrimaryBtn
                text='place order'
                type='submit'
                //@ts-ignore
                loading={loadingStripeCheckout || loadingStripePrice || placeOrderLoading}
              />
            </div>
          </div>
        </form>
      )}
    </>
  )
}

export default withApollo()(DeliveryDetailsForm)
