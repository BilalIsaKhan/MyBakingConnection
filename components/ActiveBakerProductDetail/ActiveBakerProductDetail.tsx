import React from 'react'
import NavBar from '../NavBar/NavBar'
import { Typography } from '@mui/material'
import ProductDetailBreadCrumbs from '../ProductDetailBreadCrumbs/ProductDetailBreadCrumbs'
import ProductDetailTabsSection from '../ProductDetailTabsSection/ProductDetailTabsSection'
import useCatalogItemProduct from '../../hooks/Products/useCatalogItemProduct'
import Spinner from '../Spinner'
// import ProductSwiper from '../ProductSwiper'
import { withApollo } from 'lib/apollo/withApollo'
// import MatchMadeInHeaven from '../MatchMadeInHeaven'
import ProductPics from '../ProductPics'
import ActiveBakerProductDetailMainContent from '../ActiveBakerProductDetailMainContent'

interface ProductDetailProps {
  slug: string
  shopId?: string
}

const ActiveBakerProductDetail = ({ slug, shopId }: ProductDetailProps) => {
  console.log(slug, shopId)
  const [catalogItemProduct, loadingProduct, refetchProduct] = useCatalogItemProduct({
    slugOrId: slug,
  })

  console.log('shop id in product details is ', shopId)

  if (loadingProduct)
    return (
      <div>
        <NavBar />

        <div className='w-full flex flex-col items-center'>
          <Spinner />
        </div>
      </div>
    )

  if (!catalogItemProduct)
    return (
      <>
        <div>
          <NavBar />

          <div className='w-full text-center'>no product</div>
        </div>
      </>
    )

  console.log('slug', slug)
  console.log('catalogItemProduct', catalogItemProduct)

  const { title, description, media, variants, productAttributes, productId, isFavorite } =
    catalogItemProduct
  const { pricing, inventoryInStock, variantId } = variants[0]
  const { URLs } = media[0]

  return (
    <div>
      <NavBar />

      <div
        style={{
          background: `url(${URLs?.large})`,
          backgroundSize: 'cover',
          width: '100%',
          // height: '100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        className={`w-full h-[325px] md:h-[450px] flex justify-start items-center`}
      >
        <div className='w-fit h-auto ml-[18px] md:ml-[118px]'>
          <Typography
            sx={{
              fontSize: '48px !important',
              fontFamily: 'Josefin Sans',
              textTransform: 'capitalize',
              fontWeight: '700 !important',
              color: '#fff',
              textAlign: 'left ',
              '@media (max-width: 768px)': {
                fontSize: '24px !important',
              },
            }}
          >
            {title}
          </Typography>

          <div className='w-fit mt-[10px] md:mt-[14px]'>
            <ProductDetailBreadCrumbs title={title} />
          </div>
        </div>
      </div>

      <div className='w-full flex flex-col items-center mt-[24px] md:mt-[32px]'>
        <div className='w-[90%] md:w-[95%]'>
          <div className='flex flex-col items-center lg:flex-row lg:items-start'>
            <div className='w-[100%] lg:w-[40vw]'>
              {/* <ProductSwiper images={media} /> */}
              <ProductPics images={media} />
            </div>
            <div className='relative w-[100%] mt-[40px] lg:mt-[0px] lg:w-[100%] lg:pl-[40px]'>
              <ActiveBakerProductDetailMainContent
                isFavorite={isFavorite}
                title={title}
                description={description}
                oldPrice={pricing[0].compareAtPrice?.amount}
                newPrice={pricing[0].price}
                rating={3}
                reviews={10}
                productAttributes={productAttributes}
                stock={inventoryInStock}
                productId={productId}
                productVariantId={variantId}
                shopId={shopId}
              />
            </div>
          </div>
        </div>
      </div>

      <div className='w-full flex flex-col items-center mt-[24px] md:mt-[32px]'>
        <ProductDetailTabsSection productDescription={description} />
      </div>

      {/* <div className='w-full flex flex-col items-center mt-[48px] md:mt-[64px]'>
        <div className='w-[90%] md:w-[95%]'>
          <MatchMadeInHeaven shopId={shopId} />
        </div>
      </div> */}
    </div>
  )
}

export default withApollo()(ActiveBakerProductDetail)
