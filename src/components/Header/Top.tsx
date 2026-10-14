import { useState } from 'react'
import { Food, Market, Store } from '../../assets/images'
import { Link } from 'react-router-dom'
import Popup from '../Popup'
import { t } from 'i18next'
import { useTranslation } from 'react-i18next'


function Top() {
    const [active, setActive] = useState(1)
    const [active_location, setActive_Location] = useState(0)
    const [open, setOpen] = useState(false)
    const {t} = useTranslation()

    return (
        <div className='bg-[#5f2363]'>
            <div className='container mx-auto px-10 pt-2 pb-1.5 flex justify-between'>
                <div className='flex gap-2'>
                    <Link to={"/Market"} className={'w-28 relative bg-white pt-2 px-3.5 pb-1.5 ' + (active === 0 ? "rounded-t-lg" : "rounded-lg")} onClick={() => setActive(0)}>
                        <img src={Market} alt="" />
                        {
                            active === 0 && <>
                                <div className='w-32 h-1.5 absolute -bottom-1.5 -left-2 bg-white'></div>
                                <div className='h-full w-2 bg-[#5f2363] absolute -left-2 top-1.5 rounded-br-lg'></div>
                                <div className='h-full w-2 bg-[#5f2363] absolute -right-2 top-1.5 rounded-bl-lg'></div>
                            </>
                        }
                    </Link>
                    <Link to={"/"} className={'w-20 relative bg-white pt-2 px-3.5 pb-1.5 ' + (active === 1 ? "rounded-t-lg" : "rounded-lg")} onClick={() => setActive(1)}>
                        <img src={Store} alt="" />
                        {
                            active === 1 && <>
                                <div className='w-24 h-1.5 absolute -bottom-1.5 -left-2 bg-white'></div>
                                <div className='h-full w-2 bg-[#5f2363] absolute -left-2 top-1.5 rounded-br-lg'></div>
                                <div className='h-full w-2 bg-[#5f2363] absolute -right-2 top-1.5 rounded-bl-lg'></div>
                            </>
                        }
                    </Link>
                    <Link to={"/food"} className={'w-18 relative bg-white pt-2 px-3.5 pb-1.5 ' + (active === 2 ? "rounded-t-lg" : "rounded-lg")} onClick={() => setActive(2)}>
                        <img src={Food} alt="" />
                        {
                            active === 2 && <>
                                <div className='w-22 h-1.5 absolute -bottom-1.5 -left-2 bg-white'></div>
                                <div className='h-full w-2 bg-[#5f2363] absolute -left-2 top-1.5 rounded-br-lg'></div>
                                <div className='h-full w-2 bg-[#5f2363] absolute -right-2 top-1.5 rounded-bl-lg'></div>
                            </>
                        }
                    </Link>
                </div>
                <div className='lg:block hidden'>
                    <button className='bg-[#0003] text-white pl-4 pr-5 h-full cursor-pointer rounded-lg font-bold hover:bg-[#0000004d]' onClick={() => setOpen(true)}>{t(active_location === 0 ? "location" : `location${active_location + 1}`)}</button>
                </div>
            </div>

            <Popup open={open} setOpen={setOpen}>
                <div className='py-4 px-3 bg-white h-auto '>
                    <h1 className='text-lg text-purple-y-500 text-center mb-2'>{t("select_city")}</h1>
                    <div className='flex flex-col w-[280px]'>
                        <div className='py-1 w-full'>
                            <Link 
                                onClick={() => {
                                    setActive_Location(0)
                                    setOpen(false)
                                }} 
                                className={`duration-150 py-2.5 px-4 hover:bg-[#5f236326] ${active_location === 0 ? "bg-[#5f23631a]" : "bg-white"} rounded-lg items-center cursor-pointer w-full flex`} 
                                to={"#"}
                            >
                                <span className='mr-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                                        <circle cx="12" cy="10" r="3"></circle>
                                    </svg>
                                </span>
                                <span>{t("location")}</span>
                            </Link>
                        </div>
                        <div className='py-1 w-full'>
                            <Link 
                                onClick={() =>{
                                    setActive_Location(1)
                                    setOpen(false)
                                }} 
                                className={`duration-150 py-2.5 px-4 hover:bg-[#5f236326] ${active_location === 1 ? "bg-[#5f23631a]" : "bg-white"} rounded-lg items-center cursor-pointer w-full flex`} 
                                to={"#"}
                            >
                                <span className='mr-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                                        <circle cx="12" cy="10" r="3"></circle>
                                    </svg>
                                </span>
                                <span>{t("location2")}</span>
                            </Link>
                        </div>
                        <div className='py-1 w-full'>
                            <Link 
                                onClick={() => {
                                    setActive_Location(2)
                                    setOpen(false)
                                }} 
                                className={`duration-150 py-2.5 px-4 hover:bg-[#5f236326] ${active_location === 2 ? "bg-[#5f23631a]" : "bg-white"} rounded-lg items-center cursor-pointer w-full flex`} 
                                to={"#"}
                            >
                                <span className='mr-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                                        <circle cx="12" cy="10" r="3"></circle>
                                    </svg>
                                </span>
                                <span>{t("location3")}</span>
                            </Link>
                        </div>
                        <div className='py-1 w-full'>
                            <Link 
                                onClick={() => {
                                    setActive_Location(3)
                                    setOpen(false)
                                }} 
                                className={`duration-150 py-2.5 px-4 hover:bg-[#5f236326] ${active_location === 3 ? "bg-[#5f23631a]" : "bg-white"} rounded-lg items-center cursor-pointer w-full flex`} 
                                to={"#"}
                            >
                                <span className='mr-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                                        <circle cx="12" cy="10" r="3"></circle>
                                    </svg>
                                </span>
                                <span>{t("location4")}</span>
                            </Link>
                        </div>
                        <div className='py-1 w-full'>
                            <Link 
                                onClick={() => {
                                    setActive_Location(4)
                                    setOpen(false)
                                }} 
                                className={`duration-150 py-2.5 px-4 hover:bg-[#5f236326] ${active_location === 4 ? "bg-[#5f23631a]" : "bg-white"} rounded-lg items-center cursor-pointer w-full flex`} 
                                to={"#"}
                            >
                                <span className='mr-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                                        <circle cx="12" cy="10" r="3"></circle>
                                    </svg>
                                </span>
                                <span>{t("location5")}</span>
                            </Link>
                        </div>
                        <div className='py-1 w-full'>
                            <Link 
                                onClick={() => {
                                    setActive_Location(5)
                                    setOpen(false)
                                }} 
                                className={`duration-150 py-2.5 px-4 hover:bg-[#5f236326] ${active_location === 5 ? "bg-[#5f23631a]" : "bg-white"} rounded-lg items-center cursor-pointer w-full flex`} 
                                to={"#"}
                            >
                                <span className='mr-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                                        <circle cx="12" cy="10" r="3"></circle>
                                    </svg>
                                </span>
                                <span>{t("location6")}</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </Popup>
        </div>
    )
}

export default Top