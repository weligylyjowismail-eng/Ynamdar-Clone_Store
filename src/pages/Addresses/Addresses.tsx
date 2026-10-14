import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Popup from '../../components/Popup'

function Addresses() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [Telefon, setTelefon] = useState("+993")
  const [name, setName] = useState("")
  const [Address_name, setAddress_name] = useState("")
  const [location, setLocation] = useState("")
  return (
    <div className='mx-auto px-10 container'>
      <div className='py-2 h-full'>
        <div className='lg:pb-2 sm:pt-4 flex flex-col h-full'>
          <div className='flex w-full lg:mb-3 mb-2'>
            <h2 className='font-bold text-2xl mb-3'>{t("address-title")}</h2>
            <div className='ml-auto flex'>
              <button onClick={() => setOpen(true)} className='ml-2 flex items-center rounded bg-white bg-opacity-80 px-3 py-0.5 text-sm text-orange-y shadow transition-colors duration-150 hover:bg-opacity-100 active:bg-gray-100'>
                <span className='mr-2 w-3.5 text-lg'>+</span>
                <span>{t("add-address")}</span>
              </button>
              <Popup open={open} setOpen={setOpen}>
                <div className='shadow-lg outline-none w-100 bg-white rounded h-auto relative z-999'>
                  <button
                    type="button"
                    onClick={()=>setOpen(false)}
                    className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white transition-colors duration-200 hover:bg-red-400 active:bg-red-600 cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3" // Görseldeki o kalın çarpı için değer 3 olmalı
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-3 w-3" // SVG'nin buton içindeki boyutu
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                  <div className='p-4'>
                    <h2 className='mb-2 font-medium text-xl'>{t("add-address")}</h2>
                    <div className='py-1'>
                      <div className="border border-gray-300 rounded-md p-2 mt-4 focus-within:border-blue-400 relative">
                        <div className='absolute -translate-y-1/2 top-0 left-3 bg-white overflow-hidden rounded'>
                          <label className="text-xs text-gray-400 block">{t("address-name")}</label>
                        </div>
                        <input type="text" className="w-full outline-none text-sm" value={Address_name} onChange={(e) => setAddress_name(e.target.value)} />
                      </div>
                    </div>
                    <div className='py-1'>
                      <div className="border border-gray-300 rounded-md p-2 mt-4 focus-within:border-blue-400 relative">
                        <div className='absolute -translate-y-1/2 top-0 left-3 bg-white overflow-hidden rounded'>
                          <label className="text-xs text-gray-400 block">{t("first_name")}</label>
                        </div>
                        <input type="text" className="w-full outline-none text-sm" value={name} onChange={(e) => setName(e.target.value)} />
                      </div>
                    </div>
                    <div className='py-1'>
                      <div className="border border-gray-300 rounded-md p-2 mt-4 focus-within:border-blue-400 relative">
                        <div className='absolute -translate-y-1/2 top-0 left-3 bg-white overflow-hidden rounded'>
                          <label className="text-xs text-gray-400 block">{t("phone_label")}</label>
                        </div>
                        <input type="text" className="w-full outline-none text-sm" value={Telefon} onChange={(e) => setTelefon(e.target.value)} />
                      </div>
                    </div>
                    <div className='py-1'>
                      <div className="border border-gray-300 rounded-md p-2 mt-4 focus-within:border-blue-400 relative">
                        <div className='absolute -translate-y-1/2 top-0 left-3 bg-white overflow-hidden rounded'>
                          <label className="text-xs text-gray-400 block">{t("address-full")}</label>
                        </div>
                        <input type="text" className="w-full outline-none text-sm" />
                      </div>
                    </div>
                    <div className='py-1'>
                      <div className="border border-gray-300 rounded-md p-2 mt-4 focus-within:border-blue-400 relative">
                        <div className='absolute -translate-y-1/2 top-0 left-3 bg-white overflow-hidden rounded'>
                          <label className="text-xs text-gray-400 block">{t("address-extra")}</label>
                        </div>
                        <input type="text" className="w-full outline-none text-sm" />
                      </div>
                    </div>
                    <div className='py-1'>
                      <div className='p-1'>
                        <button className='font-semibold duration-200 text-white py-1 px-3 rounded bg-[#4bb543] w-full h-11 cursor-pointer hover:bg-[#7ed26f]'>{t("address-save")}</button>
                      </div>
                    </div>
                  </div>
                </div>
              </Popup>
            </div>
          </div>
          <div className='bg-white md:h-60 h-30 flex justify-center items-center shadow-sm p-2 border border-gray-200 rounded flex-wrap grow'>
            <div className='flex justify-center items-center'>
              <h2 className='font-bold text-xl'>{t("no-address")}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Addresses