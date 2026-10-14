import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiSearch } from 'react-icons/fi'
import PriceRangePresetList, { type PriceRangePreset } from './PriceRangePresetList'

interface PriceRangeFilterProps {
  onSearch: (min: number, max: number) => void
  selectedRangeId?: string
  onRangeChange?: (id: string) => void
}

function PriceRangeFilter({ onSearch, selectedRangeId = '0', onRangeChange }: PriceRangeFilterProps) {
  const { t } = useTranslation()
  const [minPrice, setMinPrice] = useState<string>('0')
  const [maxPrice, setMaxPrice] = useState<string>('0')

  const handleSearch = () => {
    onRangeChange?.('')
    onSearch(Number(minPrice) || 0, Number(maxPrice) || 0)
  }

  const handlePresetSelect = (preset: PriceRangePreset) => {
    setMinPrice(String(preset.min))
    setMaxPrice(String(preset.max))
    onRangeChange?.(preset.id)
    onSearch(preset.min, preset.max)
  }

  return (
    <div className='mb-5'>
      <h2 className='font-semibold text-lg mb-2'>{t("price_range_title")}</h2>
      <div className='flex items-end gap-2 mb-3'>
        <div className='flex flex-col'>
          <label className='text-xs text-gray-500 mb-1'>{t("min_price")}</label>
          <input
            type="number"
            min={0}
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className='w-20 border border-gray-200 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-orange-500'
          />
        </div>
        <span className='pb-2 text-gray-400'>-</span>
        <div className='flex flex-col'>
          <label className='text-xs text-gray-500 mb-1'>{t("max_price")}</label>
          <input
            type="number"
            min={0}
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className='w-20 border border-gray-200 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-orange-500'
          />
        </div>
        <button
          onClick={handleSearch}
          className='flex items-center justify-center h-9 w-9 rounded bg-purple-y-500 text-white hover:bg-purple-y-600 transition-colors'
        >
          <FiSearch className="w-4 h-4" />
        </button>
      </div>

      <PriceRangePresetList selectedId={selectedRangeId} onSelect={handlePresetSelect} />
    </div>
  )
}

export default PriceRangeFilter