import { useEffect } from 'react'
import { useQuery } from '@apollo/client'

// import catalogItemsQuery from '../../containers/catalog/catalogItems.gql'
import catalogItemsQuery from './catalogItems.gql'

/**
 * Gets the product catalog for the shops and filters specified
 *
 * @returns {Array} the product catalog, loading state, refetch function and total count
 */
export default function useCatalogItems(input) {
  const { loading, data, refetch } = useQuery(catalogItemsQuery, {
    variables: input,
  })

  const catalogItems = data?.catalogItems?.edges
  const totalCount = data?.catalogItems?.totalCount

  console.log('catalogItems', catalogItems)

  return [catalogItems, loading, refetch, totalCount]
}
