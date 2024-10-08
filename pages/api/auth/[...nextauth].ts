import useLoginUser from 'hooks/Authentication/Login/useLoginUser'
import hashPassword from 'lib/utils/hashPassword'
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const { username, password } = credentials as any

        console.log('credentials', credentials)

        //  graphql endpoint
        const endpointUrl = 'https://app.staging.yourbakingconnection.com/graphql'

        //  graphql mutation
        const mutation = `
                        mutation LoginUserMutation($user: LoginUserInput!) {
                            loginUser(user: $user) {
                                loginResult {
                                    tokens {
                                        refreshToken
                                        accessToken
                                    }
                                    sessionId
                                }
                            }
                        }`

        //  graphql variables
        const variables = {
          user: {
            email: username,
            password: hashPassword(password),
          },
        }

        //  graphql request body
        const requestBody = {
          query: mutation,
          variables,
        }

        //  graphql request
        const res = await fetch(endpointUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        })

        //  graphql response
        const user = await res.json()

        //  graphql response data
        const accessToken = user?.data?.loginUser?.loginResult?.tokens?.accessToken

        // If no error and we have user data, return it
        if (accessToken) {
          return user?.data?.loginUser?.loginResult?.tokens
        }

        // Return null if user data could not be retrieved
        return null
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token, user }) {
      session.user = token as any
      return session
    },
  },

  pages: {
    signIn: '/signin',
  },
}
export default NextAuth(authOptions)
