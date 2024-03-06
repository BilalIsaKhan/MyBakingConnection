import { useQuery } from '@apollo/client'

import productCategoriesQuery from './productCategories.gql'

/**
 * Gets the product catalog for the shops and filters specified
 *
 * @returns {Array} the product catalog, loading state, refetch function and total count
 */
export default function useCatalogItemProduct() {
  const { loading, data, refetch } = useQuery(productCategoriesQuery)

  const productCategories = data?.productCategories?.nodes

  console.log('productCategories are', productCategories)

  return [productCategories, loading, refetch]
}
