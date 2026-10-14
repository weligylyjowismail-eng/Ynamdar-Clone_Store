import { Link, useParams } from 'react-router-dom'
import CartContainer from '../../components/CartContainer'
import Banner from './components/Banner'
import { androidweioslogo } from '../../assets/images'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { api } from '../../api/api'
import type { bannerT } from '../../types/banner'
import type { CategoryT } from '../../types/Category'
import Stories from '../../components/Stories'
import VipBrandsContainer from '../Brands/VipBrandsContainer'

function index() {
  const { id } = useParams()
  const { t } = useTranslation()
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const [data, setData] = useState([])
  const [bannerData, setBannerData] = useState<bannerT[]>([])
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await api.get(`/categories/homepage`)
        const res2 = await api.get(`/banners`)
        console.log(res.data)
        setData(res.data)
        setBannerData(res2.data)
      } catch (error: any) {
        alert(error.message)
      }
    }

    getData()
  }, [id])
  return (
    <div className='container mx-auto px-10'>
      <Stories />
      <Banner data={bannerData} />
      <Link to={"#"} className='lg:hidden'>
        <section className='shadow-sm p-2 bg-[#5f236333] rounded mt-6 flex justify-center items-center'>
          <img src={androidweioslogo} alt="" className='w-15 mr-1' />
          <span className='font-semibold text-sm'>Mobile programmany al</span>
        </section>
      </Link>
<VipBrandsContainer title="VIP dükanlar" endpoint="/brands?vip=1" to="/collections/vip" />
<VipBrandsContainer title="Täze dükanlar" endpoint="/brands?is_new=1" variant="new" to="/collections/new" />
      {
        data.map((category: CategoryT) => {
          if (category.products && category.products?.length > 0) return (<CartContainer key={"home-page-category-products-" + category.id} data={category.products} title={(category?.[`name_${currentLang}` as keyof CategoryT] as string) || "Ýüklenýär"} link={category.id} Style="py-4 mt-2" />)
        })
      }
    </div>
  )
}

export default index