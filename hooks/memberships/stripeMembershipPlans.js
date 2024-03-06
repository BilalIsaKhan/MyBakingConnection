import { useQuery } from '@apollo/client'
import stripeMembershipPlans from './stripeMembershipPlans.gql'

/**
 * Gets stripe membership plans
 *
 * @returns {[Function, boolean, Object]} - An array containing the following elements:
 *   - getMembershipPlans: Function to trigger the query
 *   - loading: A boolean indicating whether the query is loading
 *   - data: The query result data
 */
export default function useStripeMembershipPlans() {
  const { loading, data, refetch } = useQuery(stripeMembershipPlans)

  console.log('useStripeMembershipPlans', data)

  const plans = data?.stripeMembershipPlans

  return [plans, loading, refetch]
}
