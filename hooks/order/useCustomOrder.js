import { useMutation } from '@apollo/client'
import CustomOrderMutation from './customOrder.gql'

export default function useCustomOrder() {
  const [customOrderFunction, { data, loading }] = useMutation(CustomOrderMutation, {
    onCompleted() {
      console.log('Custom Order successfully created')
    },
  })
  return [customOrderFunction, loading]
}
