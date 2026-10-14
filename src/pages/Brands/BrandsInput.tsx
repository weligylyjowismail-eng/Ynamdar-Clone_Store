import React from 'react'
import { IoMdRadioButtonOff, IoMdRadioButtonOn } from 'react-icons/io'

interface BrandInputProps {
  title: string
  id: string
  name: string
  checked?: boolean
  onChange?: () => void
}

function BrandInput({ title, id, name, checked, onChange }: BrandInputProps) {
  return (
    <div className='relative px-0.5'>
      <label className='duration-200 transition-colors border border-transparent rounded items-center select-none flex cursor-pointer py-1'>
        <span className='leading-none'>
          <div className='transition-colors duration-200 leading-none border border-transparent inline-block p-0.5'>
            <div className='relative w-4 h-4 flex items-center justify-center'>
              <input
                type="radio"
                name={name}
                id={id}
                checked={checked}
                onChange={onChange}
                className='peer opacity-0 cursor-pointer w-full h-full z-10 absolute top-0 left-0'
              />
              <span className='hidden peer-checked:flex absolute h-full w-full top-0 left-0 items-center justify-center pointer-events-none'>
                <IoMdRadioButtonOn size={18} color='#5f2363' />
              </span>
              <span className='flex peer-checked:hidden absolute h-full w-full top-0 left-0 items-center justify-center pointer-events-none'>
                <IoMdRadioButtonOff size={18} color='#9ca3af' />
              </span>
            </div>
          </div>
        </span>
          <span className='text-sm leading-none ml-1.5'>{title}</span>
      </label>
    </div>
  )
}

export default BrandInput