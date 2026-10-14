import React, { useEffect, useRef, useState } from 'react'
import { HiOutlineKey, HiOutlineUser } from 'react-icons/hi'
import OutClick from '../OutClick'
import { useAuthStore } from '../../store/Store'
import { api } from '../../api/api'
import { Link } from 'react-router-dom'
import Popup from '../Popup'
import { useTranslation } from 'react-i18next'
import Profil_cart from './Profil_cart'
import { IoSaveOutline } from 'react-icons/io5'

function Profil() {
    const { user } = useAuthStore();
    const [open, setOpen] = useState(false)
    const [info, setInfo] = useState(false)
    const [info1, setInfo1] = useState(false)
    const [Telefon, setTelefon] = useState("+993")
    const [username, setUsername] = useState("")
    const [location, setLocation] = useState("")
    const [date, setDate] = useState("")
    const { t } = useTranslation()
    useEffect(() => {
    if (user) {
        setTelefon(user.phone || "");
        setUsername(user.first_name || user.username || "");}
}, [user]);
    const logout = useAuthStore((state) => state.logout)

    const ref = useRef<HTMLDivElement | null>(null)
    const handleLogout = () => {
        logout()
    }
    return (
        <OutClick ref={ref} callback={() => setOpen(false)}>
            <div ref={ref} className='relative'>
                <button onClick={() => setOpen(!open)} className='text-gray-600 py-1 px-3.5 rounded-lg items-center hover:bg-gray-y cursor-pointer flex'>
                    <span className='ml-2'><HiOutlineUser /></span><span>Hasabym</span>
                </button>
                <div className={'absolute left-0 z-10 shadow-lg font-lightm text-sm py-1 px-1.5 bg-white transition-all ' + (open ? "visible opcity-100" : "invisible opacity-0")}>
                    <div>
                        <Link to={"/Addresses"} className='text-gray-600 py-1 px-3.5 rounded items-center hover:bg-gray-y cursor-pointer flex w-full'><span className='ml-2 w-max'>Salgylarym</span></Link>
                    </div>
                    <div className='border-y border-gray-200'>
                        <button onClick={() => setInfo(true)} className='text-gray-600 py-1 px-3.5 rounded items-center hover:bg-gray-y cursor-pointer flex w-full'><span className='ml-2 w-max'>Maglumatlarym</span></button>
                    </div>
                    <Popup open={info} setOpen={setInfo}>
                        <div className='shadow-lg z-20 h-auto outline-none bg-white w-100 relative'>
                            <button onClick={() => setOpen(false)} className='absolute cursor-pointer w-5 top-1 right-1 flex text-white bg-red-600 rounded-2xl justify-center items-center'>x</button>
                            <div className='p-4'>
                                <h2 className='mb-2 text-xl font-medium'>{t("profile_title")}</h2>
                                <div className="border border-gray-300 rounded-md p-2 mt-4 focus-within:border-blue-400 relative">
                                    <div className='absolute -translate-y-1/2 top-0 left-3 bg-white overflow-hidden rounded'>
                                        <label className="text-xs text-gray-400 block">{t("phone_number")}</label>
                                    </div>
                                    <input type="text" className="w-full outline-none text-sm" value={Telefon} onChange={(e) => setTelefon(e.target.value)} />
                                </div>
                                <div className="border border-gray-300 rounded-md p-2 mt-4 focus-within:border-blue-400 relative">
                                    <div className='absolute -translate-y-1/2 top-0 left-3 bg-white overflow-hidden rounded'>
                                        <label className="text-xs text-gray-400 block">{t("first_name")}</label>
                                    </div>
                                    <input type="text" className="w-full outline-none text-sm" value={username} onChange={(e) => setUsername(e.target.value)} />
                                </div>
                                <div className="border border-gray-300 rounded-md p-2 mt-4 focus-within:border-blue-400 relative">
                                    <div className='absolute -translate-y-1/2 top-0 left-3 bg-white overflow-hidden rounded'>
                                        <label className="text-xs text-gray-400 block">{t("address-full")}</label>
                                    </div>
                                    <input type="text" className="w-full outline-none text-sm" value={location} onChange={(e) => setLocation(e.target.value)} />
                                </div>
                                <div className='flex'>
                                    <div className='px-1'>
                                        <Profil_cart title={t("gender_male")} />
                                    </div>
                                    <div className='px-1'>
                                        <Profil_cart title={t("gender_female")} />
                                    </div>
                                </div>
                                <div className="border border-gray-300 rounded-md p-2 mt-4 focus-within:border-blue-400 relative">
                                    <div className='absolute -translate-y-1/2 top-0 left-3 bg-white overflow-hidden rounded'>
                                        <label className="text-xs text-gray-400 block">{t("birth_date_label")}</label>
                                    </div>
                                    <input type="date" className="w-full outline-none text-sm" value={date} onChange={(e) => setDate(e.target.value)} />
                                </div>
                                <div className='lg:block hidden my-2 py-1'>
                                    <div className='p-1'>
                                        <div className='duration-200 transition-colors outline-none text-[#2c3991cc] border border-[#2c3991cc] text-[16px] font-semibold rounded-lg items-center w-full h-11 flex'>
                                            <div className='flex justify-center items-center w-1/2 py-1'>
                                                <span className='inline-block leading-1.5 pt-0.5'>{t("cashback_balance")}</span>
                                            </div>
                                            <div className='flex justify-center items-center w-1/2 py-1 border-l border-[#2c3991cc]'>
                                                <span className='inline-block leading-1.5 pt-0.5 mx-auto'>0.00 m.</span>
                                                <button className={`mr-3 w-4 text-[#2c3991cc] mb-0.5 cursor-pointer relative group`}>
                                                    <IoSaveOutline className="text-xl" />
                                                    <div className='duration-200 transition-opacity opacity-0 shadow text-[12px] py-1.5 px-2.5 bg-gray-500 rounded whitespace-nowrap absolute -right-4 bottom-6 invisible group-hover:opacity-100 group-hover:visible text-white'>
                                                        {t("cashback_reset_warning")}
                                                        <span className='bg-gray-500 transform rotate-45 absolute right-5 -bottom-1 h-2 w-2'></span>
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='py-1'>
                                    <div className='p-1 flex'>
                                        <button className='ml-auto py-1.5 flex items-center px-4 bg-gray-500 text-sm text-white cursor-pointer'>
                                            <span className='w-3.5 mr-1'><HiOutlineKey /></span>
                                            <span>{t("change_password_btn")}</span>
                                        </button>
                                    </div>
                                </div>
                                <div className='py-1'>
                                    <div className='p-1'>
                                        <button className='font-semibold duration-200 text-white py-1 px-3 rounded bg-[#4bb543] w-full h-11 cursor-pointer hover:bg-[#7ed26f]'>
                                            <div className='items-center justify-center flex'>
                                                <span className='w-4 mr-2'></span>
                                                <span>{t("save_btn")}</span>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                                <div className='flex justify-center items-center py-1'>
                                    <button className='text-xs text-red-500 duration-200 items-center justify-center h-4.5 cursor-pointer'>
                                        <span>{t("delete_account_link")}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Popup>
                    <div>
                        <button onClick={() => handleLogout()} className='text-gray-600 py-1 px-3.5 rounded items-center hover:bg-gray-y cursor-pointer flex w-full'><span className='ml-2 w-max'>Çyk</span> </button>
                    </div>
                </div>
            </div>
        </OutClick>
    )
}

export default Profil
