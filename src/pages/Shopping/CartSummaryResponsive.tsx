import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'

function CartSummaryResponsive() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className='bg-white rounded lg:hidden shadow grid grid-cols-2 w-full h-10 sticky bottom-16  z-10'>
      <div className={`bg-white shadow-sm absolute w-full bottom-full left-0 transition-all ${isOpen ? "hidden" : "absolute"}`}>
        <div className='py-0.5 px-3 flex'>
          <span className='font-medium'>{t("quantity")}</span>
          <span className='font-medium ml-auto text-orange-y'>2666.50 m.</span>
        </div>
        <div className='py-0.5 px-3 flex'>
          <span className='font-medium'>{t("delivery_fee")}</span>
          <span className='font-medium ml-auto text-orange-y'>0.00 m.</span>
        </div>
      </div>
      <div className='py-2 px-4 flex justify-between items-center' onClick={() => setIsOpen(!isOpen)}>
        <div className='flex gap-3 justify-center items-center relative'>
          {
            isOpen ?
              <button className='cursor-pointer'><BiChevronDown size={24} /></button>
              : <button className='cursor-pointer'><BiChevronUp size={24} /></button>
          }
          <span className='font-bold'>{t("total_amount")}</span>
        </div>
        <span className='text-orange-y font-bold'>265894 m.</span>
      </div>
      <div className='bg-green-500 text-white flex items-center justify-center'>Sargydy taýýarlamak</div>
    </div>
  )
}

export default CartSummaryResponsive