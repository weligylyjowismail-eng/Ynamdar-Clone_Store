
import React, { useState } from 'react'
import { IoMdRadioButtonOff, IoMdRadioButtonOn } from 'react-icons/io'

function BrandInput({ title, id ,name }: { title: String, id:string,name:string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className='relative px-0.5'>
      <label className='duration-200 transition-colors border border-transparent rounded items-center select-none flex cursor-pointer' onClick={() => setOpen(!open)}>
        <span className='leading-none'>
          <div className='transition-colors duration-200 leading-none border border-transparent inline-block p-0.5'>
            <div className='relative w-3.5 h-3.5'>
              <input type="radio" name={name} className='peer opacity-0 cursor-pointer w-full h-full z-2 relative' />
              <span className='hidden peer-checked:flex absolute h-full w-full top-0 left-0 z-1 items-center justify-center'>
                <IoMdRadioButtonOn size={18} color='#ff6b00' /> 
              </span>
              <span className='flex peer-checked:hidden absolute h-full w-full top-0 left-0 z-1 items-center justify-center'>
                <IoMdRadioButtonOff size={18} color='#9ca3af' /> 
              </span>
            </div>
          </div>
        </span>
        <span className='text-sm leading-none ml-0.5'>{title}</span>
      </label>
    </div>
  )
}

export default BrandInput