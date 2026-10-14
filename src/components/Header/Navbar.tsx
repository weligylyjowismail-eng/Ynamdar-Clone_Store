import { Link, useNavigate } from "react-router-dom"
import Language from "./Language"
import { HiOutlineHeart, HiOutlineLocationMarker, HiOutlineUser, HiSearch } from "react-icons/hi"
import { IoCartOutline, IoEnterOutline, IoPersonAddOutline, IoStorefrontOutline } from "react-icons/io5"
import { MdLayers, MdStorefront } from "react-icons/md"
import { HiOutlineMagnifyingGlass } from "react-icons/hi2"

import { useState } from 'react'
import Login from "./Login"
import Category from "./Category"
import { FiPackage } from "react-icons/fi"
import Register from "./Register"
import Popup from "../Popup"
import { useTranslation } from "react-i18next"
import { useAuthStore } from "../../store/Store"
import Category_responsive from "./Category_responsive"
import Profil from "./Profil"

function Navbar() {
  const { t } = useTranslation()
  const { wishlist, cart } = useAuthStore();
  const totalQuantity = cart?.reduce((sum, item) => sum + (item.quantity || 1), 0) || 0;
  const cleanWishlist = wishlist.filter(item => item !== null && item !== undefined);
  const [open, setOpen] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [openRegister, setOpenRegister] = useState(false)
  const [aramaMetni, setAramaMetni] = useState("")
  const { user } = useAuthStore();
  const navigate = useNavigate()
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && aramaMetni.trim() !== '') {
      navigate(`/search?q=${encodeURIComponent(aramaMetni)}`)
    }
  }
  const [active_location, setActive_Location] = useState(0)
  return (
    <div className='sticky top-0 z-20 w-full flex justify-center bg-white border-b border-gray-100'>
      <div className='container mx-auto px-10'>
        <nav className='flex items-center gap-1 py-2 px-5 w-full'>
          <Category />
          <Category_responsive />
          <Popup open={open} setOpen={setOpen}>
            <div className='pt-4 pb-2 shadow px-3 bg-white flex flex-col w-90 max-w-full h-full z-100 top-0 left-0 fixed'>
              <button className='w-3/5 text-red-600 top-1 right-2 absolute'>x</button>
              <div className='pt-4 pb-2 px-2 flex grow overflow-x-hidden'>
                <div className='grow overflow-x-hidden h-full'></div>
              </div>
            </div>
          </Popup>
          <div className="w-px h-8 bg-gray-300 lg:hidden block"></div>
          <button className="flex flex-1 items-center justify-center gap-1 text-gray-600 h-full lg:hidden" onClick={() => setOpen(true)}>{t(active_location === 0 ? "location" : `location${active_location + 1}`)}
            <HiOutlineLocationMarker size={18} />
          </button>
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
          <div className="w-px h-8 bg-gray-300 lg:hidden block"></div>
          <div className="h-full flex justify-center items-center shrink-0 lg:hidden">
            <div className="h-full w-full pl-1.5">
              <button className="cursor-pointer" onClick={() => setShowSearch(!showSearch)}><HiSearch size={22} className="text-gray-500 h-full flex flex-1 justify-center items-center" /></button>
            </div>
          </div>
          <div className="w-px h-8 bg-gray-300 lg:block hidden"></div>
          <div className="lg:flex items-center hidden">
            <Link to={"/Markets/Categories"} className='text-gray-600 py-1 px-3.5 rounded-lg items-center hover:bg-gray-y duration-150 cursor-pointer flex'><span className="mr-1"><IoStorefrontOutline size={22} className="text-gray-600" /></span><span>{t("store")}</span></Link>
          </div>
          <div className='lg:flex hidden justify-center w-full relative'>
            <input onKeyDown={handleKeyDown} type="text" onChange={(e) => setAramaMetni(e.target.value)} placeholder={t("Search-product")} value={aramaMetni} className='py-2 px-4 rounded-lg bg-gray-y w-full outline-none h-9' />
            <div className="absolute right-3 top-1">
              <button><HiOutlineMagnifyingGlass className="text-2xl cursor-pointer" /></button>
            </div>
          </div>
          <Language />
          <div className="w-px h-8 bg-gray-300 lg:block hidden"></div>
          {
            user ?
              <Profil />
              :
              <>
                <div className="lg:flex hidden items-center">
                  <button onClick={() => setOpen(true)} className='text-gray-600 py-1 px-3.5 rounded-lg items-center hover:bg-gray-y duration-150 cursor-pointer flex '><span className="mr-1"><IoEnterOutline className="text-2xl" /></span><span className="w-max">{t("Login")}</span></button>
                </div>
                <div className="w-px h-8 bg-gray-300 lg:block hidden"></div>
                <Login open={open} setOpen={setOpen} />
                <div className="lg:flex items-center  hidden">
                  <button onClick={() => setOpenRegister(true)} className='text-gray-600 py-1 px-3.5 rounded-lg items-center hover:bg-gray-y duration-150 cursor-pointer flex '><span className="mr-1"><IoPersonAddOutline className="text-2xl" /></span><span className="w-max">{t("Register")}</span></button>
                </div>
              </>
          }
          {/* <Profil/> */}
          <div className="w-px h-8 bg-gray-300 lg:block hidden"></div>
          <Register open={openRegister} setOpen={setOpenRegister} />
          <div className="lg:flex hidden items-center">
            <Link to={"/Orders"} className='text-gray-600 py-1 px-3.5 rounded-lg items-center hover:bg-gray-y duration-150 cursor-pointer flex '><span><FiPackage className="text-2xl" /></span></Link>
          </div>
          <div className="w-px h-8 bg-gray-300 lg:block hidden"></div>
          <div className="lg:flex hidden items-center">
            <Link to={"/Favorites"} className='text-gray-600 py-1 px-3.5 rounded-lg items-center hover:bg-gray-y duration-150 cursor-pointer flex '><span className="relative w-auto"><HiOutlineHeart className="text-2xl" />{cleanWishlist.length > 0 && (
              <span className="text-[10px] text-white px-1 bg-purple-y-500 rounded-lg flex justify-center items-center select-none absolute translate-y-2/3 translate-x-2/3 min-w-4/5 h-4/5 right-0.5 bottom-0.5">{cleanWishlist.length > 0 && ` ${cleanWishlist.length}`}</span>
            )}</span><span></span></Link>
          </div>
          <div className="w-px h-8 bg-gray-300 lg:block hidden"></div>
          <div className="lg:flex hidden items-center">
            <Link to={"/Shopping"} className='text-gray-600 py-1 px-3.5 rounded-lg items-center hover:bg-gray-y duration-150 cursor-pointer flex '><span className="relative w-auto"><IoCartOutline className="text-2xl" />{totalQuantity > 0 && (
              <span className="text-[10px] text-white px-1 bg-purple-y-500 rounded-lg flex justify-center items-center select-none absolute translate-y-2/3 translate-x-2/3 min-w-4/5 h-4/5 right-0.5 bottom-0.5">{totalQuantity > 0 && ` ${totalQuantity}`}</span>
            )}</span></Link>
          </div>
        </nav>
        <div className={`pb-3 px-2 w-full lg:hidden flex ${showSearch ? "flex" : "hidden"}`}>
          <div className="w-full flex items-center">
            <input onKeyDown={handleKeyDown} type="text" onChange={(e) => setAramaMetni(e.target.value)} placeholder="Haryt ady boýunça gözle" value={aramaMetni} className='py-2 px-4 rounded-lg bg-gray-y w-full outline-none h-9 flex flex-col flex-1' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
