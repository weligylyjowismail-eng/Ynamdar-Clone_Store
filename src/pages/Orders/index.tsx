import React from 'react'
import { useTranslation } from 'react-i18next'

function Orders() {
  const {t} = useTranslation()
  return (
    <div className='mx-auto px-10 container'>
      <div className='py-2 h-full'>
      <div className='lg:pb-2 sm:pt-4 flex flex-col h-full'>
        <h2 className='font-bold text-2xl mb-3'>{t("orders_title")}</h2>
        <div className='bg-white md:h-60 h-30 flex justify-center items-center shadow-sm p-2 border border-gray-200 rounded flex-wrap grow'>
          <div className='flex justify-center items-center'>
            <h2 className='font-bold text-xl'>{t("no_orders")}</h2>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Orders