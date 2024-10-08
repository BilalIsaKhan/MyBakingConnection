import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'

const PurchaseHistoryTable = ({ orders }: any) => {
  return (
    <>
      <TableContainer sx={{ maxHeight: 440 }}>
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
              <TableCell>Order ID</TableCell>
              <TableCell>Bakery Name</TableCell>
              <TableCell>Order Placed</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell>Total</TableCell>
              {/* <TableCell>Star Rating</TableCell> */}
              <TableCell>Order Status</TableCell>
              {/* <TableCell></TableCell> */}
            </TableRow>
          </TableHead>

          <TableBody
            sx={{
              '& .MuiTableCell-root': {
                fontFamily: 'Open Sans',
                color: '#888',
                fontSize: '16px !important',
                fontWeight: '600 !important',
                '@media (max-width: 767px)': {
                  fontSize: '14px !important',
                },
              },
            }}
          >
            {orders?.map((row: any, index: any) => (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component='th' scope='row'>
                  {row?.node?.referenceId}
                </TableCell>
                <TableCell>{row?.node?.shop?.name}</TableCell>
                <TableCell>
                  {new Date(row?.node?.updatedAt).toLocaleDateString('en-US').replace(/\//g, '.')}
                </TableCell>

                <TableCell>{'Card'}</TableCell>
                <TableCell>${row?.node?.summary?.total?.amount}</TableCell>
                {/* <TableCell>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    <img src='/Images/star.svg' alt='details' className='h-[15px] w-[15px]' />{' '}
                    {row.rating}
                  </div>
                </TableCell> */}
                <TableCell>
                  <span style={{ textTransform: 'capitalize' }}>{row?.node?.displayStatus}</span>
                </TableCell>
                {/* <TableCell>
                  <img
                    src='/Images/purchase-details.svg'
                    alt='details'
                    className='h-[24px] md:h-[32px] w-[24px] md:w-[32px]'
                  />
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default PurchaseHistoryTable
