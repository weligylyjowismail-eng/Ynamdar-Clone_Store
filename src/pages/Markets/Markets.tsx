import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import { Market_Cartfoto } from '../../assets/images'
const API_BASE_URL = 'http://localhost:5000'
export interface MarketCategory {
  id: number
  title_tm: string
  title_ru: string
  image?: string | null
  order_number?: number
}
function resolveImageUrl(image?: string | null): string {
  if (!image) return Market_Cartfoto
  if (image.startsWith('http://') || image.startsWith('https://')) return image
  return `${API_BASE_URL}${image}`
}
export function MarketCard({ data }: { data: MarketCategory }) {
  const { i18n } = useTranslation()
  const title = i18n.language === 'ru' ? data.title_ru : data.title_tm

  return (
    <div className='w-1/2 p-1 sm:w-1/3 md:w-1/4 lg:w-1/5 lg:p-2'>
      <Link
        className='z-1 relative flex h-full flex-col overflow-hidden rounded-lg border-2 border-white bg-white shadow-sm md:rounded-xl md:shadow'
        to={`/brands/${data.id}`}
      >
        <div className='z-1 relative flex-shrink-0 bg-gray-100'>
          <div className='z-1 relative pt-[50%]'>
            <div className='h-full w-full absolute left-0 top-0'>
              <img
                className='absolute left-0 top-0 z-2 h-full w-full object-contain transition-opacity duration-200'
                src={resolveImageUrl(data.image)}
                alt={title}
                onError={(e) => {
                  e.currentTarget.src = Market_Cartfoto
                }}
              />
            </div>
          </div>
        </div>
        <div className='flex h-14 flex-grow items-center justify-center px-2 py-2 sm:h-16'>
          <h4 className='text-center text-xs font-semibold text-purple-y-500 sm:text-sm'>
            {title}
          </h4>
        </div>
      </Link>
    </div>
  )
}
function Markets({ search = '' }: { search?: string }) {
  const [categories, setCategories] = useState<MarketCategory[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    axios
      .get(`${API_BASE_URL}/api/market-categories`)
      .then((res) => {
        if (!isMounted) return
        if (res.data && res.data.success) {
          setCategories(res.data.data)
        } else {
          setError('Kategoriýalar tapylmady')
        }
      })
      .catch((err) => {
        if (!isMounted) return
        console.error('Market kategorileri çekilirken hata oluştu:', err)
        setError('Kategoriýalary ýüklemekde ýalňyşlyk ýüze çykdy')
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  if (loading) {
    return <div className="p-4 text-center">Yükleniyor...</div>
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>
  }

  if (categories.length === 0) {
    return <div className="p-4 text-center text-gray-400">Kategoriýa tapylmady</div>
  }

  const filteredCategories = categories.filter((item) => {
    const title = item.title_tm + ' ' + item.title_ru
    return title.toLowerCase().includes(search.toLowerCase())
  })

  if (filteredCategories.length === 0) {
    return <div className="p-4 text-center text-gray-400">Gözlege gabat gelýän kategoriýa tapylmady</div>
  }

  return (
    <div className="flex flex-wrap">
      {filteredCategories.map((item) => (
        <MarketCard key={item.id} data={item} />
      ))}
    </div>
  )
}

export default Markets