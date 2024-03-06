import { Rating, LinearProgress, Typography, Button, Modal } from '@mui/material'
import Image from 'next/image'
import { PrimaryBtn } from '../Buttons'
import { useState } from 'react'
import styles from './styles.module.css'
import InputField from '../InputField'
import useCreateReview from '../../hooks/Reviews/useCreateReview'
import { usePathname, useRouter } from 'next/navigation'
// import { toast } from 'react-toastify'
import toast from 'react-hot-toast'

const AddReviewCardShop = ({ open, onClose, refetchReviews }: any) => {
  const [rating, setRating] = useState(0)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  // Error state for input fields
  const [titleError, setTitleError] = useState('')
  const [descriptionError, setDescriptionError] = useState('')
  const [ratingError, setRatingError] = useState('')

  const [addReview]: any = useCreateReview()
  const router = useRouter()
  const pathname = usePathname()
  console.log(pathname)
  if (!pathname) {
    return <div>Loading...</div> // or handle the null case in an appropriate way
  }
  const path = pathname.split(`/`)
  const slug = path[2]
  const urlParams = path[4]

  const resetFields = () => {
    setTitle('')
    setDescription('')
    setRating(0)

    setTitleError('')
    setDescriptionError('')
    setRatingError('')
  }

  const handleCreateReview = async (e: any) => {
    e.stopPropagation()
    // console.log('clicked')
    if (!rating || !title || !description) {
      if (!rating) {
        setRatingError('Rating is required')
      }
      if (!title) {
        setTitleError('Title is required')
      }
      if (!description) {
        setDescriptionError('Description is required')
      }

      return
    }

    try {
      const input = {
        // productId: urlParams,
        shopId: slug,
        rating: parseInt(rating.toString()),
        title: title,
        description: description,
        reviewType: 'shop',
      }
      // console.log('productId', productId)
      const res = await addReview({
        variables: {
          input,
        },
      })
      // console.log('res is ', res)
      toast.success('Review added successfully')
      // toast.success('Review added successfully', {
      //   position: 'top-right',
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: 'light',
      // })
      resetFields()
      refetchReviews()
      onClose()

      //   handleSuccessOpen();
    } catch (err) {
      console.log(err)
      //   handleErrorOpen();
      toast.error('Failed to add review!')
      // toast.error('Failed to add review!', {
      //   position: 'top-right',
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: 'light',
      // })
    }
    // setIsFavorite(!isFavorite)
    // console.log('favourite clicked')
  }
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
    >
      <div className={styles.paper}>
        <div className={styles.root}>
          <div>
            <Image
              width={30}
              height={30}
              alt='close icon'
              className='cursor-pointer float-right'
              onClick={onClose}
              src='/Images/x.svg'
            />
          </div>
          <h1
            style={{
              margin: '5%',
              // marginTop: '16px',
              marginBottom: '16px',
              textAlign: 'center',
              fontSize: '24px',
              fontWeight: '600',
              height: '33px',
              // marginBottom: '4px',
            }}
          >
            Add Review Shop
          </h1>
          <div>
            <Rating
              sx={{
                gap: '3px',
              }}
              name='read-only'
              value={rating}
              onChange={(e: any) => {
                setRatingError('')
                setRating(e.target.value)
              }}
            />
            {ratingError && (
              <Typography
                sx={{
                  color: '#d32f2f',
                  fontSize: '0.75rem !important',
                  fontFamily: `"Roboto","Helvetica","Arial",sans-serif`,
                  fontWeight: '400',
                  lineHeight: '1.66',
                  letterSpacing: '0.03333em',
                  textAlign: 'left',
                  marginTop: '3px',
                  marginRight: '14px',
                  marginBottom: '0px',
                  marginLeft: '14px',
                }}
              >
                {ratingError}
              </Typography>
            )}
          </div>
          <div className='w-full'>
            <InputField
              label='title'
              type='text'
              inputColor='#090909'
              // rows={7}
              name='shopDescription'
              value={title}
              errorText={titleError}
              required={false}
              changeHandler={(e: any) => {
                setTitleError('')
                setTitle(e.target.value)
              }}
            />
          </div>
          <div className='w-full'>
            <InputField
              label='description'
              type='textarea'
              inputColor='#090909'
              rows={7}
              name='shopDescription'
              value={description}
              errorText={descriptionError}
              required={false}
              changeHandler={(e: any) => {
                setDescriptionError('')
                setDescription(e.target.value)
              }}
            />
          </div>
          <div>
            <div className='my-[10px]' style={{ display: 'flex', justifyContent: 'end' }}>
              <PrimaryBtn
                text='Submit Review'
                // disabled={true}
                // disabled={
                //   !amount ||
                //   loadingAddDividend ||
                //   selected.length < 1 ||
                //   selectedToDisplay.length < 1
                // }
                // className={
                //   !amount ||
                //   loadingAddDividend ||
                //   selected.length < 1 ||
                //   selectedToDisplay.length < 1
                //     ? styles.btnDisabled
                //     : styles.btnCreate
                // }
                handleClick={handleCreateReview}
                // className={styles.btnCreate}
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default AddReviewCardShop
