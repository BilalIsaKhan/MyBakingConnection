import { useQuery } from '@apollo/client'
import { useEffect } from 'react'

import getFlatRateFulfillmentByShopIdQuery from './getFlatRateFulfillmentByShopId.gql'

export default function useGetFlatRateFulfillmentByShopId(shopId) {
  const { data, loading, refetch } = useQuery(getFlatRateFulfillmentByShopIdQuery, {
    variables: {
      shopId,
    },
  })
  const fulfillmentMethod =
    data?.getFlatRateFulfillmentByShopId?.edges?.length > 0
      ? data?.getFlatRateFulfillmentByShopId?.edges[0].node
      : {}
  console.log('flat rate 2 ', fulfillmentMethod)

  useEffect(() => {
    console.log('data', data)
  }, [shopId])

  return [fulfillmentMethod, loading, refetch]
}
