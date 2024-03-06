import React, { useState } from 'react'
import Navbar from '../NavBar/NavBar'
import { Typography } from '@mui/material'
import DropdownField from '../DropdownField/DropdownField'
import { GalleryProductsData, states } from 'Constants/constants'
import GalleryItem from '../GalleryItem/GalleryItem'
import CustomPagination from '../CustomPagination/CustomPagination'

const Gallery = () => {
  const [occasion, setOccasion] = useState('')

  const [occasionError, setOccasionError] = useState('')

  //items per page to display
  const [itemsPerPage, setItemsPerPage] = useState<number>(9)

  //total number of pages for the paginator
  const [pageCount, setPageCount] = useState<number>(0)

  //we are using this state to display the current page, which differs from the offset value
  const [page, setCurrentPage] = useState(1)

  //for the offset filter
  const [offset, setOffset] = useState(0)

  const handlePageClick = (pageNum: number) => {
    setOffset((pageNum - 1) * itemsPerPage)
    setCurrentPage(pageNum)
  }

  // handleOccasionChange function for occasion dropdown
  const handleOccasionChange = (occasion: string) => {
    setOccasion(occasion)
    // setOccasionError(occasion ? '' : 'occasion is required')
  }

  return (
    <div>
      <Navbar />
      <div className='w-full flex flex-col items-center mt-[48px] md:mt-[100px]'>
        <div className='w-[90vw] md:w-[70vw] flex flex-col items-center'>
          <div className='w-full'>
            <Typography
              sx={{
                fontSize: '48px !important',
                fontWeight: '700 !important',
                fontFamily: 'Josefin Sans',
                lineHeight: 'normal',
                textAlign: 'center',
                color: '#7DDEC1',
                textTransform: 'capitalize',
                fontFeatureSettings: "'clig' off, 'liga' off",
                '@media (max-width: 767px)': {
                  fontSize: '24px !important',
                },
              }}
            >
              Inspiration Gallery
            </Typography>
          </div>
          <div className='w-[70%]'>
            <Typography
              sx={{
                marginTop: '24px',
                fontSize: '18px !important',
                fontFamily: 'Open Sans',
                fontWeight: '500 !important',
                lineHeight: 'normal',
                letterSpacing: '1px',
                textAlign: 'center',
                alignSelf: 'stretch',
                color: '#090909',
                textTransform: 'capitalize',
                fontFeatureSettings: `'clig' off, 'liga' off`,
                '@media (max-width: 767px)': {
                  fontSize: '12px !important',
                },
              }}
            >
              browse our gallery for inspiration and ideas! save your favorite ideas to your
              profile!
            </Typography>
          </div>
        </div>

        <div className='w-[50%] md:w-[20%] mt-[24px] md:mt-[50px]'>
          <DropdownField
            // label='state'
            required={false}
            name='occasion'
            placeholder='Occasions'
            // errorText={occasionError}
            value={occasion}
            options={states}
            inputColor='#6C6C6C'
            onChange={handleOccasionChange}
          />
        </div>

        <div className='w-[90vw] flex'>
          <div className='w-full flex flex-col items-center  mt-[24px] md:mt-[50px]'>
            <div className='w-full flex flex-wrap justify-start gap-x-[2%] gap-y-[24px]'>
              {GalleryProductsData.map((item, index) => {
                const { image, title } = item
                return (
                  <div key={index} className='w-full md:w-[32%] flex flex-col items-center'>
                    <GalleryItem image={image} title={title} />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className='w-[90vw] flex justify-center mt-[50px]'>
          <CustomPagination
            count={pageCount}
            boundaryCount={1}
            siblingCount={1}
            page={page}
            onChange={handlePageClick}
          />
        </div>
      </div>
    </div>
  )
}

export default Gallery
