import { useLazyQuery } from '@apollo/client'
import bakersQuery from './bakers.gql'

/**
 * Gets the bakers list based on search parameters
 *
 * @returns {[Function, boolean, Object]} - An array containing the following elements:
 *   - getBakersData: Function to trigger the query
 *   - loading: A boolean indicating whether the query is loading
 *   - data: The query result data
 */
export default function useBakers() {
  const [getBakersData, { loading, data }] = useLazyQuery(bakersQuery)

  return [getBakersData, loading, data]
}
