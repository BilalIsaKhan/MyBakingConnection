import { Typography } from '@mui/material'
import React, { useState } from 'react'
import { SearchBakerItemProps } from 'types'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import MoreDetails from '../MoreDetails'

const SearchBakerItem = ({
  image,
  title,
  description,
  rating,
  state,
  city,
  slug,
}: SearchBakerItemProps) => {
  const router = useRouter()
  // function handleBakerDetailsClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  //   e.stopPropagation()

  //   // console.log('slug', `/product/${slug}`)

  //   // router.push(`/baker/${slug}`)
  // }

  return (
    <Link
      href={`/shop/${slug}`}
      className='w-full h-full flex items-start justify-center gap-x-[16px] cursor-pointer'
      // onClick={(e) => handleBakerDetailsClick(e)}
    >
      <img
        src={image}
        alt={title}
        className='h-[110px] md:h-[150px] w-[110px] md:w-[150px] rounded-[10px] object-cover'
      />
      <div className='w-full h-full flex flex-col justify-between'>
        <Typography
          sx={{
            fontSize: '18px !important',
            fontFamily: 'Open Sans',
            lineHeight: 'normal',
            fontWeight: '700 !important',
            textTransform: 'uppercase',
            color: '#090909',
            '@media (max-width: 767px)': {
              fontSize: '16px !important',
            },
          }}
        >
          {title}
        </Typography>

        <Typography
          component='div'
          sx={{
            marginTop: '8px',
            fontSize: '16px !important',
            fontFamily: 'Open Sans',
            lineHeight: 'normal',
            fontWeight: '400 !important',
            // textTransform: 'normal',
            color: '#6C6C6C',
            '@media (max-width: 767px)': {
              fontSize: '14px !important',
            },
          }}
        >
          <MoreDetails
            lineHeight='normal'
            color='#6C6C6C'
            fontFamily='Open Sans'
            fontWeight={400}
            fontSize={16}
            text={description}
            words={400}
          />
          {/* {description} */}
        </Typography>

        <div className='flex flex-col md:flex-row justify-between mt-[8px] gap-y-[8px]'>
          <Typography
            sx={{
              fontSize: '18px !important',
              fontFamily: 'Josefin Sans',
              lineHeight: '26px',
              fontWeight: '400 !important',
              textTransform: 'capitalize',
              color: '#888',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              '@media (max-width: 767px)': {
                alignItems: 'start',
                fontSize: '14px !important',
              },
            }}
          >
            <img
              src='/Images/profile-location.svg'
              alt='location-icon'
              className='h-[15px] w-[15px]'
            />
            <span>{`${city + ',' + ' ' + state}`}</span>
          </Typography>
          <Typography
            sx={{
              fontSize: '16px !important',
              fontFamily: 'Josefin Sans',
              lineHeight: 'normal',
              fontWeight: '500 !important',
              textTransform: 'capitalize',
              color: '#000',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <img src='/Images/star.svg' alt='location-icon' className='h-[15px] w-[15px]' />
            {rating}
          </Typography>
        </div>
      </div>
    </Link>
  )
}

export default SearchBakerItem
