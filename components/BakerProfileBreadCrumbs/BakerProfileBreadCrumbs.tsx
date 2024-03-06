import { Breadcrumbs, Typography } from '@mui/material'
import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const BakerProfileBreadCrumbs = () => {
  // const router = useRouter()
  const pathName = usePathname()
  const lastPathName = pathName?.split('/').pop()

  const shopId = localStorage.getItem('shopId')

  // const handleBreadCrumbs = () => {
  //   router.push('/profile')
  // }

  return (
    <Breadcrumbs>
      <Link href={`baker/${shopId}/profile`}>
        <Typography
          sx={{
            fontSize: '18px !important',
            fontWeight: '600 !important',
            lineHeight: '28px',
            fontFamily: 'Josefin Sans',
            textTransform: 'capitalize',
            color: '#888',
            cursor: 'pointer',
            fontFeatureSettings: "'clig' off, 'liga' off",
            '@media (max-width: 767px)': {
              fontSize: '16px !important',
            },
          }}
          // onClick={handleBreadCrumbs}
        >
          your profile
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
        {lastPathName?.replaceAll('-', ' ')}
      </Typography>
    </Breadcrumbs>
  )
}

export default BakerProfileBreadCrumbs
