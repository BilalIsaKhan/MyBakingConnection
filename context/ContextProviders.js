import React from 'react'
import PropTypes from 'prop-types'
import { RoutingProvider } from 'context/RoutingContext'
import { AuthProvider } from 'context/AuthContext'
import { CartProvider } from 'context/CartContext'
import { ShopProvider } from 'context/ShopContext'
import { TagsProvider } from 'context/TagsContext'
import { UIProvider } from 'context/UIContext'
import { LocaleProvider } from 'context/LocaleContext'

export const ContextProviders = ({ children, shopId }) => {
  // const { tags, shop, lang, translations, namespaces } = pageProps;

  return (
    <RoutingProvider>
      <UIProvider>
        <AuthProvider>
          <CartProvider>
            <ShopProvider shop={shopId}>
              <TagsProvider
              //  tags={tags}
              >
                {children}
              </TagsProvider>
            </ShopProvider>
          </CartProvider>
        </AuthProvider>
      </UIProvider>
    </RoutingProvider>
  )
}

ContextProviders.propTypes = {
  children: PropTypes.node,
  pageProps: PropTypes.object,
}
