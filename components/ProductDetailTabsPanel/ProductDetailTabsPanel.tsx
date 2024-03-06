import React from 'react'
import { ProductDetailTabsPanelProps } from 'types'
import ProductDetailDescription from '../ProductDetailDescription/ProductDetailDescription'
import ClientReviewsTab from '../ClientReviewsTab'

const ProductDetailTabsPanel = ({ activeTab, productDescription }: ProductDetailTabsPanelProps) => {
  // console.log("productDescription",productDescription)
  return (
    <div>
      {activeTab == 0 && <ProductDetailDescription productDescription={productDescription} />}
      {activeTab == 1 && (
        <div className='w-full'>
          <ClientReviewsTab />
        </div>
      )}
      {activeTab == 2 && <div>Faqs</div>}
    </div>
  )
}

export default ProductDetailTabsPanel
