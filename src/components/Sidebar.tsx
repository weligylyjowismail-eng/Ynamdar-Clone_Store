import BrandsInput from '../pages/Brands/BrandsInput'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import BrandFilter from '../pages/Brands/BrandFilter'
import type { CategoryT } from '../types/Category'
import type { BrandT } from '../types/brands'
import PriceRangeFilter from '../pages/Brands/PriceRangeFilter'

interface SidebarProps {
  subcategories: CategoryT[]
  brands?: BrandT[]
  sortValue?: string
  onSortChange?: (value: string) => void
  onPriceSearch?: (min: number, max: number) => void
  selectedBrands?: number[]
  onBrandChange?: (ids: number[]) => void
  selectedRangeId?: string
  onRangeChange?: (id: string) => void
}

function Sidebar({
  subcategories,
  brands,
  sortValue = '0',
  onSortChange,
  onPriceSearch,
  selectedBrands = [],
  onBrandChange,
  selectedRangeId = '0',
  onRangeChange,
}: SidebarProps) {
  const { t, i18n } = useTranslation()

  return (
    <div className='lg:block hidden lg:w-1/4 h-full pb-10 py-2 relative mt-3'>
      <div className='h-screen sticky pt-5 pb-4 pl-4 bg-white border border-gray-200 rounded flex flex-col top-20 shadow-sm'>
        <div className='pr-4 overflow-x-hidden flex flex-col grow'>
          {
            subcategories.length > 0 &&
            <div className='mb-5'>
              <h2 className='font-semibold text-lg'>{t("categories_title")}</h2>
              <div className='py-1 flex flex-col'>
                <ul className='pr-1 pl-1.5 text-sm'>
                  {
                    subcategories.map((sub) => (
                      <li key={'subcategories-' + sub.id} className='py-0.5'>
                        <Link to={"/"} className='duration-100 transition-colors hover:text-orange-y'>
                          {i18n.language == 'tm' && sub.name_tm}
                          {i18n.language == 'ru' && sub.name_ru}
                          {i18n.language == 'en' && sub.name_en}
                        </Link>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
          }

          <h2 className='font-semibold text-lg'>{t("sort_title")}</h2>
          <BrandsInput
            title={t("sort_none")}
            id='0'
            name="sort_group"
            checked={sortValue === '0'}
            onChange={() => onSortChange?.('0')}
          />
          <BrandsInput
            title={t("sort_asc")}
            id='1'
            name='sort_group'
            checked={sortValue === '1'}
            onChange={() => onSortChange?.('1')}
          />
          <BrandsInput
            title={t("sort_desc")}
            id='2'
            name='sort_group'
            checked={sortValue === '2'}
            onChange={() => onSortChange?.('2')}
          />

          <BrandFilter
            brands={brands}
            selected={selectedBrands}
            onChange={(ids) => onBrandChange?.(ids)}
          />

          <PriceRangeFilter
            onSearch={(min, max) => onPriceSearch?.(min, max)}
            selectedRangeId={selectedRangeId}
            onRangeChange={(id) => onRangeChange?.(id)}
          />
        </div>
      </div>
    </div>
  )
}

export default Sidebar