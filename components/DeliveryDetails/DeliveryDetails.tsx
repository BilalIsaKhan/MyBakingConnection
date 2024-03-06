import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { Typography, CircularProgress } from '@mui/material'
import DeliveryDetailsForm from '../DeliveryDetailsForm/DeliveryDetailsForm'

interface DeliveryDetailsProps {
  totalAmountWithTax: number
  cartFunctions: any
  slug : string
}

const DeliveryDetails = ({ slug, totalAmountWithTax, cartFunctions }: DeliveryDetailsProps) => {
  // const [salesTax, setSalesTax] = useState(13)

  return (
    <div className={styles.card}>
      <div>
        <Typography
          sx={{
            fontSize: '24px !important',
            fontFamily: 'Open Sans',
            fontWeight: '700 !important',
            lineHeight: 'normal',
            color: '#7DDEC1',
            fontFeatureSettings: "'clig' off, 'liga' off",
            textTransform: 'capitalize',
            '@media (max-width: 767px)': {
              fontSize: '24px !important',
            },
          }}
        >
          Delivery Details
        </Typography>
      </div>

      <div className='mt-[24px] md:mt-[22px]'>

        
        <DeliveryDetailsForm amount={totalAmountWithTax} cartFunctions={cartFunctions} slug={slug}/>
      </div>
    </div>
  )
}

export default DeliveryDetails
