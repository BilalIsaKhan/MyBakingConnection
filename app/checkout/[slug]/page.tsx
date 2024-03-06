'use client'

import Checkout from '@/components/Checkout'
import React from 'react'

export default function CheckoutPage({ params }: { params: { slug: string } }) {
  let { slug } = params

  slug = decodeURIComponent(slug)
  return (
    <>
      <div className=''>
        <div className='w-full'>
          <Checkout slug={slug} />
        </div>
      </div>
    </>
  )
}
