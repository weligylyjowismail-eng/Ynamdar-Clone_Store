import React, { useState } from 'react'
import { HiOutlineChevronLeft, HiOutlineChevronRight, HiOutlineTrash } from 'react-icons/hi'
import { FiHelpCircle } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { fen } from '../../assets/images'
import { useAuthStore } from '../../store/Store'
import i18n from '../../i18n'
import CartSummary from './CartSummary'
import type { productT } from '../../types/productT'
import ConfirmModal from './ConfirmModal'

interface ShoppingCartProps {
  marketName: string
  items: (productT & { quantity?: number })[]
}

interface CartItemRowProps {
  item: productT & { quantity?: number }
  marketName: string
  API_URL: string
}

// Her sany haryt hatary — öz "pozmaly?" modalyny özi saklaýar (useState-i .map()-iň daşyna çykarmak üçin)
function CartItemRow({ item, marketName, API_URL }: CartItemRowProps) {
  const currentLang = i18n.language
  const { addToCart, removeFromCart, removeAllSingleProductFromCart } = useAuthStore()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const productQuantity = item.quantity || 1
  const oldPrice = Number(item?.price || 0)
  const discountPercent = Number(item?.discount || 0)
  const newPrice = oldPrice - (oldPrice * discountPercent / 100)
  const lineTotal = (newPrice * productQuantity).toFixed(2)
  const productName = currentLang === 'ru' ? item.name_ru : item.name_tm
  const rawImg = item?.image_small

  let imageUrl = fen
  if (rawImg && typeof rawImg === 'string') {
    if (rawImg.startsWith('http://') || rawImg.startsWith('https://')) {
      imageUrl = rawImg
    } else {
      const cleanPath = rawImg.replace(/^\/?(uploads\/)?/, '')
      imageUrl = `${API_URL}/uploads/${cleanPath}`
    }
  }

  const handleDeleteClick = () => {
    setIsModalOpen(true)
  }

  const handleConfirmDelete = () => {
    removeAllSingleProductFromCart(item.id)
  }

  return (
    <div className='md:py-1 py-3'>
      <Link to={"#"} className='flex items-center'>
        <div className='md:w-40 md:p-2 w-1/3 flex-shrink-0 py-2 sm:w-2/5'>
          <div className='z-1 relative pt-[133.34%]'>
            <div className='h-full w-full absolute left-0 top-0'>
              <img
                src={imageUrl}
                className='absolute left-0 top-0 z-2 h-full w-full object-cover transition-opacity duration-200'
                alt={String(productName || '')}
                onError={(e) => {
                  if (e.currentTarget.src !== fen) {
                    e.currentTarget.src = fen
                  }
                }}
              />
            </div>
          </div>
        </div>
        <div className='sm:pr-3 md:static md:flex-row md:py-4 relative flex flex-grow items-center flex-col md:flex-row py-0.5 pl-3'>
          <div className='grow'>
            <p className='sm:text-sm py-1 pr-4 text-xs font-semibold'>
              {String(productName)}
            </p>
            <div className='sm:text-sm overflow-hidden text-xs'>
              <div className='flex py-1.5 leading-[1.2]'>
                <p className='sm:w-1/3 w-2/5 font-medium md:w-1/3 lg:w-1/2 xl:w-1/4'>
                  Brend
                </p>
                <p className='sm:w-2/3 w-3/5 pl-2 md:w-2/3 lg:w-1/2 xl:w-3/4'>
                  {marketName}
                </p>
              </div>
              <div className='flex py-1.5 leading-[1.2]'>
                <p className='sm:w-1/3 w-2/5 font-medium md:w-1/3 lg:w-1/2 xl:w-1/4'>
                  Haryt kody
                </p>
                <p className='sm:w-2/3 w-3/5 pl-2 md:w-2/3 lg:w-1/2 xl:w-3/4'>
                  {String(item.kode)}
                </p>
              </div>
            </div>
          </div>
          <div className='md:relative md:ml-0 md:mt-0 md:w-60 md:flex-col md:justify-center self-center flex flex-shrink-0 items-center justify-center py-2'>
            <h2 className='sm:text-base md:pl-0 md:text-lg pl-1 text-xs font-medium text-accent-500 sm:font-bold md:order-none md:mb-2 md:ml-0 order-2 ml-auto text-center'>
              {lineTotal} m.
            </h2>
            <div className='w-30 md:w-40 relative flex items-center justify-between rounded border border-purple-y-500 bg-purple-y-500 text-white shadow-sm'>
              <button
                onClick={(e) => { e.preventDefault(); removeFromCart(item.id) }}
                className='md:h-10 md:w-10 md:px-3 flex h-8 w-8 flex-shrink-0 items-center justify-center bg-purple-y-500 px-2.5 text-purple-y-500 transition-colors duration-150 hover:bg-purple-y-400'
              >
                <HiOutlineChevronLeft className='text-white' size={40} />
              </button>
              <span className='md:text-sm flex h-full flex-grow items-center bg-accent-500 px-1.5 py-1 text-xs'>
                <span className='h-full w-full bg-accent-500 text-center font-bold outline-none'>{productQuantity}</span>
              </span>
              <button
                onClick={(e) => { e.preventDefault(); addToCart(item) }}
                className='md:h-10 md:w-10 md:px-3 flex h-8 w-8 flex-shrink-0 items-center justify-center bg-purple-y-500 px-2.5 text-purple-y-500 transition-colors duration-150 hover:bg-purple-y-400'
              >
                <HiOutlineChevronRight className='text-white' size={40} />
              </button>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleDeleteClick();
              }}
              className='md:-right-1 md:-top-2 md:px-1 absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded bg-purple-y-500 px-1.5 text-white transition-colors duration-150 hover:bg-purple-y-400'
            >
              <HiOutlineTrash size={16} />
            </button>
            <ConfirmModal
              open={isModalOpen}
              setOpen={setIsModalOpen}
              message="Bu ürünü sepetten silmek istediğinize emin misiniz?"
              onConfirm={handleConfirmDelete}
            />
          </div>
        </div>
      </Link>
    </div>
  )
}

