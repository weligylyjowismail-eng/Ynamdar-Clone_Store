import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { api } from '../../api/api'
import { useTranslation } from 'react-i18next'
import Sidebar from '../../components/Sidebar'
import CartContainer from '../../components/CartContainer'

function Search() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''

  const [data, setData] = useState<any[]>([])
  const [len, setLen] = useState(0)
  const [subcategories, setSubcategories] = useState([])
  const { t, i18n } = useTranslation()
  const [brands, setBrands] = useState<any[]>([])
  const [selectedSubcat, setSelectedSubcat] = useState<number | null>(null)

  const [isBrandDrawerOpen, setIsBrandDrawerOpen] = useState(false)
  const [brandSearchQuery, setBrandSearchQuery] = useState('')

  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false)
  const [sortOption, setSortOption] = useState<'default' | 'asc' | 'desc'>('default')

  window.scrollTo(0, 0)

  useEffect(() => {
    const getData = async () => {
      if (!query.trim()) return
      try {
        const res = await api.get(`/search/${encodeURIComponent(query)}?limit=20&offset=0`)
        
        // Backend ver yapınıza göre data veya products kontrolü
        const rawData = res.data.data || res.data.products || (Array.isArray(res.data) ? res.data : [])
        setData(rawData)
        setLen(res.data.total || rawData.length || 0)

        if (res.data.subcategories) {
          setSubcategories(res.data.subcategories)
        }
        if (res.data.brands) {
          setBrands(res.data.brands)
        } else {
          const resBanners = await api.get("/banners")
          setBrands(resBanners.data)
        }
      } catch (error: any) {
        alert(error.message)
      }
    }

    getData()
  }, [query])

  const filteredBrands = brands.filter((brand: any) => {
    const name = brand.title || brand.name || ''
    return name.toLowerCase().includes(brandSearchQuery.toLowerCase())
  })

  const sortedData = [...data].sort((a, b) => {
    const priceA = a.price ?? a.sell_price ?? a.price_discount ?? 0
    const priceB = b.price ?? b.sell_price ?? b.price_discount ?? 0

    if (sortOption === 'asc') {
      return priceA - priceB
    }
    if (sortOption === 'desc') {
      return priceB - priceA
    }
    return 0
  })

  return (
    <>
      {/* MOBİL GÖRÜNÜM */}
      <div className='block lg:hidden px-3 pt-2 pb-2 bg-white'>
        <h1 className='text-[14px] font-bold text-gray-900 mb-2'>
          Gözleg netijesi: "{query}"
        </h1>

        <div className='border-t border-b border-gray-200 py-2 my-1 flex items-center justify-end gap-2'>
          <div className='border border-gray-300 rounded-[10px] px-3 py-1 bg-white text-center shadow-2xs flex flex-col justify-center min-w-[80px]'>
            <span className='text-[10px] font-bold text-gray-800 leading-none'>{t("total")}</span>
            <span className='text-[10px] text-gray-500 font-medium leading-tight mt-0.5'>
              {len} {t("products")}
            </span>
          </div>

          <button 
            onClick={() => setIsBrandDrawerOpen(true)}
            className='flex items-center justify-center gap-1.5 text-[12px] font-semibold text-white bg-arbat-green hover:bg-arbat-hover px-3 py-2 rounded-[10px] shadow-2xs transition-colors'
          >
            <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span className="text-white">{t("Brands")}</span>
          </button>

          <button 
            onClick={() => setIsFilterDrawerOpen(true)}
            className='flex items-center justify-center gap-1.5 text-[12px] font-semibold text-white bg-arbat-green hover:bg-arbat-hover px-3 py-2 rounded-[10px] shadow-2xs transition-colors'
          >
            <svg className="w-4 h-4 stroke-current fill-none text-white" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
            <span className="text-white">{t("filter")}</span>
          </button>
        </div>

        {subcategories && subcategories.length > 0 && (
          <div className='flex items-center gap-2 overflow-x-auto no-scrollbar py-2'>
            <button
              onClick={() => setSelectedSubcat(null)}
              className={`text-[11px] whitespace-nowrap px-3.5 py-1.5 rounded-full border transition-all ${
                selectedSubcat === null
                  ? 'bg-[#0d3b2e] text-white border-[#0d3b2e] font-medium'
                  : 'bg-white text-gray-700 border-gray-300'
              }`}
            >
              Ählisi
            </button>
            {subcategories.map((sub: any) => (
              <button
                key={sub.id}
                onClick={() => setSelectedSubcat(sub.id)}
                className={`text-[11px] whitespace-nowrap px-3.5 py-1.5 rounded-full border transition-all ${
                  selectedSubcat === sub.id
                    ? 'bg-[#0d3b2e] text-white border-[#0d3b2e] font-medium'
                    : 'bg-white text-gray-700 border-gray-300'
                }`}
              >
                {sub[`name_${i18n.language}`]}
              </button>
            ))}
          </div>
        )}

        <div className='pt-1'>
          <CartContainer title="" data={sortedData} />
        </div>
      </div>

      {/* BRENDLER DRAWER BACKDROP */}
      <div 
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 lg:hidden ${
          isBrandDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsBrandDrawerOpen(false)}
      />

      {/* BRENDLER DRAWER */}
      <div 
        className={`fixed top-0 right-0 h-full w-[80%] max-w-[320px] bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out lg:hidden ${
          isBrandDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='flex items-center justify-between px-4 py-3 border-b border-gray-100'>
          <h3 className='text-sm font-bold text-gray-800'>{t("Brands")}</h3>
          <button 
            onClick={() => setIsBrandDrawerOpen(false)}
            className='text-red-500 hover:text-red-700 text-lg font-bold leading-none p-1'
          >
            ✕
          </button>
        </div>

        <div className='p-3 border-b border-gray-100'>
          <input 
            type="text"
            placeholder={t("search")}
            value={brandSearchQuery}
            onChange={(e) => setBrandSearchQuery(e.target.value)}
            className='w-full border border-gray-300 rounded px-3 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#0d3b2e] placeholder-gray-400'
          />
        </div>

        <div className='flex-1 overflow-y-auto p-4 flex flex-col gap-3'>
          {filteredBrands && filteredBrands.length > 0 ? (
            filteredBrands.map((brand: any, index: number) => (
              <label 
                key={brand.id || index} 
                className='flex items-center gap-3 text-xs text-gray-700 cursor-pointer hover:text-gray-900 transition-colors'
              >
                <input 
                  type="checkbox" 
                  className='rounded border-gray-300 accent-[#0d3b2e] w-4 h-4'
                />
                <span className="text-gray-800">{brand.title || brand.name || brand[`name_${i18n.language}`]}</span>
              </label>
            ))
          ) : (
            <div className='text-center text-xs text-gray-400 py-6'>
              Brend tapylmady
            </div>
          )}
        </div>
      </div>

      {/* SÜZGÜÇ/TERTİP DRAWER BACKDROP */}
      <div 
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 lg:hidden ${
          isFilterDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsFilterDrawerOpen(false)}
      />

      {/* SÜZGÜÇ/TERTİP DRAWER */}
      <div 
        className={`fixed top-0 right-0 h-full w-[80%] max-w-[320px] bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out lg:hidden ${
          isFilterDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='flex items-center justify-between px-4 py-3 border-b border-gray-100'>
          <h3 className='text-sm font-bold text-gray-800'>Tertip</h3>
          <button 
            onClick={() => setIsFilterDrawerOpen(false)}
            className='text-red-500 hover:text-red-700 text-lg font-bold leading-none p-1'
          >
            ✕
          </button>
        </div>

        <div className='p-4 flex flex-col gap-4'>
          <label className='flex items-center gap-3 text-xs text-gray-700 cursor-pointer hover:text-gray-900 transition-colors'>
            <input 
              type="radio" 
              name="sort"
              checked={sortOption === 'default'}
              onChange={() => {
                setSortOption('default')
                setIsFilterDrawerOpen(false)
              }}
              className='accent-[#0d3b2e] w-4 h-4'
            />
            <span className="text-gray-800">{t("defaultSort")}</span>
          </label>

          <label className='flex items-center gap-3 text-xs text-gray-700 cursor-pointer hover:text-gray-900 transition-colors'>
            <input 
              type="radio" 
              name="sort"
              checked={sortOption === 'asc'}
              onChange={() => {
                setSortOption('asc')
                setIsFilterDrawerOpen(false)
              }}
              className='accent-[#0d3b2e] w-4 h-4'
            />
            <span className="text-gray-800">{t("priceAsc")}</span>
          </label>

          <label className='flex items-center gap-3 text-xs text-gray-700 cursor-pointer hover:text-gray-900 transition-colors'>
            <input 
              type="radio" 
              name="sort"
              checked={sortOption === 'desc'}
              onChange={() => {
                setSortOption('desc')
                setIsFilterDrawerOpen(false)
              }}
              className='accent-[#0d3b2e] w-4 h-4'
            />
            <span className="text-gray-800">{t("priceDesc")}</span>
          </label>
        </div>
      </div>      
      <div className='hidden lg:block px-10 mx-auto container'>
        <section className='pt-4 pb-2'>
          <h1 className='lg:text-2xl lg:font-bold text-gray-900'>
            Gözleg netijesi: "{query}"
          </h1>
          <h6 className='text-sm text-gray-600 pl-2'>
            jemi: 
            <span className='font-medium mx-1 text-gray-800'>
              {len}
            </span>
            haritlar
          </h6>
        </section>
        <section className='h-full flex pt-1'>
          <Sidebar subcategories={subcategories} brands={brands}/>
          <div className='lg:w-3/4 w-full p-2'>
            <CartContainer title="" data={sortedData} />
          </div>
        </section>
      </div>
    </>
  )
}

export default Search