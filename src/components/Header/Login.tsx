import { Apple, google } from '../../assets/images'
import Popup from '../Popup'
import { IoEnterOutline } from 'react-icons/io5'
import { useState } from 'react'
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { api } from '../../api/api';
import { useAuthStore } from '../../store/Store';
 function Login({ open, setOpen }: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const login = useAuthStore((state) => state.login)
  const {t} = useTranslation()
  const [active, setActive] = useState(0)
  const [Telefon, setTelefon] = useState("+993")
  const [Email, setEmail] = useState("")
  const [password, setpassword] = useState("")
  async function sendData() {
    const data = {
        phone: Telefon,
        email: Email,
        password: password
    };

    try {
        const res = await api.post("/login", data);
        
        localStorage.setItem("token", res.data.token);
        login(res.data.user);
        setTelefon("+993"); 
        setEmail("");
        setpassword("");
        setOpen(false);
        
        alert(t("login_success"));

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("Hata detayı:", error.response?.data);
            
            const status = error.response?.status;
            if (status === 401) alert(t("login_401"));
            else if (status === 400) alert(t("invalid_credentials"));
            else alert(error.message);
        }
    }
}
const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
        sendData();
    }
};
  
  return (
    <Popup open={open} setOpen={setOpen} >
      <div className="shadow-lg bg-white w-100 relative lg:block hidden z-50">
        <button onClick={() => setOpen(false)} className="absolute right-3 top-1 cursor-pointer">x</button>
        <div className="p-4">
          <h2 className="text-xl font-medium mb-2">{t("login_button")}</h2>
          <div className="flex py-1">
            <div className="ml-auto w-40">
              <div className="py-1">
                <div className="shadow-sm border border-gray-200 rounded-sm flex">
                  <button onClick={() => setActive(0)} className={`w-1/2 p-1 text-xs cursor-pointer ${active === 0 ? "bg-white text-blue-500" : "bg-gray-200 text-gray-600"}`}>Telefon</button>
                  <button onClick={() => setActive(1)} className={`w-1/2 p-1 text-xs cursor-pointer ${active === 1 ? "bg-white text-blue-500" : "bg-gray-200 text-gray-600"}`}>Email</button>
                  <div className="">
                    <div className="">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {
            active === 0 ? <div className="border border-gray-300 rounded-md p-2 mt-4 focus-within:border-blue-400 relative">
              <div className='absolute -translate-y-1/2 top-0 left-3 bg-white overflow-hidden rounded'>
                <label className="text-xs text-gray-400 block py-0.5 px-1.5">{t("phone_label")}</label>
              </div>
              <input onKeyDown={handleKeyDown} type="text" className="w-full outline-none text-sm" value={Telefon} onChange={(e) => setTelefon(e.target.value)}/>
            </div> : <div className="border border-gray-300 rounded-md p-2 mt-4 focus-within:border-blue-400 relative">
              <div className='absolute -translate-y-1/2 top-0 left-3 bg-white overflow-hidden rounded'>
                <label className="text-xs text-gray-400 block py-0.5 px-1.5">Email</label>
              </div>
              <input onKeyDown={handleKeyDown} value={Email} onChange={(e) => setEmail(e.target.value)} type="text" className="w-full outline-none text-sm" />
            </div>
          }
          <div className="border border-gray-300 rounded-md p-2 mt-4 focus-within:border-blue-400 relative">
            <div className='absolute -translate-y-1/2 top-0 left-3 bg-white overflow-hidden rounded'>
              <label className="text-xs text-gray-400 block py-0.5 px-1.5">{t("password_label")}</label>
            </div>
            <input value={password} onKeyDown={handleKeyDown} onChange={(e)=>setpassword(e.target.value)} type="password" className="w-full outline-none text-sm" />
          </div>
          <div className="text-gray-600 flex py-1 px-1.5">
            <button className="cursor-pointer ml-auto">{t("forgot_password")}</button>
          </div>
          <div className="py-1">
            <div className="py-1">
              <button onClick={sendData} className="font-semibold duration-200 text-white py-1 px-3 rounded bg-[#4bb543] w-full h-11 cursor-pointer hover:bg-[#7ed26f]">
                <div className="flex justify-center items-center">
                  <span className="mr-1"><IoEnterOutline className="text-2xl" /></span><span className="w-max">{t("login_button")}</span>
                </div>
              </button>
            </div>
            <div className="font-semibold text-center py-3 p-1 relative">
              <span className="absolute h-1 top-1/2 w-full left-0 bg-gray-200 z-1"></span>
              <span className="z-2 relative px-3 bg-white">{("or_text")}</span>
            </div>
          </div>
        </div>
        <div className='pt-1 pb-2 p-1 flex justify-center'>
          <div className='px-1.5'>
            <button className='border border-gray-500 rounded-lg flex justify-center items-center w-12 h-12 cursor-pointer hover:bg-gray-100'>
              <img className='w-2/5' src={google} alt="" />
            </button>
          </div>
          <div className='px-1.5'>
            <button className='border border-gray-500 rounded-lg flex justify-center items-center w-12 h-12 cursor-pointer hover:bg-gray-100'>
              <img className='w-2/5' src={Apple} alt="" />
            </button>
          </div>
        </div>
      </div>
    </Popup>
  )
}

export default Login
