import { useMutation } from '@apollo/client'
import PlaceOrderMutation from './placeOrder.gql'

export default function usePlaceOrder() {
  const [placeOrderFunction, { data, loading }] = useMutation(PlaceOrderMutation, {
    onCompleted() {
      console.log('Order successfully placed')
    },
  })
  return [placeOrderFunction, loading]
}
