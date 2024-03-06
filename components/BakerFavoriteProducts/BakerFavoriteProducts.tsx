import React, { useEffect, useState } from 'react'
import { GalleryProductsData } from 'Constants/constants'
import CustomPagination from '../CustomPagination/CustomPagination'
import ProductCard from '../ProductCard/ProductCard'
import useFavorite from 'hooks/Products/useFavorites'
import { withApollo } from 'lib/apollo/withApollo'
import Spinner from '../Spinner'

interface BakerFavoriteProducts {
  slug: string
}

const BakerFavoriteProducts = ({ slug }: BakerFavoriteProducts) => {
  //items per page to display
  const [itemsPerPage, setItemsPerPage] = useState<number>(6)

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

  useEffect(() => {
    // console.log('slug in final', slug)
  }, [slug])

  const [catalogItems, loadingItems, refetchItems, totalCount] = useFavorite({
    first: itemsPerPage,
    offset,
    sortBy: 'updatedAt',
    sortOrder: 'desc',
  })

  useEffect(() => {
    let page = Math.ceil(totalCount / itemsPerPage)
    console.log('catalogItems', catalogItems)
    setPageCount(page)
  }, [totalCount])

  return (
    <div className='w-full flex flex-col items-center'>
      <div className='w-[90vw] flex flex-wrap justify-start gap-x-[2%] gap-y-[8px] md:gap-y-[24px]'>
        {loadingItems ? (
          <div className='w-full flex flex-col items-center'>
            <Spinner />
          </div>
        ) : (
          <>
            {catalogItems?.map((item: any) => {
              const { product } = item?.node
              const { pricing } = product.variants[0]

              return (
                <ProductCard
                  isFavoriteFlag={product.isFavorite}
                  key={item.id}
                  productId={product.productId}
                  shopId={slug}
                  image={product?.media[0]?.URLs?.thumbnail}
                  title={product?.title}
                  slug={product?.slug}
                  description={product?.description}
                  category={item?.category}
                  oldPrice={pricing[0].compareAtPrice?.amount}
                  newPrice={pricing[0].price}
                />
              )
            })}
          </>
        )}
      </div>

      {totalCount && ( // Conditional rendering for the paginator
        <div className='w-[90vw] flex justify-center mt-[24px] md:mt-[48px]'>
          <CustomPagination
            count={pageCount}
            boundaryCount={1}
            siblingCount={1}
            page={page}
            onChange={handlePageClick}
          />
        </div>
      )}
    </div>
  )
}

export default withApollo()(BakerFavoriteProducts)
