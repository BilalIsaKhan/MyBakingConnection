import React, { useState } from 'react'
import { Badge, Modal, Typography } from '@mui/material'
import { AddToCartModalProps } from 'types'
import { notifications } from 'Constants/constants'
import EmptyCart from '../EmptyCart'
import { PrimaryBtn, SecondaryBtn } from '../Buttons'
import NotificationItem from '../NotificationItem'

const NotificationModal = ({ color }: AddToCartModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <>
      <Badge
        sx={{
          cursor: 'pointer',
          height: '25px',
          width: '25px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '& .MuiBadge-badge': {
            color: '#090909',
            backgroundColor: '#7DDEC1',
          },
        }}
        badgeContent={notifications.length}
        onClick={handleModal}
      >
        <img
          src='/Images/bell-icon.svg'
          alt='bell-icon'
          className='w-[20px] md:w-[25px] h-[20px] md:h-[25px]'
        />
      </Badge>

      <Modal open={isModalOpen} onClose={handleModal}>
        <div className='bg-white outline-none absolute right-0 h-[100vh] overflow-y-scroll w-[100vw] md:w-[600px] p-[16px] md:p-[32px] pb-[50px] flex flex-col gap-y-[24px]'>
          <div className='relative'>
            <img
              src='/Images/x.svg'
              alt='close'
              className='absolute right-0 top-0 cursor-pointer h-[24px] w-[24px]'
              onClick={handleModal}
            />
          </div>
          <div className='mt-[10px] w-full flex justify-between items-center'>
            <Typography
              sx={{
                fontSize: '24px !important',
                fontFamily: 'Josefin Sans',
                fontWeight: 'bold !important',
                lineHeight: '24px',
                color: '#000',
                '@media (max-width: 767px)': {
                  fontSize: '20px !important',
                },
              }}
            >
              Notifications{' '}
              <span
                style={{
                  fontSize: '18px',
                  fontWeight: 'normal',
                  color: '#6C6C6C',
                }}
              >
                ({notifications.length}){' '}
              </span>
            </Typography>

            <div className='w-fit'>
              <SecondaryBtn
                text='Mark all as read'
                color='#7DDEC1'
                handleClick={() => console.log('mark as read clicked')}
              />
            </div>
          </div>

          <div className='w-full flex flex-col gap-y-[30px]'>
            {notifications.length === 0 ? (
              <div className='w-full flex justify-center'>
                <EmptyCart />
              </div>
            ) : (
              notifications.map((notification, index) => (
                <div key={notification.id} className='w-full h-fit'>
                  <NotificationItem
                    // id={notification?.id}
                    status={notification?.status}
                    description={notification?.description}
                    image={notification?.image}
                    time={notification?.time}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </Modal>
    </>
  )
}

export default NotificationModal
