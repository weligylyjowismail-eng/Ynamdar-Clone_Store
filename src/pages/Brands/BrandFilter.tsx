import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface BrandFilterProps {
  brands?: { id: number; name: string }[]
  selected?: number[]
  onChange?: (ids: number[]) => void
}

function BrandFilter({ brands, selected = [], onChange }: BrandFilterProps) {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')

  if (!brands || brands.length === 0) return null

  const filtered = brands.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  )

  const toggle = (brandId: number) => {
    if (selected.includes(brandId)) {
      onChange?.(selected.filter((i) => i !== brandId))
    } else {
      onChange?.([...selected, brandId])
    }
  }

  return (
    <div className='mt-5'>
      <h2 className='font-semibold text-lg'>{t('brands_title', { defaultValue: 'Brands' })}</h2>
      <input
        type='text'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={t('search', { defaultValue: 'Search' })}
        className='my-2 w-full rounded border border-gray-300 px-2 py-1.5 text-sm outline-none focus:border-purple-y-500'
      />
      <div className='max-h-48 overflow-y-auto'>
        {filtered.map((b) => (
          <label key={b.id} className='flex cursor-pointer items-center gap-2 py-0.5 text-sm'>
            <input
              type='checkbox'
              checked={selected.includes(b.id)}
              onChange={() => toggle(b.id)}
            />
            <span>{b.name}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

export default BrandFilter