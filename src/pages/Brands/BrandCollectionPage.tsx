import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../../api/api'
import BrandCart from '../Brands/BrandCart'
import type { BrandT } from '../../types/brands'

function BrandCollectionPage() {
  const { type } = useParams<{ type: string }>()
  const [brands, setBrands] = useState<BrandT[]>([])

  const isVip = type === 'vip'
  const title = isVip ? 'VIP dükanlar' : 'Täze dükanlar'

  useEffect(() => {
    window.scrollTo(0, 0)

    const getData = async () => {
      try {
        const flag = isVip ? 'vip=1' : 'is_new=1'
        const res = await api.get(`/brands?${flag}&limit=100&offset=0`)
        const list = res.data.data || res.data
        setBrands(Array.isArray(list) ? list : [])
      } catch (error: any) {
        console.error('Brand collection error:', error)
        setBrands([])
      }
    }

    getData()
  }, [type])

  return (
    <div className='container mx-auto px-10'>
      <div className='pt-3 sm:pt-4'>
        <h2 className='text-base font-medium sm:text-lg md:text-xl lg:text-2xl lg:font-bold mb-1'>
          {title}
        </h2>
        <section>
          <div className='-mx-0.5 flex flex-wrap md:-mx-1 lg:-mx-2'>
            {brands.map((b) => (
              <div key={b.id} className='sm:w-1/4 w-1/3 p-1 md:w-1/5 lg:p-2 xl:w-1/6 shrink-0'>
                <BrandCart data={b} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default BrandCollectionPage