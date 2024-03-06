import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ProductCardProps } from 'types'
import { PrimaryBtn } from '../Buttons'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { usePathname, useRouter } from 'next/navigation'
import useMarkProductAsFavorite from '../../hooks/Favorite/useMarkProductAsFavorite'
import Link from 'next/link'
import toast from 'react-hot-toast'
import MoreDetails from '../MoreDetails'

const ProductCard = ({
  isFavoriteFlag,
  productId,
  shopId,
  image,
  title,
  description,
  category,
  oldPrice,
  newPrice,
  width,
  slug,
  mdWidth,
}: ProductCardProps) => {
  const [isHovering, setIsHovering] = useState(false) // handle mouse enter and leave for more details on desktop view
  const [isDetailsVisible, setIsDetailsVisible] = useState(false) // Toggle More Details for mobile view
  const [isFavorite, setIsFavorite] = useState(isFavoriteFlag) // handle favourite click
  const [favorite]: any = useMarkProductAsFavorite()

  const router = useRouter()
  const pathname = usePathname()

  // handle mouse enter and leave
  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  // More Details for mobile
  const handleToggleDetails = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    setIsDetailsVisible(!isDetailsVisible)
    setIsHovering(false)
    // console.log('toggle details', isDetailsVisible)
  }

  // handle favourite click
  const handleFavouriteClick = async (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    e.stopPropagation()
    // console.log('clicked')
    try {
      // console.log('productId', productId)
      await favorite({
        variables: {
          productId: productId,
          shopId: shopId,
        },
      })
      console.log('Success!')
      // console.log(!isFavorite, 'whyy')
      !isFavorite
        ? toast.success('Successfully added to favorites')
        : toast.success('Successfully removed from favorites')
      //   handleSuccessOpen();
    } catch (err: any) {
      console.log(err)
      toast.error(`Error is '${err?.message}`)
      // console.log('Success! Added to favorites')
      //   handleErrorOpen();
    }
    setIsFavorite(!isFavorite)
    // console.log('favourite clicked')
  }

  // handle more details click
  const handleMoreDetailsClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()

    // console.log('slug', `/product/${slug}`)
    // console.log(pathname)

    // router.push(`${pathname}/product/${slug}`)
  }

  // useEffect(() => {
  //   setIsFavorite(isFavoriteFlag)
  // }, [isFavoriteFlag])

  return (
    <Card
      elevation={0}
      sx={{
        width: mdWidth ? mdWidth : '32%',
        border: '0.5px solid #888',
        borderRadius: '5px',
        paddingBottom: '6px',

        '@media (max-width:767px)': {
          width: width ? width : '49%',
        },
        height: 'auto',
      }}
    >
      <div className='relative'>
        <CardMedia
          sx={{
            borderRadius: '5px 5px 0px 0px',
            background:
              isHovering || isDetailsVisible
                ? `linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), url(${image}), lightgray 50% / cover no-repeat`
                : `url(${image}), lightgray 50% / cover no-repeat`,
            height: '365px',
            width: '100%',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            '@media (max-width:767px)': {
              height: '195px',
            },
          }}
          component='div'
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleToggleDetails}
          // image={image}
          // alt={title}
        />
        <div onClick={handleFavouriteClick} className='absolute top-4 right-4 cursor-pointer'>
          {isFavorite ? (
            <FavoriteIcon
              sx={{
                color: '#7DDEC1',
                width: '30px',
                height: '30px',
                '@media (max-width:767px)': {
                  width: '25px',
                  height: '25px',
                },
              }}
            />
          ) : (
            <FavoriteBorderIcon
              sx={{
                color: '#7DDEC1',
                width: '30px',
                height: '30px',
                '@media (max-width:767px)': {
                  width: '25px',
                  height: '25px',
                },
              }}
            />
          )}
        </div>
        {(isHovering || isDetailsVisible) && (
          <div
            onMouseEnter={handleMouseEnter}
            className={`w-[55%] md:w-[35%] ${isHovering ? 'none' : 'block'}`}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Link href={`shop/${shopId}/product/${slug}`}>
              <PrimaryBtn text='More details' />
            </Link>
          </div>
        )}

        {/* <ProductCardMenu /> */}
      </div>
      <CardContent
        sx={{
          '&.MuiCardContent-root': {
            paddingTop: '12px',
            paddingBottom: '0px',
            paddingLeft: '18px',
            paddingRight: '10px',
            '@media (max-width:767px)': {
              paddingTop: '8px',
              paddingLeft: '12px',
              paddingRight: '8px',
            },
          },
        }}
      >
        <Typography
          sx={{
            color: '#888',
            fontSize: '12px !important',
            fontWeight: '400',
            lineHeight: 'normal',
            fontFamily: 'Open Sans',
            textTransform: 'capitalize',
          }}
        >
          {category}
        </Typography>
        <Typography
          sx={{
            color: '#090909',
            marginTop: '12px',
            fontSize: '18px',
            fontWeight: '700',
            lineHeight: 'normal',
            fontFamily: 'Open Sans',
            textTransform: 'uppercase',
            '@media (max-width:767px)': {
              marginTop: '8px',
            },
          }}
        >
          {title}
        </Typography>
        <Typography
          component='div'
          sx={{
            color: '#090909',
            marginTop: '12px',
            fontSize: '12px !important',
            fontWeight: '400',
            lineHeight: 'normal',
            fontFamily: 'Open Sans',
            '@media (max-width:767px)': {
              marginTop: '8px',
            },
          }}
        >
          <Link href={`/shop/${shopId}/product/${slug}`}>
            <MoreDetails
              lineHeight='normal'
              color='#090909'
              fontFamily='Open Sans'
              fontWeight={400}
              fontSize={12}
              text={description}
              words={100}
            />
          </Link>
          {/* {description} */}
        </Typography>
        <div className='flex gap-x-[14px] items-center'>
          {oldPrice ? (
            <Typography
              sx={{
                color: '#888',
                fontSize: '12px !important',
                fontWeight: '400',
                lineHeight: 'normal',
                fontFamily: 'Open Sans',
                textDecoration: 'line-through',
              }}
            >
              ${parseFloat(oldPrice)}
            </Typography>
          ) : null}
          <Typography
            sx={{
              color: '#090909',
              fontSize: '18px !important',
              fontWeight: '700',
              lineHeight: 'normal',
              fontFamily: 'Open Sans',
            }}
          >
            ${parseFloat(newPrice)}
          </Typography>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductCard
