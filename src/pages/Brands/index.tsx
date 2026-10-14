import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import BrandCart from './BrandCart'
import { api } from '../../api/api'
import type { BrandT } from '../../types/brands'

interface MarketCategoryT {
  id: number
  title_tm: string
  title_ru: string
}

function index() {
  const { t, i18n } = useTranslation()
  // /brands/:id  -> market kategoriýasynyň ID-si
  // /Stores/:type -> "vip" ýa-da "new"
  const { id, type } = useParams<{ id?: string; type?: string }>()
  const [aramaMetni, setAramaMetni] = useState("")
  const [data, setData] = useState<BrandT[]>([])
  const [categoryTitle, setCategoryTitle] = useState("")

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      console.log("Enter'a basıldı! Aranan:", event.currentTarget.value);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        // VIP ya da yeni markalar sayfası
        if (type === 'vip' || type === 'new') {
          setCategoryTitle(type === 'vip' ? 'VIP dükanlar' : 'Täze dükanlar')
          const flag = type === 'vip' ? 'vip=1' : 'is_new=1'
          const res = await api.get(`/brands?${flag}&limit=100&offset=0`)
          setData(res.data.data)
          return
        }

        // Market kategorisine göre marka sayfası (eskisi gibi)
        if (!id) return
        const catRes = await api.get(`/api/market-categories/${id}`)
        if (catRes.data?.success) {
          const cat: MarketCategoryT = catRes.data.data
          setCategoryTitle(i18n.language === 'ru' ? cat.title_ru : cat.title_tm)
        }
        const brandsRes = await api.get(`/brands?limit=6&offset=0&market_category_id=${id}`)
        setData(brandsRes.data.data)
      } catch (error: any) {
        alert("Error message: " + error.message)
      }
    }

    getData()
  }, [id, type, i18n.language])

  return (
    <div className='py-2 px-10 h-full container mx-auto'>
      <h2 className='font-bold text-2xl mb-1'>{categoryTitle}</h2>
      <div className="relative w-full max-w-xl py-1">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </span>

        <input
          type="text"
          placeholder={t("search_placeholder")}
          value={aramaMetni}
          onKeyDown={handleKeyDown}
          onChange={(e) => setAramaMetni(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 bg-white focus:outline-none focus:border-orange-500"
        />
      </div>

      <section className='pt-3 pb-4'>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'>
          {
            data
              .filter((brand: BrandT) =>
                brand.name.toUpperCase().includes(aramaMetni.toUpperCase())
              )
              .map((brand: BrandT) => (
                <BrandCart key={brand.id} data={brand} />
              ))
          }
        </div>
      </section>
    </div>
  )
}

export default index