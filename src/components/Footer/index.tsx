import { Link } from 'react-router-dom'
import { apk, appstore, googleplay, Logfut } from '../../assets/images'
import { HiHome, HiOutlineHeart, HiOutlineUser } from 'react-icons/hi'
import { MdLayers } from 'react-icons/md'
import { IoCartOutline } from 'react-icons/io5'
import { FiPackage } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'

function footer() {
  const {t} = useTranslation()
  return (
    <div className=' bg-white'>
      <footer className='pt-2 pb-8 px-10 container mx-auto lg:flex lg:flex-col hidden'>
        <div className='py-3 mb-3 w-40'>
          <img src={Logfut} alt="" />
        </div>
        <div className='flex justify-between'>
          <div className='w-[32%] px-2 ml-8'>
            <h3 className='text-gray-600 text-lg font-semibold mb-2'>{t("footer_market")}</h3>
            <ul className='text-gray-600 text-sm'>
              <li className='py-0.5'>
                <a href="" className='hover:text-black'>{t("footer_about")}</a>
              </li>
              <li className='py-0.5'>
                <a href="" className='hover:text-black'>{t("footer_contact")}</a>
              </li>
              <li className='py-0.5'>
                <a href="" className='hover:text-black'>{t("footer_delivery_terms")}</a>
              </li>
              <li className='py-0.5'>
                <a href="" className='hover:text-black'>{t("footer_privacy")}</a>
              </li>
            </ul>
          </div>
          <div className='w-[32%] px-2 ml-8'>
            <h3 className='text-gray-600 text-lg font-semibold mb-2'>{t("footer_help_title")}</h3>
            <ul className='text-gray-600 text-sm'>
              <li className='py-0.5'>
                <span className='inline-block w-20'>{t("footer_phone")}</span>
                <a href="" className='hover:text-black'>+993 12 22-74-75</a>
              </li>
              <li className='py-0.5'>
                <span className='w-20 inline-block'> {t("footer_imo")}</span>
                <a href="" className='hover:text-black'>+993 63 75-74-22</a>
              </li>
              <li className='py-0.5'>
                <span className='w-20 inline-block'>{t("footer_email")}</span>
                <a href="" className='hover:text-black'>info@ynamdar.com</a>
              </li>
              <li className='py-0.5'>
                <span className='w-20 inline-block'>{t("footer_instagram")}</span>
                <a href="" className='hover:text-black'>@ynamdar_com</a>
              </li>
            </ul>
          </div>
          <div className='w-[32%]'>
            <h3 className='text-gray-600 text-lg font-semibold mb-2'>{t("footer_mobile_apps")}</h3>
            <div className='flex py-1'>
              <div className='w-40'>
                <a href="">
                  <img src={googleplay} alt="" />
                </a>
              </div>
              <div className='w-40'>
                <a href="">
                  <img src={appstore} alt="" />
                </a>
              </div>
            </div>
            <div className='w-40'>
              <a href="">
                <img src={apk} alt="" />
              </a>
            </div>
          </div>
        </div>
      </footer>
      <div className="lg:hidden grid grid-cols-5 fixed left-0 bottom-0 w-full z-20 bg-[#fef2ec] shadow-lg border-t border-gray-y h-16">
        <Link to="/" className="h-full flex flex-col justify-end items-center pb-1 text-orange-y border-b-[3px] border-orange-y">
    <span className="flex justify-center items-center mb-1">
      <HiHome size={22}/>
    </span>
    <span className="text-[10px] font-medium leading-none mb-1">Baş sahypa</span>
  </Link>
        <Link to={"/Brands"} className='pb-1 h-full text-orange-y border-orange-y flex flex-col justify-center items-center'>
          <span className='w-7 h-7 flex justify-center items-center mb-1'><MdLayers size={22} /></span>
          <span className='"text-[10px] font-medium leading-none mb-1'>Brendler</span>
        </Link>
        <Link to={"/Shopping"} className='h-full text-orange-y flex flex-col justify-center items-center'>
          <span className='w-7 h-7 flex justify-center items-center mb-0.5'><IoCartOutline size={22}/></span>
          <span className='"text-[10px] font-medium leading-none mb-1'>Sebet</span>
        </Link>
        <Link to={"/Favorites"} className='h-full text-orange-y flex flex-col justify-center items-center'>
          <span className='w-7 h-7 flex justify-center items-center mb-0.5'><HiOutlineHeart size={22}/></span>
          <span className='"text-[10px] font-medium leading-none mb-1'>Halanlarym</span>
        </Link>
        <Link to={"/"} className='h-full text-orange-y flex flex-col justify-center items-center'>
          <span className='w-7 h-7 flex justify-center items-end mb-0.5'><HiOutlineUser size={22}/></span>
          <span className='"text-[10px] font-medium leading-none mb-1'>Profil</span>
        </Link>
      </div>
    </div>
  )
}

export default footer