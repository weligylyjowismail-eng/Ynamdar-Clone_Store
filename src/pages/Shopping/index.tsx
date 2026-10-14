import React, { useState } from 'react'
import { HiOutlineTrash } from 'react-icons/hi'
import ShoppingCart from './ShoppingCart'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '../../store/Store'
import Popup from '../../components/Popup'
import { Sebetbosfot } from '../../assets/images'

function Shopping() {
  const { t } = useTranslation()
  const [Open, setOpen] = useState(false)
  const { cart, clearCart } = useAuthStore()

  const groupedCart = (cart || []).reduce<Record<string, typeof cart>>((groups, item) => {
    const marketName = `${item.name_tm}`
    if (!groups[marketName]) groups[marketName] = []
    groups[marketName].push(item)
    return groups
  }, {})

  const isCartEmpty = !cart || cart.length === 0

  return (
    <div className='mx-auto px-10 container mb-16 lg:mb-0'>
      <div className='h-full p-4'>
        <section className='flex h-full flex-col'>
          <h2 className='text-base font-medium sm:text-lg md:text-xl lg:text-2xl lg:font-bold mb-1.5 sm:mb-2 lg:mb-3'>
            {t("shopping_cart")}
          </h2>

          {!isCartEmpty ? (
            <div className='relative -mb-10 pb-1 lg:pb-2'>
              <button 
                onClick={() => setOpen(true)} 
                className='bg-purple-y-500 hover:bg-purple-y-400 text-white font-semibold shadow text-xs py-1.5 px-4 rounded absolute -top-10 right-0 transition-colors cursor-pointer flex justify-center items-center gap-2'
              >
                <span>{t("clear_cart")}</span>
                <HiOutlineTrash size={16} />
              </button>
              {Object.entries(groupedCart).map(([marketName, items]) => (
                <ShoppingCart key={marketName} marketName={marketName} items={items!} />
              ))}
              <Popup open={Open} setOpen={setOpen}>
                <div className='outline-none shadow-lg bg-white rounded h-auto'>
                  <div className='pt-6 pb-4 px-4'>
                    <p className='pr-4'>{t("clear_cart_confirm")}</p>
                    <div className='mt-2 py-1'>
                      <div className='flex justify-end pt-1'>
                        <button 
                          onClick={() => {
                            clearCart()
                            setOpen(false)
                          }} 
                          className='duration-200 font-semibold transition-colors text-white text-sm px-3 py-1 bg-[#4bb543] rounded mx-1 cursor-pointer hover:bg-[#7ed26f]'
                        >
                          {t("Yes")}
                        </button>
                        <button 
                          onClick={() => setOpen(false)} 
                          className='duration-200 font-semibold transition-colors text-white text-sm px-3 py-1 bg-red-600 rounded mx-1 cursor-pointer hover:bg-[#ff503f]'
                        >
                          {t("No")}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Popup>
            </div>
          ) : (
            <div className='bg-white md:h-60 h-30 flex flex-col justify-center items-center shadow-sm p-2 border border-gray-200 rounded flex-wrap grow lg:mt-2'>
              <div className='w-full flex items-center justify-center mb-3'>
                <img src={Sebetbosfot} alt="Empty Cart" />
              </div>
              <div className='flex items-center justify-center'>
                <h2 className='font-bold text-xl text-gray-600 text-center'>
                  {t("cart_empty")}
                </h2>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default Shopping