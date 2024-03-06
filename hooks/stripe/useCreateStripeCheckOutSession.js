import { useMutation } from '@apollo/client'
import createStripeCheckOutSessionMutation from './createStripeCheckOutSession.gql'

export default function useCreateStripeCheckOutSession() {
  const [createStripeCheckoutSessions, { data, loading }] = useMutation(
    createStripeCheckOutSessionMutation,
  )

  return [createStripeCheckoutSessions, loading]
}
