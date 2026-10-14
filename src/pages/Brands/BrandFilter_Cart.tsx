import React from 'react'
import type { BrandT } from '../../types/brands'

function BrandFilter_Cart({data}:{data:BrandT}) {
  return (
    <div className='relative px-0.5'>
      <label className='duration-200 transition-colors border border-transparent rounded items-center select-none flex cursor-pointer'>
        <span className='leading-none'>
          <div className='transition-colors duration-200 leading-none border border-transparent inline-block p-0.5'>
            <div className='relative h-3.5 w-3.5'>
              <input type="checkbox" className='h-full accent-orange-500  w-full z-2 cursor-pointer' />
            </div>
          </div>
        </span>
        <span className='text-sm leading-none ml-0.5'>{data.name}</span>
      </label>
    </div>
  )
}

export default BrandFilter_Cart