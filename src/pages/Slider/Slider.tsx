import { useCallback, useEffect, useState } from "react";
import { IBannerProps } from "../../interface";
import BannerService from "../../services/bannerService";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
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

  return banners.length > 0 ? (
    <>
      <div style={{ position: "relative" }}>
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
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Navigation, Pagination, Autoplay]}
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
    </>
  ) : (
    <>
      <div className="bannerContainer">
        <div className="bannerContent">
          <div className="headerContent ">
            <h1 className="headingContent ">Summer Sale</h1>
            <p className="paragraphContent ">
              Enjoy discounts on selected items
            </p>
            <p className="SaleContent ">GET 50% OFFER</p>
          </div>
          <div className="imageBanner">
            <img
              src={"/assets/images/bannerImage.png"}
              alt="banner"
              className="bannerImage"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageSlider;
