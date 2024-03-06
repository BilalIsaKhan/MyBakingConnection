import { useMutation } from '@apollo/client'
import changePasswordMutation from './changePassword.gql'

/**
 * Gets current viewer's data
 *
 * @returns {Array} the viewer's data
 */
export default function useChangePassword() {
  const [changePasswordFunction, { data, loading }] = useMutation(changePasswordMutation, {
    onCompleted() {
      console.log('Forgot Password successful check your mail for otp')
    },
  })

  return [changePasswordFunction, loading]
}
