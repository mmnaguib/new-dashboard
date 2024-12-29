import { useCallback, useEffect, useState } from "react";
import { IBannerProps } from "../../interface";
import BannerService from "../../services/bannerService";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Slider.css";
const ImageSlider = () => {
  const [banners, setBanners] = useState<IBannerProps[]>([]);
  const fetchBanners = useCallback(async () => {
    const res = await BannerService.getAllBanners();
    setBanners(res);
  }, []);
  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  return (
    <div style={{ position: "relative", height: "51vh" }}>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{
          clickable: true, // النقاط قابلة للنقر
        }}
        modules={[Navigation, Pagination]}
        style={{ width: "100%" }}
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <img
              src={banner.image}
              alt={`Slide ${index}`}
              className="sliderImage"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <button className="swiper-button-prev"></button>
      <button className="swiper-button-next"></button>
    </div>
  );
};

export default ImageSlider;
