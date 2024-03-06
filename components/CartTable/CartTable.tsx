import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import { SecondaryBtn } from '../Buttons'
// import Spinner from '../Spinner'
import EmptyCart from '../EmptyCart'

interface CartTableProps {
  items: any[]

  cartFunctions: any
}

const CartTable = ({ items, cartFunctions }: CartTableProps) => {
  // function createData(img: string, name: string, price: number, quantity: number) {
  //   return { img, name, price, quantity }
  // }

  // const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false)

  const { setIsUpdatingQuantity, isUpdatingQuantity } = cartFunctions?.uiStore

  // console.log('cartFunctions in cartTable is', cartFunctions)

  const handleAddQuantity = async (cartItem: any) => {
    setIsUpdatingQuantity(true)

    const { onChangeCartItemsQuantity } = cartFunctions

    const input = {
      cartItemId: cartItem?._id,
      quantity: cartItem?.quantity + 1,
    }

    // console.log('cartItem in handleAddQuantity is', cartItem)
    // return

    try {
      await onChangeCartItemsQuantity(input)

      setIsUpdatingQuantity(false)
    } catch (error: any) {
      // console.log('error in handleAddQuantity is', error?.message)

      setIsUpdatingQuantity(false)
    }
  }

  const handleSubtractQuantity = async (cartItem: any) => {
    setIsUpdatingQuantity(true)
    const { onChangeCartItemsQuantity } = cartFunctions

    const input = {
      cartItemId: cartItem?._id,
      quantity: cartItem?.quantity - 1,
    }

    // console.log('cartItem in handleSubtractQuantity is', cartItem)

    // return

    try {
      await onChangeCartItemsQuantity(input)

      setIsUpdatingQuantity(false)
    } catch (error: any) {
      // console.log('error in handleAddQuantity is', error?.message)

      setIsUpdatingQuantity(false)
    }
  }

  const handleRemoveItem = async (cartItemsId: string) => {
    setIsUpdatingQuantity(true)
    const { onRemoveCartItems } = cartFunctions

    await onRemoveCartItems(cartItemsId)

    setIsUpdatingQuantity(false)
  }

  if (items?.length === 0)
    return (
      <div className='w-full flex justify-center'>
        <EmptyCart />
      </div>
    )

  return (
    <TableContainer>
      <Table stickyHeader>
        <TableHead
          sx={{
            '& .MuiTableCell-root': {
              fontFamily: 'Open Sans',
              color: '#090909',
              fontSize: '16px !important',
              fontWeight: '600 !important',
              '@media (max-width: 767px)': {
                fontSize: '14px !important',
              },
            },
          }}
        >
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody
          sx={{
            '& .MuiTableCell-root': {
              fontFamily: 'Open Sans',
              color: '#000',
              fontSize: '16px !important',
              fontWeight: '600 !important',
              borderBottom: 'none',
              '@media (max-width: 767px)': {
                fontSize: '14px !important',
              },
            },
          }}
        >
          {items?.map((item, index) => (
            <TableRow key={index}>
              <TableCell
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  textAlign: 'center',
                  '@media (max-width: 767px)': {
                    flexDirection: 'column',
                  },
                }}
                component='th'
                scope='row'
              >
                <img
                  src={item?.thumbnailImage ? item?.thumbnailImage : '/Images/cart-dummy-img.png'}
                  alt={item.title}
                  className='w-[56px] md:w-[72px] h-[56px] md:h-[72px] rounded-[4px]'
                />{' '}
                {item.title}
              </TableCell>
              <TableCell
                sx={{
                  color: '#888 !important',
                  fontWeight: '500 !important',
                }}
              >
                ${parseFloat(item?.price?.amount).toFixed(2)}
              </TableCell>
              <TableCell>
                <div className='flex'>
                  <div
                    className='bg-[#F3F3F3] px-[12px] md:px-[16px] py-[5px] md:py-[6px] cursor-pointer'
                    onClick={() => handleSubtractQuantity(item)}
                  >
                    -
                  </div>
                  <div
                    className='px-[11px] md:px-[15px] py-[5px] md:py-[6px]'
                    style={{
                      border: '0.758px solid #CBCBCB',
                    }}
                  >
                    {item?.quantity}
                  </div>
                  <div
                    className='bg-[#F3F3F3] px-[12px] md:px-[16px] py-[5px] md:py-[6px] cursor-pointer'
                    onClick={() => handleAddQuantity(item)}
                  >
                    +
                  </div>
                </div>
              </TableCell>
              <TableCell>${parseFloat(item?.subtotal?.amount).toFixed(2)}</TableCell>
              <TableCell>
                <SecondaryBtn
                  color='#000'
                  handleClick={(e) => handleRemoveItem(item?._id)}
                  text='Remove'
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CartTable
