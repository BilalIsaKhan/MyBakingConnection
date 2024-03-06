'use client'

import ActiveBakerProductDetail from '@/components/ActiveBakerProductDetail/ActiveBakerProductDetail'

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string; slugOrId: string }
}) {
  const { slug, slugOrId } = params

  console.log('params in product ', params)
  const Bakerslug = decodeURIComponent(slug)

  console.log('baker slug in product ', Bakerslug)

  return (
    <>
      <div className=''>
        <ActiveBakerProductDetail slug={slugOrId} shopId={Bakerslug} />
      </div>
    </>
  )
}
