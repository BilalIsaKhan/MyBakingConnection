// hocs/withAuthRedirect.js

import { useEffect, useLayoutEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import useValidateViewer from '../hooks/viewer/useValidateViewer'
import { withApollo } from 'lib/apollo/withApollo'
import Loader from '@/components/Loader/Loader'

const withAuth = (WrappedComponent) => {
  const AuthRedirect = (props) => {
    const [viewer, loading] = useValidateViewer()
    const router = useRouter()
    const pathName = usePathname()

    console.log('viewer in withAuth is ', viewer)
    console.log('pathname in withAuth is ', pathName)

    // List of routes that require the user to be logged in
    const protectedRoutes = ['/profile']
    const protectedRoutesBaker = ['/baker']

    // Check weather any of the protected routes string is present in the current path
    const isProtectedRoute = protectedRoutes.some((route) => pathName.includes(route))
    const isProtectedRouteBaker = protectedRoutesBaker.some((route) => pathName.includes(route))

    // console.log(
    //   'before return viewer no create-shop redirect to create-shop page',
    //   isProtectedRouteBaker,
    // )

    const validateViewer = async () => {
      if (loading) {
        console.log('before return loading')
        // const temp = protectedRoutes.includes(pathName)
        console.log('before return isProtectedRoute is ', isProtectedRoute)
        return
      }

      // If there is no viewer and page is protected, redirect to login page
      if (!viewer?._id && (isProtectedRoute || isProtectedRouteBaker)) {
        router.push('/signin')
        console.log('before return no viewer redirect to login page', viewer)
        console.log('before return isProtectedRoute is ', isProtectedRoute)
        return
      }

      // If there is no viewer and page is create-shop, redirect to login page
      if (!viewer?._id && pathName.includes('/create-shop')) {
        router.push('/signin')
        console.log('before return no viewer redirect to login page', viewer)
        return
      }

      // If there is no viewer and page is signin or signup, return
      if (!viewer?._id && (pathName === '/signin' || pathName === '/signup')) {
        console.log('before return no viewer signin or signup', viewer)
        return
      }

      // If the user is logged in and page is signin or signup, redirect to home page
      if (viewer?._id && (pathName === '/signin' || pathName === '/signup')) {
        router.push('/')
        console.log('before return viewer signin or signup redirect to home page', viewer)
        return
      }

      // If the user is logged in and has active Subscription and page is isProtectedRoute, navigate to homepage
      if (viewer?._id && viewer?.isActiveBaker && isProtectedRoute && !isProtectedRouteBaker) {
        router.push('/')
        console.log('before return viewer active baker redirect to baker page', viewer)
        return
      }

      // If the user is logged in and has active Subscription and page is add-to-cart or checkout, redirect to home page
      if (
        viewer?._id &&
        viewer?.isActiveBaker &&
        (pathName.includes('/add-to-cart') || pathName.includes('/checkout'))
      ) {
        router.push('/')
        console.log('before return viewer active baker redirect to home page', viewer)
        return
      }

      // If the user is logged in and has not created a shop and has active Subscription and page is bakers, redirect to create-shop page
      if (
        viewer?._id &&
        viewer?.adminUIShops?.length === 0 &&
        viewer?.isActiveBaker &&
        isProtectedRouteBaker
      ) {
        router.push('/create-shop')
        console.log('before return viewer no create-shop redirect to create-shop page', viewer)
        return
      }

      //if the user has created a shop and is directing to create-shop page, redirect to home page
      if (
        viewer?._id &&
        viewer?.adminUIShops?.length > 0 &&
        viewer?.isActiveBaker &&
        pathName.includes('/create-shop')
      ) {
        console.log('viewer has an active shop created and is on create bakery page', viewer)
        router.push('/')
        return
      }

      // If the user is logged in and has created a shop and has active Subscription and page is bakers, do nothing

      if (
        viewer?._id &&
        viewer?.adminUIShops?.length > 0 &&
        viewer?.isActiveBaker &&
        isProtectedRouteBaker
      ) {
        console.log('coming to this condition')

        console.log('before return viewer has create-shop and active baker', viewer)
        return
      }

      // If the user is logged in and does not have active Subscription and page is bakers or create-shop, redirect to subscription page
      if (
        viewer?._id &&
        !viewer?.isActiveBaker &&
        (isProtectedRouteBaker || pathName.includes('/create-shop'))
      ) {
        router.push('/membership')
        console.log('before return viewer no active baker redirect to subscription page', viewer)
        return
      }

      // if user is logged in and has already created a shop and page is create-shop, redirect to home page
      // if (viewer?._id && viewer?.adminUIShops?.length > 0 && pathName.includes('/create-shop')) {
      //   router.push('/')
      //   console.log('before return viewer create-shop redirect to home page', viewer)
      //   return
      // }

      // if the user is logged in and has not created a shop and page is not create-shop, redirect to create-shop page
      // if (viewer?._id && viewer?.adminUIShops?.length === 0 && !pathName.includes('/create-shop')) {
      //   router.push('/create-shop')
      //   console.log('before return viewer no create-shop redirect to create-shop page', viewer)
      //   return
      // }

      // If the user is logged in and validStripeConnect is false and have created a shop, redirect to profile page
      // if (
      //   viewer?._id &&
      //   !viewer?.validStripeConnect &&
      //   !pathName.includes('/profile') &&
      //   viewer?.adminUIShops?.length > 0
      // ) {
      //   router.push('/profile')
      //   console.log('before return validStripeConnect redirect to profile page', viewer)
      //   return
      // }
    }

    useLayoutEffect(() => {
      console.log('loading viewer is ', loading)

      validateViewer()
    }, [loading, viewer?._id, pathName])

    // return <WrappedComponent {...props} />

    // if (
    //   (!viewer?._id && pathName === '/signin' && !loading) ||
    //   (!viewer?._id && pathName === '/signup' && !loading)
    // ) {
    //   return (
    //     <>
    //       <WrappedComponent {...props} />
    //     </>
    //   )
    // }

    if (
      loading ||
      (!viewer?._id && isProtectedRoute) ||
      (!viewer?._id && pathName.includes('/create-shop')) ||
      // (!viewer?._id && (pathName === '/signin' || pathName === '/signup')) ||

      (viewer?._id && (pathName === '/signin' || pathName === '/signup')) ||
      // (viewer?._id && viewer?.adminUIShops?.length > 0 && pathName.includes('/create-shop')) ||
      // (viewer?._id &&
      //   !viewer?.validStripeConnect &&
      //   !pathName.includes('/profile') &&
      //   viewer?.adminUIShops?.length > 0)
      (viewer?._id &&
        viewer?.adminUIShops?.length === 0 &&
        viewer?.isActiveBaker &&
        isProtectedRouteBaker) ||
      (viewer?._id &&
        viewer?.isActiveBaker &&
        (pathName.includes('/add-to-cart') || pathName.includes('/checkout'))) ||
      (viewer?._id && viewer?.isActiveBaker && isProtectedRoute && !isProtectedRouteBaker) ||
      // (viewer?._id &&
      //   viewer?.adminUIShops?.length > 0 &&
      //   viewer?.isActiveBaker &&
      //   isProtectedRouteBaker) ||
      (viewer?._id &&
        !viewer?.isActiveBaker &&
        (isProtectedRouteBaker || pathName.includes('/create-shop')))
    ) {
      console.log('loading is ', loading)
      return (
        <>
          <Loader />
        </>
      )
    }

    console.log('loading is wrapped ', props)

    return <WrappedComponent {...props} />
  }

  return AuthRedirect
}

export default withAuth
