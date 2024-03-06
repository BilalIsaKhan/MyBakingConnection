import { Breadcrumbs, Typography } from '@mui/material'
import React from 'react'
// import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'

interface ProductDetailBreadCrumbsProps {
  title: string
}

const ProductDetailBreadCrumbs = ({ title }: ProductDetailBreadCrumbsProps) => {
  // const router = useRouter()

  // const handleBreadCrumbs = () => {
  //   router.push('/gallery')
  // }

  return (
    <Breadcrumbs
      sx={{
        '& .MuiBreadcrumbs-separator': {
          color: '#7DDEC1',
        },
      }}
    >
      <Link href='/gallery'>
        <Typography
          sx={{
            fontSize: '18px !important',
            fontWeight: '600 !important',
            lineHeight: '28px',
            fontFamily: 'Josefin Sans',
            textTransform: 'capitalize',
            color: '#fff',
            cursor: 'pointer',
            fontFeatureSettings: "'clig' off, 'liga' off",
            '@media (max-width: 767px)': {
              fontSize: '16px !important',
            },
          }}
          // onClick={handleBreadCrumbs}
        >
          Gallery
        </Typography>
      </Link>

      <Typography
        sx={{
          fontSize: '18px !important',
          fontWeight: '600 !important',
          lineHeight: '28px',
          fontFamily: 'Josefin Sans',
          textTransform: 'capitalize',
          color: '#7DDEC1',
          fontFeatureSettings: "'clig' off, 'liga' off",
          '@media (max-width: 767px)': {
            fontSize: '16px !important',
          },
        }}
      >
        {title}
      </Typography>
    </Breadcrumbs>
  )
}

export default ProductDetailBreadCrumbs
