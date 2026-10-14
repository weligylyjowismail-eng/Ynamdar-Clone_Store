import React, { useState } from 'react'
import { IoMdRadioButtonOff, IoMdRadioButtonOn } from 'react-icons/io'

function Profil_cart({title,}:{title:String}) {
  const [open,setOpen]=useState(false)
  return (
    <div className='relative px-0.5'>
                      <label htmlFor="" className='duration-200 transition-colors border border-transparent rounded items-center select-none flex cursor-pointer' onClick={()=>setOpen(!open)}>
                        <span className='leading-none'>
                          <div className='transition-colors duration-200 leading-none border border-transparent inline-block p-0.5'>
                            <div className='relative h-4.5 w-4.5'>
                              <input type="radio" className='opacity-0 cursor-pointer w-full h-full z-2 relative' />
                              {
                                open?
                                <span className='absolute cursor-pointer h-full w-full top-0 left-0 z-1'><IoMdRadioButtonOn color='#ff6b00'/></span>
                                :<span className='absolute cursor-pointer h-full w-full top-0 left-0 z-1'><IoMdRadioButtonOff color='#ff6b00'/></span>
                              }
                            </div>
                          </div>
                        </span>
                        <span className='text-sm leading-none ml-0.5'>{title}</span>
                      </label>
                    </div>
  )
}

export default Profil_cart