import React, { use, useEffect, useState } from 'react'
import { Badge, CircularProgress, Modal, Typography } from '@mui/material'
import { AddToCartModalProps } from 'types'
import { orderItemsData } from 'Constants/constants'
import CartTable from '../CartTable'
import EmptyCart from '../EmptyCart'
import { PrimaryBtn } from '../Buttons'
import Spinner from '../Spinner'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const AddToCartModal = ({ color, cartItems, cartFunctions }: AddToCartModalProps) => {
  const router = useRouter()

  console.log('cart function in modal', cartFunctions)
  // const [isModalOpen, setIsModalOpen] = useState(false)

  const handleModal = () => {
    cartFunctions?.uiStore?.toggleCartOpen()
  }

  // console.log('cartItems in AddToCartModal is', cartItems)

  // console.log('cartFunctions in AddToCartModal is', cartFunctions)

  useEffect(() => {
    // console.log('cartFunctions in AddToCartModal is', cartFunctions)
  }, [cartFunctions?.uiStore?.isCartOpen])

  return (
    <>
      <Badge
        sx={{
          cursor: 'pointer',
          height: 'fit-content',
          width: 'fit-content',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '& .MuiBadge-badge': {
            color: '#090909',
            backgroundColor: '#7DDEC1',
          },
        }}
        badgeContent={cartItems?.length}
        onClick={cartFunctions?.uiStore?.openCart}
      >
        <img
          src='/Images/cart-icon.svg'
          alt='cart'
          className='w-[20px] md:w-[25px] h-[20px] md:h-[25px]'
        />
      </Badge>

      <Modal open={cartFunctions.uiStore.isCartOpen} onClose={handleModal}>
        <div className='bg-white outline-none absolute right-0 h-[100vh] overflow-y-scroll w-[100vw] md:w-[600px] p-[16px] md:p-[32px] pb-[50px] flex flex-col gap-y-[24px]'>
          <div className='relative'>
            <img
              src='/Images/x.svg'
              alt='close'
              className='absolute right-0 top-0 cursor-pointer h-[24px] w-[24px]'
              onClick={handleModal}
            />
          </div>
          <div className='flex flex-col gap-y-[8px] md:gap-y-[20px]'>
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
              My Cart{' '}
              <span
                style={{
                  fontSize: '18px',
                  fontWeight: 'normal',
                  color: '#6C6C6C',
                }}
              >
                ({cartItems?.length}){' '}
              </span>
            </Typography>
          </div>
          {!cartFunctions?.isLoadingCart &&
          !cartFunctions?.uiStore?.isUpdatingQuantity &&
          !cartFunctions?.removeCartItemsLoading ? (
            <>
              {cartItems?.length === 0 || !cartFunctions?.cart ? (
                <div className='w-full flex justify-center  mt-[50px] md:mt-[80px]'>
                  <EmptyCart handleModal={() => handleModal()} />
                </div>
              ) : (
                <div className='w-full'>
                  <CartTable cartFunctions={cartFunctions} items={cartItems} />
                </div>
              )}

              {cartItems?.length > 0 && (
                <>
                  {(!cartFunctions?.removeCartItemsLoading ||
                    !cartFunctions.uiStore.isUpdatingQuantity) && (
                    <div className='w-full flex flex-col items-center gap-[18px]'>
                      <div className='w-[50%] self-center'>
                        <Link href='/add-to-cart'>
                          <PrimaryBtn
                            text='Proceed to Cart'
                            handleClick={() => {
                              handleModal()
                            }}
                            // loading={cartFunctions?.removeCartItemsLoading}
                          />
                        </Link>
                      </div>

                      <div className='w-[50%] self-center'>
                        <Link href={`/checkout/${cartFunctions?.cart?.shop?._id}`}>
                          <PrimaryBtn
                            text='Proceed to checkout'
                            handleClick={() => {
                              handleModal()
                            }}
                            // loading={cartFunctions?.removeCartItemsLoading}
                          />
                        </Link>
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          ) : (
            <div className='w-full flex justify-center items-center'>
              <CircularProgress
                sx={{
                  color: '#7DDEC1',
                }}
              />
            </div>
          )}
        </div>
      </Modal>
    </>
  )
}

export default AddToCartModal
