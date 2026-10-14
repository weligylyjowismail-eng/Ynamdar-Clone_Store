import { useRef, useState } from 'react'
import { tm, ru, en } from '../../assets/images'
import OutClick from '../OutClick'
import i18n from 'i18next'
import { t } from 'i18next'

function Language() {
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement | null>(null)
    const changeLang = (lang:string)=>{
        i18n.changeLanguage(lang)
        // lang localstorage yazdyrmaly
        localStorage.setItem("lang" ,lang)
    }

    return (
        <OutClick ref={ref} callback={() => setOpen(false)}>
            <div ref={ref} className='relative lg:block hidden z-10'>
                <button onClick={() => setOpen(!open)} className='text-gray-600 py-1 px-3.5 rounded-lg items-center hover:bg-gray-y cursor-pointer'>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" className="text-gray-500" />
                        <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="2" className="text-gray-500" />
                        <ellipse cx="12" cy="12" rx="4" ry="10" stroke="currentColor" strokeWidth="2" className="text-gray-500" />
                    </svg>
                </button>
                <div className={'absolute left-0 z-2 shadow-lg font-lightm text-sm py-1 px-1.5 bg-white transition-all ' + (open ? "visible opcity-100" : "invisible opacity-0")}>
                    <div>
                        <button onClick={()=>{changeLang("tm");setOpen(false)}} className='text-gray-600 py-1 px-3.5 rounded items-center hover:bg-gray-y cursor-pointer flex w-full'><span><img className='min-w-5 max-w-5' src={tm} alt="" /></span><span className='ml-2 w-max'>Türkmen dili</span></button>
                    </div>
                    <div className='border-y border-gray-200'>
                        <button onClick={()=>{changeLang("ru");setOpen(false)}} className='text-gray-600 py-1 px-3.5 rounded items-center hover:bg-gray-y cursor-pointer flex w-full'><span><img className='min-w-5 max-w-5' src={ru} alt="" /></span><span className='ml-2 w-max'>Русский</span></button>
                    </div>
                    <div>
                        <button onClick={()=>{changeLang("en"); setOpen(false)}} className='text-gray-600 py-1 px-3.5 rounded items-center hover:bg-gray-y cursor-pointer flex w-full'><span><img className='min-w-5 max-w-5' src={en} alt="" /></span><span className='ml-2 w-max'>English</span> </button>
                    </div>
                </div>
            </div>
        </OutClick>
    )
}

export default Language