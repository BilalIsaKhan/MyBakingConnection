import { useEffect } from 'react'
import { useQuery } from '@apollo/client'

// import catalogItemsQuery from '../../containers/catalog/catalogItems.gql'
import favoriteProducts from './favoriteProducts.gql'

/**
 * Gets the product catalog for the shops and filters specified
 *
 * @returns {Array} the product catalog, loading state, refetch function and total count
 */
export default function useCatalogItems(input) {
  const { loading, data, refetch } = useQuery(favoriteProducts, {
    variables: input,
  })
  // console.log(data)
  const catalogItems = data?.favoriteProducts?.edges
  const totalCount = data?.favoriteProducts?.totalCount

  console.log('catalogItems', catalogItems)

  return [catalogItems, loading, refetch, totalCount]
}
