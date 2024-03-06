import { Typography } from '@mui/material'
import React from 'react'

interface NotificationItemProps {
  //   id: string
  status: string
  description: string
  image: string
  time: string
}

const NotificationItem = ({ status, description, image, time }: NotificationItemProps) => {
  return (
    <div className={`w-full flex gap-[20px] items-center`}>
      <div className='relative flex justify-center items-center rounded-full border-solid border-[4px] border-[#7DDEC1] p-1'>
        <div className='w-full flex justify-center items-center'>
          <img
            src={image}
            alt='logo'
            className='w-[70px] md:w-[90px] h-[70px] md:h-[90px] object-fill rounded-full'
          />
        </div>
        {status === 'read' ? (
          <div className='absolute flex items-center justify-center bottom-0 md:bottom-[-5px] right-0 md:right-[-5px] bg-white rounded-full w-fit h-fit border-solid border-[2px] border-[#fff]'>
            <img
              src='/Images/mark-as-read.svg'
              alt='mark-as-read'
              className=' w-[20px] md:w-[30px] h-[20px] md:h-[30px]'
            />
          </div>
        ) : null}
      </div>
      <div>
        <Typography
          sx={{
            fontSize: '16px !important',
            fontFamily: 'Open Sans',
            fontWeight: 'normal !important',
            lineHeight: '24px',
            color: '#000',
            '@media (max-width: 767px)': {
              fontSize: '12px !important',
            },
          }}
        >
          {description}
        </Typography>
        <Typography
          sx={{
            fontSize: '12px !important',
            fontFamily: 'Open Sans',
            fontWeight: 'normal !important',
            lineHeight: '24px',
            color: '#000',
            '@media (max-width: 767px)': {
              fontSize: '10px !important',
            },
          }}
        >
          {time}
        </Typography>
      </div>
    </div>
  )
}

export default NotificationItem
