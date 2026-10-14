import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay, FreeMode, Thumbs } from "swiper/modules";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Banner1, Banner2, Banner3, Banner4, Banner5 } from "../../../assets/images";
import { Link } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useEffect, useState } from "react";
import type { Swiper as SwiperType } from "swiper"
import type { bannerT } from "../../../types/banner";

function Banner({ data }: { data: bannerT[] }) {
  const [thumbs, setThumbs] = useState<SwiperType | null>(null)
  const [perView, setPerView] = useState<number>(4)

  useEffect(() => {
    if (window.innerWidth < 1280) {
      setPerView(4.4)
    }
  }, [])
  const isLoopRequired = data && data.length >= (perView * 2);

  return (
    <div className="w-full flex gap-5 justify-center mt-5">
      <div className="w-full lg:w-4/5 relative rounded-2xl overflow-hidden md:h-100 lg:h-120 xl:h-150">
        
        {/* 🌟 Koruma: Sadece veri geldiğinde Swiper'ı oluştur diyoruz */}
        {data && data.length > 0 && (
          <Swiper
            className="w-full h-full rounded-2xl"
            loop={isLoopRequired}
            key={isLoopRequired ? "loop-on" : "loop-off"}
            observer={true}
            observeParents={true}
            modules={[Navigation, Pagination, Autoplay, Thumbs]}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            thumbs={{ swiper: thumbs && !thumbs.destroyed ? thumbs : null }}
            pagination={{
              clickable: true,
            }}
            navigation={{ nextEl: ".next-btn", prevEl: ".prev-btn" }}
          >
            {data?.map((banner: bannerT) => (
              <SwiperSlide key={"main-banner-" + banner.id}>
                <Link to={banner.link || "#"}>
                  <img className="h-full w-full" src={`${import.meta.env.VITE_API}${banner.image}`} alt="Ynamdar Banner" />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        <button className="hidden lg:block prev-btn absolute top-0 cursor-pointer left-0 h-full z-1 text-white group">
          <span className="absolute inset-0 bg-linear-to-r from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <IoIosArrowBack size={50} className="relative z-1" />
        </button>
        <button className="hidden lg:block next-btn absolute top-0 right-0 h-full cursor-pointer z-1 text-white group">
          <span className="absolute inset-0 bg-linear-to-l from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <IoIosArrowForward size={50} className="relative z-1" />
        </button>
      </div>
      
      <div className="w-1/5 md:h-100 lg:h-120 xl:h-150 hidden lg:block">
        
        {/* 🌟 Koruma: Aynı şekilde sağ tarafı da veri yüklenene kadar bekletiyoruz */}
        {data && data.length > 0 && (
          <Swiper
            onSwiper={setThumbs}
            className="w-full h-full"
            modules={[Thumbs, FreeMode]}
            direction="vertical"
            slidesPerView={data && data?.length < perView ? data?.length : perView}
            spaceBetween={20}
            freeMode
          >
            {data?.map((banner: bannerT) => (
              <SwiperSlide key={"thumb-banner-" + banner.id} className="rounded-md overflow-hidden relative">
                <Link to={"#"}>
                  <img className="h-full w-full" src={`${import.meta.env.VITE_API}${banner.image}`} alt="" />
                  <div className="h-full border-b-6  border-purple-y-400  bg-purple-y-500/50 w-0 in-[.swiper-slide-thumb-active]:w-full in-[.swiper-slide-thumb-active]:duration-5000 easy-linear in-[.swiper-slide-thumb-active]:transtion-all absolute top-0 left-0"></div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

      </div>
    </div>
  )
}

export default Banner