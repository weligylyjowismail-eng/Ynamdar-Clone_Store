import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../../api/api'
import { useTranslation } from 'react-i18next'
import Sidebar from '../../components/Sidebar'
import CartContainer from '../../components/CartContainer'

function index() {
  const { id } = useParams()
  const { i18n } = useTranslation()
  const [data, setData] = useState([])
  const [len, setLen] = useState(0)
  const [category, setCategory] = useState<any>(null)
  const [subcategories, setSubcategories] = useState([])
  const [brands, setBrands] = useState([])
  const [sort, setSort] = useState('0')
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(0)
  const [rangeId, setRangeId] = useState('0')
  const [selectedBrands, setSelectedBrands] = useState<number[]>([])

  useEffect(() => {
    window.scrollTo(0, 0)
    setSort('0')
    setMinPrice(0)
    setMaxPrice(0)
    setRangeId('0')
    setSelectedBrands([])
  }, [id])

  useEffect(() => {
    const getStatic = async () => {
      try {
        const res2 = await api.get(`/categories/${id}`)
        setCategory(res2.data)
        const res3 = await api.get(`/categories/${id}/subcategories/`)
        setSubcategories(res3.data)
        const res4 = await api.get(`/products/by-category/${id}/brands`)
        setBrands(res4.data)
      } catch (error: any) {
        console.error('Category page error:', error)
      }
    }
    getStatic()
  }, [id])
  useEffect(() => {
    const getProducts = async () => {
      try {
        const params = new URLSearchParams({ limit: '20', offset: '0' })
        if (sort === '1') params.set('sort', 'price_asc')
        if (sort === '2') params.set('sort', 'price_desc')
        if (minPrice > 0) params.set('min_price', String(minPrice))
        if (maxPrice > 0) params.set('max_price', String(maxPrice))
        if (selectedBrands.length > 0) params.set('brand_ids', selectedBrands.join(','))

        const res = await api.get(`/products/by-category/${id}?${params.toString()}`)
        setData(res.data.data)
        setLen(res.data.total)
      } catch (error: any) {
        console.error('Products error:', error)
      }
    }
    getProducts()
  }, [id, sort, minPrice, maxPrice, selectedBrands])

  return (
    <div className='px-10 mx-auto container'>
      <section className='pt-4 pb-2'>
        <h1 className='lg:text-2xl lg:font-bold'>{category && category[`name_${i18n.language}`]}</h1>
        <h6 className='text-sm text-gray-600 pl-2'>
          jemi:
          <span className='font-medium mx-1'>
            {len}
          </span>
          haritlar
        </h6>
      </section>
      <section className='h-full flex pt-1'>
        <Sidebar
          subcategories={subcategories}
          brands={brands}
          sortValue={sort}
          onSortChange={setSort}
          onPriceSearch={(min, max) => {
            setMinPrice(min)
            setMaxPrice(max)
          }}
          selectedBrands={selectedBrands}
          onBrandChange={setSelectedBrands}
          selectedRangeId={rangeId}
          onRangeChange={setRangeId}
        />
        <div className='lg:w-3/4 w-full p-2'>
          <CartContainer title="" data={data} />
        </div>
      </section>
    </div>
  )
}

export default index