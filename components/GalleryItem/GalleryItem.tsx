import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import React, { useState } from 'react'
import { GalleryItemProps } from 'types'
import { PrimaryBtn } from '../Buttons'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'

const GalleryItem = ({ image, title }: GalleryItemProps) => {
  const [isHovering, setIsHovering] = useState(false) // handle mouse enter and leave for more details on desktop view
  const [isDetailsVisible, setIsDetailsVisible] = useState(false) // Toggle More Details for mobile view
  const [isFavorite, setIsFavorite] = useState(false) // handle favourite click

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

  // handle more details click
  const handleMoreDetailsClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
    console.log('more details clicked')
  }

  // handle favourite click
  const handleFavouriteClick = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    e.stopPropagation()
    setIsFavorite(!isFavorite)
    console.log('favourite clicked')
  }

  // console.log('isDetailsVisible', isDetailsVisible)
  // console.log('isHovering', isHovering)

  return (
    <Card
      elevation={0}
      sx={{
        width: '100%',
        paddingBottom: '6px',
        height: 'auto',
        borderRadius: '0px',
      }}
    >
      <div className='relative'>
        <CardMedia
          sx={{
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
            <PrimaryBtn text='More details' handleClick={handleMoreDetailsClick} />
          </div>
        )}
      </div>
      <CardContent
        sx={{
          '&.MuiCardContent-root': {
            padding: '0px',
            margin: '0px',
          },
        }}
      >
        <Typography
          sx={{
            color: '#090909',
            marginTop: '12px',
            fontSize: '24px !important',
            fontWeight: '500 !important',
            lineHeight: 'normal',
            fontFamily: 'Open Sans',
            textTransform: 'capitalize',
            '@media (max-width:767px)': {
              fontSize: '18px !important',
            },
          }}
        >
          {title}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default GalleryItem
