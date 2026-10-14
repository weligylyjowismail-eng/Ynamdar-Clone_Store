import { useEffect, useRef, useState } from 'react'
import { fen } from '../../assets/images'
import { Link, useParams } from 'react-router-dom'
import { HiOutlineShoppingCart, HiOutlineCheck } from 'react-icons/hi'
import { useTranslation } from 'react-i18next'
import { api } from '../../api/api'
import type { productT } from '../../types/productT'
import { useAuthStore } from '../../store/Store'
import CartContainer from '../../components/CartContainer'

const toUrl = (path?: string | null) => {
  if (!path) return null
  return path.startsWith('http') ? path : `${import.meta.env.VITE_API}${path}`
}

function ProductDetails() {
  const { t, i18n } = useTranslation() // DEĞİŞTİ: t eklendi
  const lang = i18n.language
  const { id } = useParams()
  const { wishlist, toggleLike, addToCart } = useAuthStore()

  const [product, setProduct] = useState<productT | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<productT[]>([]) // YENİ
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [justAdded, setJustAdded] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    setSelectedImage(null)
    setJustAdded(false)
    setRelatedProducts([])

    const getData = async () => {
      try {
        const res = await api.get(`/products/${id}`)
        const mainProduct = res.data.data || res.data
        setProduct(mainProduct)

        // YENİ: aynı kategorideki benzer ürünler (kendisi hariç, en fazla 4)
        if (mainProduct.category_id) {
          try {
            const relRes = await api.get(`/products?category_id=${mainProduct.category_id}&limit=10`)
            const list = relRes.data.data || relRes.data || []
            setRelatedProducts(
              (Array.isArray(list) ? list : [])
                .filter((item: productT) => String(item.id) !== String(mainProduct.id))
                .slice(0, 4)
            )
          } catch (error: any) {
            console.error('Related products error:', error)
          }
        }
      } catch (error: any) {
        console.error('Product details error:', error)
      }
    }

    getData()
  }, [id])

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  if (!product) {
    return <div className='flex justify-center items-center'>Yükleniyor...</div>
  }

  const p = product as any
  const name = p[`name_${lang}`] || p.name_tm || ''
  const description = p[`body_${lang}`] || p.body_tm || ''
  const brandName = p.brand_name as string | undefined
  const brandId = p.brand_id
  const productBrand = p.product_brand as string | undefined
  const price = Number(p.price) || 0 
  const discount = Number(p.discount) || 0
  const hasDiscount = discount > 0
  const finalPrice = price - (price / 100) * discount

  const extraImages: string[] = (p.images || [])
    .map((i: any) => (typeof i === 'string' ? i : i?.image))
    .filter(Boolean)
  const gallery: string[] = Array.from(
    new Set([p.image_big, ...extraImages].filter(Boolean) as string[])
  )
  const mainImage = selectedImage ?? gallery[0] ?? null
  const showThumbs = gallery.length > 1

  const isLiked = wishlist.some((item) => String(item?.id) === String(p.id))
  const handleAddToCart = () => {
    addToCart(product)
    setJustAdded(true)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setJustAdded(false), 1500)
  }

  return (
    <div className='px-10 container mx-auto'>
      <div className='h-full px-3 py-2 sm:px-4 md:px-5 lg:px-6'>
        <div className='h-full'>
          <div className='pt-1 sm:pt-2'>
            <div className='relative rounded border border-gray-200 bg-white shadow-sm'>
              <div className='flex flex-wrap px-3 pb-0 pt-3 sm:px-5 sm:pb-5 sm:pt-5'>
                <div className='md:w-1/3 w-full sm:w-1/2'>
                  <div className='relative overflow-hidden rounded border border-gray-200 pt-[133.34%] shadow-sm'>
                    <div className='base-lazy-image h-full w-full absolute left-0 top-0'>
                      <img className='absolute left-0 top-0 z-2 h-full w-full object-cover transition-opacity duration-200' src={toUrl(mainImage) || fen} alt={name} />
                    </div>
                    {hasDiscount && (
                      <div className='flex w-14 select-none items-center justify-center rounded-full bg-red-500 py-1 text-xs font-semibold text-white shadow-sm z-3 absolute bottom-2.5 left-2'>
                        -{discount}%
                      </div>
                    )}
                  </div>
                  {showThumbs && (
                    <div className='-mx-1 flex flex-wrap pt-1'>
                      {gallery.map((img) => (
                        <div key={img} className='w-1/5 p-1'>
                          <div
                            onClick={() => setSelectedImage(img)}
                            className='relative w-full cursor-pointer rounded border border-gray-200 pt-[133.34%] shadow-sm'
                          >
                            <div className='base-lazy-image h-full w-full absolute left-0 top-0'>
                              <img className='absolute left-0 top-0 z-2 h-full w-full object-cover transition-opacity duration-200' src={toUrl(img) || fen} alt="" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className='md:pl-6 md:pr-2 pl-1 pr-1 pt-2 sm:pt-0 md:w-2/3 w-full sm:w-1/2'>
                  <div className='h-full w-full'>
                    <div className='px-1 pb-2 pt-1 sm:px-4'>
                      <h2 className='mt-1.5 text-base font-semibold sm:mt-0 sm:text-xl md:text-2xl lg:text-2xl'>{name}</h2>
                      {brandName && (
                        <p className='pb-1.5 pt-0 text-sm font-medium text-accent-500 sm:px-[2px] sm:pt-1 sm:text-base sm:font-normal sm:text-black'>
                          <Link to={`/BrandsPage/${brandId}`} className='transition-colors duration-150 hover:text-purple-y-500'>
                            {brandName}
                          </Link>
                        </p>
                      )}
                      <div className='divide-y-2 divide-white overflow-hidden rounded-lg bg-[#f5f5f5] py-0.5 text-sm'>
                        <div className='flex px-2.5 py-1.5 leading-[1.2]'>
                          <div className='md:w-1/4 w-1/2 font-medium'>
                            Haryt kody
                          </div>
                          <div className='md:w-3/4 w-1/2 pl-2 text-right'>
                            {p.kode}
                          </div>
                        </div>
                        {productBrand && (
                          <div className='flex px-2.5 py-1.5 leading-[1.2]'>
                            <div className='md:w-1/4 w-1/2 font-medium'>
                              Brend
                            </div>
                            <div className='md:w-3/4 w-1/2 pl-2 text-right'>
                              {productBrand}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className='hidden sm:block'>
                      <div className='flex flex-wrap items-center justify-between border-b border-t border-gray-200 px-1 py-2 sm:px-4'>
                        <div className='text-xl font-bold sm:text-2xl'>
                          <div className='text-xl font-bold sm:text-2xl'>
                            <div className='relative flex flex-col items-center justify-center sm:block'>
                              <span className='mx-0.5'>{finalPrice.toFixed(2)} m.</span>
                              {hasDiscount && (
                                <span className='mx-0.5 text-sm font-semibold text-gray-400 line-through sm:translate-y-1.5 sm:text-base'>
                                  {price.toFixed(2)} m.
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='flex items-center justify-end px-4 py-3'>
                        <button
                          onClick={() => toggleLike(product)}
                          className='flex shrink-0 items-center justify-center px-1 z-2 mr-2 h-10 w-10 rounded-md border border-[#ede4ff] bg-white'
                        >
                          <svg width='24' height='24' viewBox='0 0 24 24' fill={isLiked ? '#5f2363' : 'none'}>
                            <path
                              d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'
                              stroke='#5f2363'
                              strokeWidth='2'
                            />
                          </svg>
                        </button>
                        <div className='w-30 h-10 rounded sm:w-40'>
                          <button
                            onClick={handleAddToCart}
                            className='relative flex h-full w-full items-center justify-center overflow-hidden rounded px-3 py-1 text-sm font-semibold text-white shadow bg-purple-y-500 transition-colors duration-150 hover:bg-purple-y-400'
                          >
                            <span
                              className={`absolute left-0 top-0 flex h-full w-full items-center justify-center transition-transform duration-200 ${
                                justAdded ? '-translate-y-full' : 'translate-y-0'
                              }`}
                            >
                              <span className='mr-2'>
                                <HiOutlineShoppingCart size={20} />
                              </span>
                            </span>
                            <span
                              className={`absolute left-0 top-0 flex h-full w-full items-center justify-center bg-green-500 transition-transform duration-200 ${
                                justAdded ? 'translate-y-0' : 'translate-y-full'
                              }`}
                            >
                              <HiOutlineCheck size={22} />
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className='-text whitespace-pre-line px-1 pb-4 pt-0 text-sm leading-[1.5] sm:px-4 sm:pt-2 sm:mt-2'>
                      {description}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className='mt-4 pt-4'>
          <CartContainer
            title={t('related_products', { defaultValue: 'Menzeş harytlar' })}
            data={relatedProducts}
          />
        </section>
      )}
    </div>
  )
}

export default ProductDetails