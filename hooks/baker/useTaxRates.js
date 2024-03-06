import { useQuery } from '@apollo/client'

import taxRatesQuery from './taxRates.gql'

/**
 * Gets the bakers list based on search parameters
 *
 * @returns {Array} the bakers' list
 */
export default function useTaxRates(shopId) {
  console.log('shopid in tax rate is ', shopId)

  const { data, loading, refetch } = useQuery(taxRatesQuery, {
    variables: {
      shopId,
    },
  })

  //   console.log('data is ', data)
  const taxRate = data?.taxRates?.edges[0]?.node?.rate

  console.log('tax rate in hook is ', data)

  //   console.log('taxRates in hook is ', taxRate)
  return [taxRate, loading, refetch]
}
