import React from 'react'
import { Halanlarymfoto } from '../../assets/images'
import { t } from 'i18next'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '../../store/Store'
import Cart from '../../components/Cart'
import type { dataT } from '../../types/dataT'
import type { productT } from '../../types/productT'

function Favorites() {
  const { t } = useTranslation()
  const { wishlist } = useAuthStore();
  const cleanWishlist = wishlist.filter(item => item !== null && item !== undefined);
  return (
    <div className='mx-auto px-10 container'>
      <div className='lg:pb-2 sm:pt-4'>
        <div className=' flex flex-col h-full'>
          <h2 className='font-bold text-2xl mb-3'>{t("favorites_title")} {cleanWishlist.length > 0 && ` (${cleanWishlist.length})`}</h2>
          {cleanWishlist.length === 0 ? (
            <div className='bg-white md:h-60 h-30 flex flex-col justify-center items-center shadow-sm p-2 border border-gray-200 rounded lg:mt-2'>
              <div className='flex justify-center items-center'>
                <img className='mb-2.5 w-20' src={Halanlarymfoto} alt="" />
              </div>
              <div className='flex justify-center items-center'>
                <h2 className='font-bold text-xl'>{t("no_favorites")}</h2>
              </div>
            </div>
          ) : (
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:mt-2'>
              {wishlist
                .filter((product) => product !== null && product !== undefined) // 1. Bozuk olanları listeden temizle
                .map((product) => (
                  <Cart key={product.id} data={product as dataT} /> // 2. Sağlam olanları ekrana bas
                ))
              }
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Favorites