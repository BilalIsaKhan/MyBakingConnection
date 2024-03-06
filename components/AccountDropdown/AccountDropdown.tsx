import React from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import { useRouter } from 'next/navigation'
import { AccountDropdownProps } from 'types'
import { Typography } from '@mui/material'
// import { signOut } from 'next-auth/react'
import Link from 'next/link'

const AccountDropdown = () => {
  const router = useRouter()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogOut = async () => {
    localStorage.clear()
    // await signOut()
    router.push('/signin')
  }

  // console.log('account in dropdown is ', account)
  return (
    <div className='flex items-center justify-center'>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', cursor: 'pointer' }}>
        <img
          onClick={handleClick}
          src='/Images/profile-icon.svg'
          alt='profile-icon'
          className='w-[20px] md:w-[25px] h-[20px] md:h-[25px]'
        />
      </Box>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Link href='/profile'>
          <MenuItem
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Avatar />{' '}
            <Typography
              sx={{
                fontSize: '16px !important',
                fontFamily: 'Open Sans',
                lineHeight: 'normal',
                fontWeight: '400 !important',
                color: '#000',
                '@media (max-width: 767px)': {
                  fontSize: '14px !important',
                },
              }}
            >
              Profile
            </Typography>
          </MenuItem>
        </Link>
        <Divider />
        <Link href='/profile/settings'>
          <MenuItem>
            <ListItemIcon>
              <Settings fontSize='small' />
            </ListItemIcon>
            <Typography
              sx={{
                fontSize: '16px !important',
                fontFamily: 'Open Sans',
                lineHeight: 'normal',
                fontWeight: '400 !important',
                color: '#000',
                '@media (max-width: 767px)': {
                  fontSize: '14px !important',
                },
              }}
            >
              Settings
            </Typography>
          </MenuItem>
        </Link>
        <MenuItem onClick={handleLogOut}>
          <ListItemIcon>
            <Logout fontSize='small' />
          </ListItemIcon>
          <Typography
            sx={{
              fontSize: '16px !important',
              fontFamily: 'Open Sans',
              lineHeight: 'normal',
              fontWeight: '400 !important',
              color: '#000',
              '@media (max-width: 767px)': {
                fontSize: '14px !important',
              },
            }}
          >
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </div>
  )
}

export default AccountDropdown
