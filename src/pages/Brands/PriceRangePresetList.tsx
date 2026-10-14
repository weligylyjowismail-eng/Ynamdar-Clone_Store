import BrandInput from './BrandsInput'

export interface PriceRangePreset {
  id: string
  label: string
  min: number
  max: number
}

export const PRICE_RANGE_PRESETS: PriceRangePreset[] = [
  { id: '0', label: 'Hiç hili', min: 0, max: 0 },
  { id: '1', label: '0 - 100', min: 0, max: 100 },
  { id: '2', label: '100 - 200', min: 100, max: 200 },
  { id: '3', label: '200 - 500', min: 200, max: 500 },
  { id: '4', label: '500 - 1000', min: 500, max: 1000 },
  { id: '5', label: '1000 - 2000', min: 1000, max: 2000 },
  { id: '6', label: '2000 - 10000', min: 2000, max: 10000 },
]

interface PriceRangePresetListProps {
  selectedId: string
  onSelect: (preset: PriceRangePreset) => void
}

function PriceRangePresetList({ selectedId, onSelect }: PriceRangePresetListProps) {
  return (
    <div className='flex flex-col'>
      {PRICE_RANGE_PRESETS.map((preset) => (
        <BrandInput
          key={preset.id}
          title={preset.label}
          id={preset.id}
          name="price_range_group"
          checked={selectedId === preset.id}
          onChange={() => onSelect(preset)}
        />
      ))}
    </div>
  )
}

export default PriceRangePresetList