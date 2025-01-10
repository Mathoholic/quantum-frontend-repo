'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import '../styles/globals.css';

import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';

export default function Carousel() {
  const images = [
    { id: 'nature-1', src: 'https://swiperjs.com/demos/images/nature-1.jpg' },
    { id: 'nature-2', src: 'https://swiperjs.com/demos/images/nature-2.jpg' },
    { id: 'nature-3', src: 'https://swiperjs.com/demos/images/nature-3.jpg' },
    { id: 'nature-4', src: 'https://swiperjs.com/demos/images/nature-4.jpg' },
    { id: 'nature-5', src: 'https://swiperjs.com/demos/images/nature-5.jpg' },
    { id: 'nature-6', src: 'https://swiperjs.com/demos/images/nature-6.jpg' },
    { id: 'nature-7', src: 'https://swiperjs.com/demos/images/nature-7.jpg' },
    { id: 'nature-8', src: 'https://swiperjs.com/demos/images/nature-8.jpg' },
    { id: 'nature-9', src: 'https://swiperjs.com/demos/images/nature-9.jpg' },
  ];

  return (
    <div className="w-full h-full bg-[#d5f3f5] flex items-center justify-center p-4 sm:p-8 md:p-12 lg:p-16">
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={5} // Set slidesPerView dynamically
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true, // Updated to match specific UX intent
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: -50,
          depth: 150,
          modifier: 1.5,
          slideShadows: true,
        }}
        pagination={{ clickable: true, el: '.swiper-pagination', type: 'bullets' }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="w-full max-w-6xl transform -translate-x-12" // Shift slides to the left
      >
        {images.map((image) => (
          <SwiperSlide key={image.id} className="flex items-center justify-center">
            <div
              className="overflow-hidden rounded-xl shadow-2xl transition-transform duration-500 ease-in-out hover:scale-105 w-[70vw] max-w-[320px] h-[70vw] max-h-[320px] bg-white border border-gray-200 flex items-center justify-center"
            >
              <img
                src={image.src}
                alt={`Slide for ${image.id}`}
                className="object-cover w-full h-full rounded-xl"
              />
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-pagination swiper-pagination-vertical right-0"></div> {/* Pagination on the right */}
      </Swiper>
    </div>
  );
}
