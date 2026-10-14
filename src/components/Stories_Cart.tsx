import React, { useState } from 'react'
import { fen } from '../assets/images'

interface StoriesCartProps {
  image?: string;
  name?: string; // 1. BURAYA EKLENDİ
}

function Stories_Cart({ image = fen, name }: StoriesCartProps) { // 2. BURAYA EKLENDİ
  const [storeOpen, setStoreOpen] = useState(false)

  return (
    <div className='flex flex-col items-center gap-1'>
      <button 
        onClick={() => setStoreOpen(!storeOpen)} 
        className='w-21 h-21 rounded-full overflow-hidden text-left select-none flex-none cursor-pointer'
      >
        <span className='duration-150 h-full w-full outline-none transition-transform rounded-full block relative'>
          <span className={`shadow relative block h-full w-full rounded-full p-0.5 outline-none transition-transform duration-150 group-focus-visible:ring-2 group-focus-visible:ring-accent-500 group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-white group-active:scale-[0.98] motion-reduce:transition-none md:group-hover:scale-[1.02] bg-gray-300! ${storeOpen ? "bg-[conic-gradient(from_180deg_at_50%_50%,#a855f7_0deg,#3b82f6_70deg,#22c55e_150deg,#f59e0b_240deg,#ef4444_320deg,#a855f7_360deg)]":""}`}>
            <span className='rounded-full block overflow-hidden w-full h-full relative'>
              <img src={image} alt={name || "story"} className='w-full h-full object-contain' />
            </span>
          </span>
        </span>
      </button>

      {/* 3. İSMİN EKRANDA GÖRÜNMESİ İÇİN BURAYA EKLENDİ */}
      {name && (
        <span className='text-xs text-center truncate max-w-[80px] font-medium'>
          {name}
        </span>
      )}
    </div>
  )
}

export default Stories_Cart