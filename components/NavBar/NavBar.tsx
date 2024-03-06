import { AppBar, Box, Grid, Toolbar, Typography, styled } from '@mui/material'
import withCart from 'containers/cart/withCart'
import inject from 'hocs/inject'
import useViewer from 'hooks/viewer/useViewer'
import { withApollo } from 'lib/apollo/withApollo'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { NavBarProps } from 'types'
import AccountDropdown from '../AccountDropdown/AccountDropdown'
import AddToCartModal from '../AddToCartModal'
import { PrimaryBtn, SecondaryBtn } from '../Buttons'
import NotificationModal from '../NotificationModal/NotificationModal'
import ToggleNavBar from '../ToggleNavBar/ToggleNavBar'
import styles from './styles.module.css'
import BakerAccountDropdown from '../BakerAccountDropdown'
// import { useSession } from 'next-auth/react'

const Navbar = ({
  itemsColor = 'black',
  activeItemColor = '#7DDEC1',
  ...restProps
}: NavBarProps) => {
  // const { data: session, status } = useSession()
  // const token = localStorage.getItem('accounts:accessToken')

  const shopId = localStorage.getItem('shopId')

  // if (status === 'authenticated' && token !== session?.user?.accessToken) {
  //   localStorage.setItem('accounts:accessToken', session?.user?.accessToken)
  //   localStorage.setItem('accounts:refreshToken', session?.user?.refreshToken)
  // }

  const [viewer, loading, refetch] = useViewer()
  console.log('viewer', viewer)

  useEffect(() => {}, [viewer, loading])

  const pathName = usePathname()
  const StyledToolbar = styled(Toolbar)({
    justifyContent: 'space-between',
    height: '88px',
  })
  const SearchBox = styled(Box)({
    display: 'flex',
    gap: 5,
  })
  const MenuItems = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT BAKERS', path: `${process.env.NEXT_PUBLIC_INFO_URL}/about-the-bakers/` },
    { name: 'MEMBERSHIP', path: '/membership' },
    { name: 'GALLERY', path: '/gallery' },
    { name: 'SEARCH', path: '/search' },
  ]

  // useEffect(() => {
  //   // console.log('restProps in navbar is', restProps)
  // }, [restProps?.cart, restProps?.uiStore?.isCartOpen])

  return (
    <AppBar
      sx={{
        background: 'transparent',
      }}
      position={'static'}
      elevation={0}
    >
      <StyledToolbar>
        <Box
          sx={{
            gap: { md: '16px', lg: '36px' },
            alignItems: 'center',
          }}
          className={styles.navbar}
        >
          {MenuItems.map((item, index) => (
            <Typography
              key={index}
              sx={{
                cursor: 'pointer',
              }}
              variant='body2'
              className='hover:scale-110 ease-in-out transition-all duration-300'
            >
              <Link
                style={
                  pathName === `${item.path}`
                    ? {
                        color: `${activeItemColor}`,
                        // borderBottom: '7px solid #7DDEC1',
                        fontWeight: '700',
                        textDecoration: 'none',
                        borderRadius: '25px',
                        padding: '10px',
                        // margin: '10px',
                        width: '2px',
                      }
                    : { color: `${itemsColor}`, textDecoration: 'none' }
                }
                href={item.path}
              >
                {item.name}
              </Link>
            </Typography>
          ))}

          {viewer?._id && (
            <Typography
              // key={}
              sx={{
                cursor: 'pointer',
                color: `${itemsColor}`,
                textDecoration: 'none',
              }}
              variant='body2'
              className='hover:scale-110 ease-in-out transition-all duration-300'
              // onClick={() => {
              //   console.log('this is it', viewer?.adminUIShops)
              //   window.location.href = `${process.env.NEXT_PUBLIC_BAKER_URL}baker/${viewer?._id}`
              // }}
            >
              <Link
                style={{ color: `${itemsColor}`, textDecoration: 'none' }}
                href={
                  viewer?.isActiveBaker && viewer?.adminUIShops && viewer?.adminUIShops?.length > 0
                    ? `/baker/${shopId}`
                    : `/create-shop`
                }
              >
                BAKER
              </Link>
            </Typography>
          )}
        </Box>

        <div className={styles.navbarMenu}>
          <ToggleNavBar navbarIconColor={itemsColor} />
        </div>

        <SearchBox sx={{ display: 'flex', alignItems: 'center' }}>
          {
            // loading ? (
            //   <p style={{ color: 'black' }}>loading...</p>
            // ) : (
            <Grid>
              {!viewer?._id ? (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                  }}
                  // className={styles.navbar}
                >
                  <div className='w-[50px] md:w-[146px] h-[30px] md:h-[50px]'>
                    <a href='/signup'>
                      <PrimaryBtn handleClick={() => {}} text='register' />
                    </a>
                  </div>
                  <div className='w-[50px] md:w-[146px] h-[30px] md:h-[50px]'>
                    <a href='/signin'>
                      <SecondaryBtn handleClick={() => {}} text='sign in' color={`${itemsColor}`} />
                    </a>
                  </div>
                </Box>
              ) : (
                <Box
                  sx={{
                    display: 'flex',
                    // flexDirection: 'row !important',
                    alignItems: 'center',
                    gap: '24px',
                    pr: '10px',
                    '@media (max-width: 767px)': {
                      gap: '18px',
                    },
                  }}
                >
                  {viewer?.isActiveBaker ? <BakerAccountDropdown /> : <AccountDropdown />}
                  {/* <NotificationModal cartFunctions={{}} color={itemsColor} cartItems={[]} /> */}
                  {!viewer?.isActiveBaker && (
                    <AddToCartModal
                      color={itemsColor}
                      cartItems={restProps?.cart?.items}
                      cartFunctions={restProps}
                    />
                  )}
                </Box>
              )}
            </Grid>
            // )
          }
        </SearchBox>
      </StyledToolbar>
    </AppBar>
  )
}

export default withApollo()(withCart(inject('uiStore')(Navbar)))
// export default withApollo()(Navbar)
