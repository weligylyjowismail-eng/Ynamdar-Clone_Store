import { useEffect, useState } from 'react'
import CartContainer from '../../components/CartContainer'
import { useTranslation } from 'react-i18next'
import Sidebar from '../../components/Sidebar'
import { Link, useParams } from 'react-router-dom'
import { fen } from '../../assets/images'
import { FiMoreHorizontal } from 'react-icons/fi'
import { api } from '../../api/api'
import type { productT } from '../../types/productT'
import type { bannerT } from '../../types/banner'
import BrandInfoPopup from './BrandInfoPopupProps'
import BrandBanner from './BrandBanner'

interface BrandT {
  id: number
  name: string
  image?: string | null
}

function BrandsPage() {
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>() // brendiň ID-si (URL-den)
  const [subcategories, setSubcategories] = useState([])
  const [brand, setBrand] = useState<BrandT | null>(null)
  const [products, setProducts] = useState<productT[]>([])
  const [banners, setBanners] = useState<bannerT[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [IsPopupOpen, setIsPopupOpen] = useState(false)

  // Filtreler
  const [sort, setSort] = useState('0') // 0 = yok, 1 = ucuzdan pahalıya, 2 = pahalıdan ucuza
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(0)
  const [rangeId, setRangeId] = useState('0')

  // Marka değişince filtreleri sıfırla
  useEffect(() => {
    setSort('0')
    setMinPrice(0)
    setMaxPrice(0)
    setRangeId('0')
  }, [id])

  // Marka bilgisi, alt kategoriler ve bannerlar
  useEffect(() => {
    if (!id) return

    const getData = async () => {
      try {
        const brandRes = await api.get(`/brands/${id}`)
        setBrand(brandRes.data)

        const subRes = await api.get(`/categories?brand_id=${id}`)
        setSubcategories(subRes.data.data || subRes.data || [])
      } catch (error: any) {
        console.error('Brand page error:', error)
      }
      try {
        const bannerRes = await api.get(`/brands/${id}/banners`)
        const list = bannerRes.data.data || bannerRes.data || []
        setBanners(Array.isArray(list) ? list : [])
      } catch (error: any) {
        console.error('Banner error:', error)
        setBanners([])
      }
    }

    getData()
  }, [id])

  // Ürünler: filtre her değiştiğinde yeniden çekilir
  useEffect(() => {
    if (!id) return

    const getProducts = async () => {
      try {
        const params = new URLSearchParams({ brand_id: id, limit: '20', offset: '0' })
        if (sort === '1') params.set('sort', 'price_asc')
        if (sort === '2') params.set('sort', 'price_desc')
        if (minPrice > 0) params.set('min_price', String(minPrice))
        if (maxPrice > 0) params.set('max_price', String(maxPrice))

        const res = await api.get(`/products?${params.toString()}`)
        setProducts(res.data.data)
        setTotalCount(res.data.total)
      } catch (error: any) {
        console.error('Products error:', error)
      }
    }

    getProducts()
  }, [id, sort, minPrice, maxPrice])

  const brandImage = brand?.image
    ? `${import.meta.env.VITE_API}${brand.image}`
    : fen

  return (
    <div className='container px-10 mx-auto'>
      <div className='relative pt-2 sm:pt-4'>
        <section className='mb-4 flex items-center rounded border border-gray-200 bg-white p-3 shadow-sm'>
          <Link className='flex items-center' to={"#"}>
            <div className='h-full'>
              <div className='w-22 overflow-hidden rounded border border-gray-200 bg-white p-0.5 shadow-sm'>
                <div className='relative pt-[75%]'>
                  <div className='h-full w-full absolute left-0 top-0'>
                    <img
                      src={brandImage}
                      className='absolute left-0 top-0 z-2 h-full w-full object-cover transition-opacity duration-200'
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </Link>

          <div className='sm:flex-row flex flex-grow flex-col'>
            <div className='sm:mb-0 mb-2 pl-3'>
              <h2 className='text-base font-medium sm:text-lg md:text-xl lg:text-2xl lg:font-bold'>
                {brand?.name}
              </h2>
              <h6 className='hidden pl-0.5 text-xs text-gray-600 md:text-sm lg:block lg:pl-2.5'>
                {t('total', { defaultValue: 'jemi' })} {totalCount}
              </h6>
            </div>
          </div>

          <div className='ml-auto flex items-center divide-x divide-gray-500'>
            <div className='flex items-center gap-x-3 px-3'>
              <button
                onClick={() => setIsPopupOpen(true)}
                className='flex flex-col items-center justify-center'
              >
                <span className='flex h-6 w-6 items-end justify-center'>
                  <span className='relative w-full text-gray-700'>
                    <FiMoreHorizontal className="w-5 h-5" />
                  </span>
                </span>
              </button>
            </div>
          </div>

          <BrandInfoPopup
            open={IsPopupOpen}
            setOpen={setIsPopupOpen}
            brandName={brand?.name}
            brandImage={brandImage}
          />
        </section>

        <div className='mb-4'>
          <BrandBanner data={banners} />
        </div>

        <section className='flex h-full w-full'>
          <Sidebar
            subcategories={subcategories}
            sortValue={sort}
            onSortChange={setSort}
            onPriceSearch={(min, max) => {
              setMinPrice(min)
              setMaxPrice(max)
            }}
            selectedRangeId={rangeId}
            onRangeChange={setRangeId}
          />
          <div className='lg:w-3/4 w-full px-2'>
            <CartContainer Style="py-4 mt-2" title="" data={products} />
          </div>
        </section>
      </div>
    </div>
  )
}

export default BrandsPage