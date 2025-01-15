// PanoramaSlider.tsx
"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import '../styles/globals.css';

import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';

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

const PanoramaSlider: React.FC = () => {
  return (
    <div className="panorama-slider w-full h-full mx-auto pt-4" style={{ backgroundColor: '#d5f3f5' }}>
      <div className="swiper">
        <div className="swiper-wrapper">
          {images.map(image => (
            <div className="swiper-slide" key={image.id}>
              <img
                className="slide-image"
                src={image.src}
                alt={image.id}
              />
            </div>
          ))}
        </div>
        {/* Pagination */}
        <div className="swiper-pagination"></div>
      </div>
    </div>
  );
};

export default PanoramaSlider;
