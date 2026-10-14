import { t } from 'i18next'
import React, { useState } from 'react'
import { Market } from '../../assets/images'
import Markets from './Markets'

function MarketCategories() {
  const [aramaMetni, setAramaMetni] = useState("")
  return (
    <div className='mx-auto px-10 container'>
      <div className='lg:pt-2'>
        <div className="relative w-full max-w-xl ml-3">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
          <input
            type="text"
            placeholder={t("search_placeholder")}
            value={aramaMetni}
            onChange={(e) => setAramaMetni(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 bg-white focus:outline-none"
          />
        </div>
        <section className='pb-1 pt-1 lg:pb-2 lg:pt-2'>
          <Markets search={aramaMetni} />
        </section>
      </div>
    </div>
  )
}

export default MarketCategories