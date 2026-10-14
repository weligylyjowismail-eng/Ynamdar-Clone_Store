import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, FreeMode, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Link } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useEffect, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import type { bannerT } from "../../types/banner";

interface BrandBannerProps {
  data?: bannerT[];
  sideBanners?: bannerT[];
}

function BrandBanner({ data, sideBanners }: BrandBannerProps) {
  const [thumbs, setThumbs] = useState<SwiperType | null>(null);
  const [perView, setPerView] = useState<number>(4);

  useEffect(() => {
    if (window.innerWidth < 1280) {
      setPerView(4.4);
    }
  }, []);

  if (!data || data.length === 0) {
    return null;
  }

  const isLoopRequired = data.length >= perView * 2;
  const hasSideBanners = !!sideBanners && sideBanners.length > 0;

  return (
    <div className="w-full flex gap-5 justify-center mt-5">
      {/* Ana slider */}
      <div className="w-full lg:w-4/5 relative rounded-2xl overflow-hidden h-56 sm:h-72 md:h-100 lg:h-120 xl:h-150">
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
          pagination={{ clickable: true }}
          navigation={{ nextEl: ".brand-next-btn", prevEl: ".brand-prev-btn" }}
        >
          {data.map((banner: bannerT) => (
            <SwiperSlide key={"main-banner-" + banner.id}>
              <Link to={banner.link || "#"} className="block h-full">
                <img
                  className="h-full w-full object-cover"
                  src={`${import.meta.env.VITE_API}${banner.image}`}
                  alt="Brand Banner"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Yön okları */}
        <button className="hidden lg:flex brand-prev-btn absolute top-0 left-0 h-full z-10 text-white items-center justify-center group cursor-pointer px-2">
          <span className="absolute inset-0 bg-linear-to-r from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <IoIosArrowBack size={50} className="relative z-10" />
        </button>
        <button className="hidden lg:flex brand-next-btn absolute top-0 right-0 h-full z-10 text-white items-center justify-center group cursor-pointer px-2">
          <span className="absolute inset-0 bg-linear-to-l from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <IoIosArrowForward size={50} className="relative z-10" />
        </button>
      </div>

      {/* Sağ yan bölüm */}
      <div className="w-1/5 md:h-100 lg:h-120 xl:h-150 hidden lg:block">
        {hasSideBanners ? (
          <div className="flex flex-col gap-3 h-full justify-between">
            {sideBanners!.slice(0, 4).map((sideItem) => (
              <Link
                key={"side-banner-" + sideItem.id}
                to={sideItem.link || "#"}
                className="h-[23%] rounded-xl overflow-hidden block"
              >
                <img
                  src={`${import.meta.env.VITE_API}${sideItem.image}`}
                  alt="Side Banner"
                  className="w-full h-full object-cover"
                />
              </Link>
            ))}
          </div>
        ) : (
          <Swiper
            onSwiper={setThumbs}
            className="w-full h-full"
            modules={[Thumbs, FreeMode]}
            direction="vertical"
            watchSlidesProgress
            slidesPerView={data.length < perView ? data.length : perView}
            spaceBetween={20}
            freeMode
          >
            {data.map((banner: bannerT) => (
              <SwiperSlide
                key={"thumb-banner-" + banner.id}
                className="rounded-md overflow-hidden relative cursor-pointer"
              >
                <img
                  className="h-full w-full object-cover"
                  src={`${import.meta.env.VITE_API}${banner.image}`}
                  alt="Thumbnail"
                />
                <div className="absolute top-0 left-0 h-full w-0 border-b-6 border-purple-y-400 bg-purple-y-500/50 ease-linear in-[.swiper-slide-thumb-active]:w-full in-[.swiper-slide-thumb-active]:transition-all in-[.swiper-slide-thumb-active]:duration-4000" />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
}

export default BrandBanner;