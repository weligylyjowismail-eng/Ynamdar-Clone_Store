import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { alma } from '../assets/images'
import { IoCartOutline } from 'react-icons/io5';
import { HiOutlineChevronLeft, HiOutlineChevronRight, HiOutlineShoppingCart } from 'react-icons/hi';
import { useTranslation } from 'react-i18next'
import type { dataT } from '../types/dataT';
import { useAuthStore } from '../store/Store';

function Cart({ data }: { data?: dataT }) {
  const { i18n } = useTranslation();
  const { wishlist, toggleLike, cart, addToCart, removeFromCart } = useAuthStore();
  const isLiked = data?.id ? wishlist.some((item) => String(item?.id) === String(data.id)) : false;
  const currentLang = i18n.language; // "tm" veya "ru" değerini otomatik yakalar
  const cartItem = cart.find((item) => String(item.id) === String(data?.id));
  const productQuantity = cartItem && 'quantity' in cartItem ? (cartItem.quantity as number) : 0;
  const [openbut4, setopenbut4] = useState(productQuantity > 0)


  function azalt() {
    if (data?.id) {
      removeFromCart(data.id);

      if (productQuantity <= 1) {
        setopenbut4(false);
      }
    }
  }


  return (
    <div className='h-full'>
      <div className='bg-white p-2 duration-150 shadow-sm border border-gray-y h-full rounded flex flex-col relative'>

        <Link to={`/ProductDetails/${data?.id}`} className='block group'>
          <div className='bg-white overflow-hidden rounded-[10px] mb-2 relative'>
            {Number(data?.discount) > 0 && (
              <div className='shadow-sm py-1 bg-red-500 text-white text-xs font-semibold px-2.5 rounded-lg flex justify-center items-center w-13 select-none z-2 absolute bottom-0 left-0 translate-x-2 -translate-y-2'>
                {Number(data?.discount)}%
              </div>
            )}
            <div className='pt-[100%] relative'>
              <div className='absolute left-0 top-0 w-full h-full'>
                <img src={data?.image_small ? `${import.meta.env.VITE_API}${data.image_small}` : alma} alt="Ürün" className="object-contain w-full h-full" />
              </div>
            </div>
          </div>
          <div className='flex flex-col'>
            <h4 className='py-2 font-medium text-[#361537]'>{(data?.[`name_${currentLang}` as keyof dataT] as string) || "Ýüklenýär"}</h4>
            <p className='pb-1 text-[#361537] text-sm'>{(data?.[`minibody_${currentLang}` as keyof dataT] as string) || "Ýüklenýär"}</p>
          </div>
        </Link>
        <div className='mt-auto pt-2'>
          <div className='font-bold text-lg mb-2'>
            <span className='mx-0.5 w-max'>
              {(Number(data?.price) - (Number(data?.price) / 100 * Number(data?.discount))).toFixed(2) + 'm.'}
            </span>
            {Number(data?.discount) > 0 && (
              <span className='mx-0.5 text-xs text-gray-400 line-through font-semibold translate-y-1.5'>
                {data?.price.toFixed(2)}m.
              </span>
            )}
          </div>

          <div className='flex items-center gap-2'>
            <button
              className='p-1 z-10 cursor-pointer'
              onClick={(e) => {
                e.preventDefault();
                if (data) toggleLike(data);
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill={isLiked ? "#5f2363" : "none"}>
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  stroke="#5f2363"
                  strokeWidth="2"
                />
              </svg>
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                if (data) {
                  addToCart(data);
                  setopenbut4(true);
                }
              }}
              className='bg-purple-y-500 py-2 rounded h-9 flex-grow flex justify-center items-center text-white hover:bg-purple-y-400 transition-colors z-10 cursor-pointer'
            >
              {openbut4 ? (
                <div className='flex items-center h-full w-full justify-between'>
                  <span className='px-2' onClick={(e) => { e.stopPropagation(); azalt(); }}><HiOutlineChevronLeft color='white' size={24} /></span>
                  <span className='font-bold text-sm py-1 px-1.5 flex justify-center grow items-center'>
                    <span>{productQuantity}</span>
                    <span className='md:inline-block md:ml-1 hidden'>sany</span>
                  </span>
                  <span className='px-2' onClick={(e) => { e.stopPropagation(); data && addToCart(data) }}><HiOutlineChevronRight color='white' size={24} /></span>
                </div>
              ) : (
                <HiOutlineShoppingCart size={20} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart