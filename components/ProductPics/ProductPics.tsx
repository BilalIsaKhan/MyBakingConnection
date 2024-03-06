import Image from 'next/image'
import { useEffect, useState } from 'react'

const ProductPics = ({ images }: any) => {
  console.log('images are', images)
  const [selected, setSelected] = useState('')
  useEffect(() => {
    setSelected(images[0]?.URLs?.large)
  }, images)
  return (
    <div className='flex flex-col gap-[11px]'>
      <div className='relative w-[100%] md:w-[400px] lg:w-[500px] h-[400px] md:h-[400px] lg:h-[500px]'>
        <img className='w-full h-full rounded object-cover' src={selected} alt='Product display' />
      </div>
      <div className='flex gap-[5px] w-full md:w-[400px] lg:w-[500px] h-[100px]'>
        {images?.map((background: any, index: any) => {
          return (
            <div
              key={index}
              onClick={(e) => {
                setSelected(background?.URLs?.large)
              }}
              className={`relative p-[5px] border-solid rounded w-[20%] h-[80px] ${
                selected === background?.URLs?.large ? 'border-[#000]' : 'border-[#888]'
              }`}
            >
              <img src={background?.URLs?.large} alt='img' className='w-full h-full object-fill' />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ProductPics
