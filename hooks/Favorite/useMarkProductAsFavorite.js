import { useMutation } from '@apollo/client'

import markProductAsFavorite from './markProductAsFavorite.gql'

/**
 * Update user profile info
 *
 * @returns {Function} the user profile settings
 */
export default function useMarkProductAsFavorite() {
  const [markProductAsFavoriteFunction, { _, loading }] = useMutation(markProductAsFavorite)
  return [markProductAsFavoriteFunction, loading]
}
