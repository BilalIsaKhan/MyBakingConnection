'use Client'

import React, { createContext } from 'react'
import PropTypes from 'prop-types'

export const ShopContext = createContext()

export const ShopProvider = ({ shop, children }) => {
  // const shopId = localStorage.getItem('shopId')

  console.log('shop in shop context is', shop)

  const shopDetails = {
    _id: shop,
  }

  return <ShopContext.Provider value={shopDetails}>{children}</ShopContext.Provider>
}

ShopProvider.propTypes = {
  children: PropTypes.node,
  shop: PropTypes.string,
}
