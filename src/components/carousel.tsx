"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "../styles/globals.css";

import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";

const images = [
  { id: "nature-1", src: "/carousel/1.png" },
  { id: "nature-2", src: "/carousel/2.png" },
  { id: "nature-3", src: "/carousel/3.png" },
  { id: "nature-4", src: "/carousel/4.png" },
  { id: "nature-5", src: "/carousel/5.png" },
  { id: "nature-6", src: "/carousel/6.png" },
  { id: "nature-7", src: "/carousel/7.png" },
  { id: "nature-8", src: "/carousel/8.png" },
];

const PanoramaSlider: React.FC = () => {
  return (
    <div
      className="panorama-slider w-full mx-auto "
      style={{ backgroundColor: "#d5f3f5" }}
    >
      <Swiper
        modules={[EffectCoverflow, Pagination, Autoplay]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        spaceBetween={30}
        loop={true}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 200,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        }}
      >
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            <div
              className="relative"
              style={{
                width: "100%",
                height: "300px",
              }}
            >
              <Image
                className="slide-image rounded-lg"
                src={image.src}
                alt={image.id}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PanoramaSlider;
