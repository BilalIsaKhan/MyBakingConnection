'use client'

import ActiveBaker from '@/components/ActiveBaker'

export default function BakerPage({ params }: { params: { slug: string } }) {
  let { slug } = params

  slug = decodeURIComponent(slug)

  return (
    <>
      <div className=''>
        <ActiveBaker slug={slug} />
      </div>
    </>
  )
}