function ShoppingCart({ marketName, items }: ShoppingCartProps) {
  const totalQuantity = items.reduce((sum, item) => sum + (item.quantity || 1), 0)
  const totalAmount = items.reduce((sum, item) => {
    const oldPrice = Number(item?.price || 0)
    const discountPercent = Number(item?.discount || 0)
    const newPrice = oldPrice - (oldPrice * discountPercent / 100)
    return sum + (newPrice * (item.quantity || 1))
  }, 0)
  const API_URL = import.meta.env.VITE_API || 'http://localhost:5000'

  return (
    <div className='relative flex flex-wrap lg:-mx-2 lg:flex-nowrap mb-10'>
      <div className='w-full lg:flex-grow lg:px-2'>
        <div className='relative rounded-sm border border-gray-200 bg-white shadow-sm lg:rounded'>
          <div className='z-4 lg:top-15.5 sticky flex items-center bg-white px-3 py-3 shadow sm:px-4 lg:rounded lg:px-5 lg:py-4'>
            <div className='flex flex-col'>
              <h2 className='text-base font-bold leading-none md:mb-1 md:text-lg lg:text-xl'>
                <Link to={"#"} className='transition-colors duration-100 hover:text-purple-y-500'>
                  {marketName}
                </Link>
              </h2>
              <p className='pl-0.5 text-xs font-normal md:text-sm'>Iş wagty: 10:00 - 20:00</p>
            </div>
            <button className='ml-auto mr-2 w-5 text-purple-y-500 sm:w-6'>
              <FiHelpCircle />
            </button>
            <button className='md:px-1 h-5 w-5 rounded bg-purple-y-500 px-1.5 text-white transition-colors duration-150 hover:bg-purple-y-400 flex items-center justify-center'>
              <HiOutlineTrash />
            </button>
          </div>
          <div className='h-full divide-y px-3 py-2'>
            {items.map((item) => (
              <CartItemRow key={item.id} item={item} marketName={marketName} API_URL={API_URL} />
            ))}
          </div>
        </div>
      </div>
      <CartSummary totalQuantity={totalQuantity} totalAmount={totalAmount} />
    </div>
  )
}

export default ShoppingCart