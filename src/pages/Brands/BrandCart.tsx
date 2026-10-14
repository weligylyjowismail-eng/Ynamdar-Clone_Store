import { Link } from 'react-router-dom'
import type { BrandT } from '../../types/brands'

function BrandCart({ data }: {data:BrandT}) {
  return (
    <div className='h-full'>
      <Link to={`/BrandsPage/${data.id}`} className='pb-3 p-4 bg-white h-full border-gray-200 rounded shadow-sm flex flex-col items-center'>
        <div className='mb-3'>
          <img className='object-contain' src={import.meta.env.VITE_API + data.image} alt="" />
        </div>
        <div className='border-t border-gray-200 my-2 w-full'>
          <h4 className='text-center text-blue-900 font-semibold text-base'>{data.name}</h4>
        </div>
      </Link>
    </div>
  )
}

export default BrandCart