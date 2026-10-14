import { Link } from 'react-router-dom'
import { FaStar } from 'react-icons/fa'
import { fen } from '../../assets/images'

interface Props {
  id: number
  name: string
  image?: string | null
  variant?: 'vip' | 'new'
}

const toUrl = (path?: string | null) => {
  if (!path) return null
  if (path.startsWith('http')) return path
  return `${import.meta.env.VITE_API}${path.startsWith('/') ? '' : '/'}${path}`
}

function VipBrandCard({ id, name, image, variant = 'vip' }: Props) {
  const isVip = variant === 'vip'
  return (
    <div className='sm:w-1/4 w-1/3 p-1 md:w-1/5 lg:p-2 xl:w-1/6 h-full shrink-0'>
      <Link to={`/BrandsPage/${id}`} className={`${isVip ? 'bg-purple-y-500 text-gray-50' : 'bg-gray-200 text-gray-900'} z-1 sm:rounded-2xl relative flex h-full flex-col overflow-hidden rounded-lg p-2 shadow-sm sm:p-0 md:rounded-xl`}>
        <div className='absolute left-0 top-0 z-10 h-8 w-8 overflow-hidden rounded-br-[20px] rounded-tl-lg bg-purple-y-500 text-gray-50 md:h-10 md:w-10 md:rounded-br-[22px] lg:rounded-br-3xl'>
          <div className='flex h-full w-full items-center justify-center'>
            <span className='h-4 w-4 lg:h-5 lg:w-5'>
              {isVip ? (
                <svg
                  width="12"
                  height="9"
                  viewBox="0 0 12 9"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  className='w-full h-full'
                >
                  <path d="M12 2.25L9.375 7.5H2.625L0 2.25L3.375 4.5L6 0L8.625 4.5L12 2.25Z" />
                </svg>
              ) : (
                <FaStar className='w-full h-full' />
              )}
            </span>
          </div>
        </div>
        <div className='flex-shrink-0 pt-0 sm:px-2 sm:pt-4'>
          <div className='z-1 relative mb-0 sm:mb-1 sm:px-1'>
            <div className='z-1 relative overflow-hidden rounded-xl bg-white pt-[75%]'>
              <div className='base-lazy-image h-full w-full absolute left-0 top-0'>
                <img src={toUrl(image) || fen} className='absolute left-0 top-0 z-2 h-full w-full object-cover transition-opacity duration-200' alt={name} />
              </div>
            </div>
          </div>
        </div>
        <div className='sm:max-h-auto flex max-h-16 flex-grow flex-col items-center justify-center px-1 pb-1 pt-1.5 text-center sm:h-auto sm:px-4 sm:pb-3 sm:pt-2'>
          <h4 className='sm:text-sm sm--3:leading-[1.1] flex-shrink-0 whitespace-normal text-xs font-semibold leading-[1.1] md:text-base md:font-semibold'>
            {name}
          </h4>
        </div>
      </Link>
    </div>
  )
}

export default VipBrandCard