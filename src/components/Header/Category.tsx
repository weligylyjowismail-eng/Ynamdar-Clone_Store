import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TfiViewGrid } from 'react-icons/tfi'
import { Link } from 'react-router-dom'
import { api } from '../../api/api'

type Category = {
  id: number
  image: string
  name_tm: string
  name_ru: string
  name_en: string
  parent_id: null | number
  children: Category[]
}

type Categories = Category[]

function Category() {
  const { t, i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const [data, setData] = useState<Categories>([])

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await api.get("/categories")
        setData(res.data)
      } catch (error: any) {
        alert(error.message)
      }
    }

    getData()
  }, [])

  return (
    <div className='h-full lg:block hidden'>
      <div className="flex items-center h-full">
        <button onClick={() => setOpen(!open)} className='text-gray-600 py-1 px-3.5 rounded-lg items-center hover:bg-gray-y duration-150 cursor-pointer flex '><span className="mr-1"><TfiViewGrid /></span>{t("categories")}<span></span></button>
      </div>
      <div onClick={() => setOpen(false)} className={'absolute top-12 left-0 h-screen w-full backdrop-blur z-10 transition-all ' + (open ? "visible opacity-100" : "invisible opacity-0")}>
        <div className='min-h-[80vh] w-full container mx-auto px-10'>
          <div onClick={(e) => e.stopPropagation()} className='bg-white w-full h-full shadow-sm'>
            <div className='flex h-full w-full'>
              <div className='min-w-70 py-6 px-4'>
                <div className='w-full h-full overflow-y-auto'>
                  <div className='flex flex-col'>
                    {
                      data.map((category, index) => (
                        <div key={"category-" + index} className='flex py-1'>
                          <Link onClick={() => setOpen(false)} to={"category/" + category.id} onMouseEnter={() => setActive(index)} className={'text-[#361537] text-sm border border-gray-y bg-white pr-4 pl-2.5 py-1.5 w-full ' + (active == index && "bg-gray-y! text-purple-y-500")}>
                            <span className='flex items-center gap-3 max-w-fit'><img className='w-5 h-5 rounded-lg' src={import.meta.env.VITE_API + category.image} alt="" />{category[`name_${i18n.language}` as keyof typeof Category]}</span>
                          </Link>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
              {
                data.length && (
                  <div className='w-[80%] text-[#361537] px-4 py-6 overflow-auto h-[calc(100vh-120px)]'>
                    <div className='w-full h-full flex flex-col'>
                      <Link onClick={() => setOpen(false)} to={"category/" + data[active].id} className='text-2xl mr-auto font-semibold hover:text-purple-y-500'>{data[active][`name_${i18n.language}` as keyof typeof Category]}</Link>
                      <div className='flex w-full grow pt-6 overflow-hidden flex-col'>
                        <div className='overflow-y-auto w-full grow'>
                          {/* Eski columns-2 olan yeri flex yapıyoruz */}
                          <div className='overflow-y-auto columns-2'>
                            {
                              data[active].children.map((subcategory, index) => (
                                <div key={"subcategory-" + index} className='w-full p-2 inline-block'>
                                  <Link onClick={() => setOpen(false)} to={"category/" + subcategory.id} className='transition-colors font-medium text-base hover:text-purple-y-500'>
                                    {subcategory[`name_${i18n.language}` as keyof typeof Category]}
                                  </Link>
                                  <div className='mt-1 pl-2 font-light text-sm'>
                                    <ul className=''>
                                      {
                                        subcategory.children.map((subsubcategory, index2) => (
                                          <li className='leading-[1.6]' key={'subsubcategory-' + index2}>
                                            <Link onClick={() => setOpen(false)} to={"category/" + subsubcategory.id} className='transition-colors hover:text-orange-y'>
                                              {subsubcategory[`name_${i18n.language}` as keyof typeof Category]}
                                            </Link>
                                          </li>
                                        ))
                                      }
                                    </ul>
                                  </div>
                                </div>
                              ))
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Category