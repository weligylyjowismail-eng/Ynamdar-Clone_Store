import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { api } from '../../api/api'
import VipBrandCard from './VipBrandCard'

interface BrandItem {
  id: number
  name: string
  image?: string | null
}

interface Props {
  title?: string
  endpoint?: string
  variant?: 'vip' | 'new'
  to?: string
}

function VipBrandsContainer({ title = 'VIP dükanlar', endpoint = '/brands?vip=1', variant = 'vip', to = '#' }: Props) {
  const [brands, setBrands] = useState<BrandItem[]>([])
  const [canLeft, setCanLeft] = useState(false)
  const [canRight, setCanRight] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    api
      .get(endpoint)
      .then((res) => {
        const list = res.data.data || res.data
        setBrands(Array.isArray(list) ? list : [])
      })
      .catch((error) => {
        console.error('Brand section error:', error)
        setBrands([])
      })
  }, [endpoint])

  const updateArrows = () => {
    const el = scrollRef.current
    if (!el) return
    setCanLeft(el.scrollLeft > 2)
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2)
  }

  useEffect(() => {
    updateArrows()
    window.addEventListener('resize', updateArrows)
    return () => window.removeEventListener('resize', updateArrows)
  }, [brands])

  const scrollPage = (dir: 1 | -1) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' })
  }
  if (brands.length === 0) return null

  return (
    <section className='mt-4 lg:mt-2 py-2 lg:py-4'>
      <h2 className='text-base font-medium sm:text-lg md:text-xl lg:text-2xl lg:font-bold mb-0.5 lg:mb-1'>
        <Link to={to} className='flex items-center transition-colors duration-150 hover:text-purple-y-500 sm:inline-flex'>
        <span>
          {title}
        </span>
        </Link>
      </h2>
      <div className='relative'>
        <div
          ref={scrollRef}
          onScroll={updateArrows}
          className='relative flex w-full flex-grow select-none overflow-hidden'
        >
          <div className='z-1 -mx-0.5 flex w-full items-center whitespace-nowrap transition-transform duration-300 md:-mx-1 lg:-mx-2'>
            {brands.map((b) => (
              <VipBrandCard key={b.id} id={b.id} name={b.name} image={b.image} variant={variant} />
            ))}
          </div>
        </div>
        
        {canLeft && (
          <button
            type='button'
            onClick={() => scrollPage(-1)}
            className='absolute left-1 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-purple-y-500 shadow cursor-pointer'
          >
            <IoIosArrowBack size={24} />
          </button>
        )}
        {canRight && (
          <button
            type='button'
            onClick={() => scrollPage(1)}
            className='absolute right-1 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-purple-y-500 shadow cursor-pointer'
          >
            <IoIosArrowForward size={24} />
          </button>
        )}
      </div>
    </section>
  )
}

export default VipBrandsContainer