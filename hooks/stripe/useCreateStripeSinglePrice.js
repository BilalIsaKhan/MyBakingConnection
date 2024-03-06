import { useMutation } from '@apollo/client'
import createStripeSinglePriceMutation from './createStripeSinglePrice.gql'

export default function useCreateStripeSinglePrice() {
  const [createStripePrice, { data, loading }] = useMutation(createStripeSinglePriceMutation)

  return [createStripePrice, loading]
}
