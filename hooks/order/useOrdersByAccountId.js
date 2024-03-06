import { useQuery } from '@apollo/client'
import { useEffect } from 'react'
import ordersByAccountIdQuery from './ordersByAccountId.gql'

export default function useOrdersByAccountId(accountId, shopIds, first, offset) {
  const { data, loading, refetch } = useQuery(ordersByAccountIdQuery, {
    variables: {
      accountId,
      // shopIds: 'cmVhY3Rpb24vc2hvcDpYenZBUnhjanNmQVo5d3hzNQ==',
      shopIds,
      first,
      offset,
    },
  })
  const orders = data?.ordersByAccountId?.edges
  const totalCount = data?.ordersByAccountId?.totalCount

  useEffect(() => {
    refetch()
  }, [accountId, shopIds])

  return [orders, loading, totalCount]
}
