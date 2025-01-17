'use client';

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';

interface Image {
  id: number;
  image: string;
  alt: string;
  title: string;
}

const Gallery: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch('http://208.109.214.146:3002/picture-gallery');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error('Failed to fetch images:', error);
      }
    }

    fetchImages();
  }, []);

  // Split images for two carousels
  const middleIndex = Math.ceil(images.length / 2);
  const firstCarouselImages = images.slice(0, middleIndex);
  const secondCarouselImages = images.slice(middleIndex);

  return (
    <div className="bg-blue-100 py-10 px-6">
      <h2 className="text-center mb-8 text-pink-500 font-comic text-4xl sm:text-5xl font-bold ">
        Gallery
      </h2>

      {/* First Carousel (Left-to-Right) */}
      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        navigation={true}
        modules={[Pagination, Autoplay, Navigation]}
        className="mySwiper mb-10"
      >
        {firstCarouselImages.map((image) => (
          <SwiperSlide key={image.id}>
            <div className="w-full h-[300px] flex items-center justify-center bg-gray-200">
              <img
                src={image.image}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </div>
        
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Second Carousel (Right-to-Left) */}
      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          reverseDirection: true, // Makes the autoplay move right-to-left
          disableOnInteraction: false,
        }}
        loop={true}
        navigation={true}
        modules={[Pagination, Autoplay, Navigation]}
        className="mySwiper"
      >
        {secondCarouselImages.map((image) => (
          <SwiperSlide key={image.id}>
            <div className="w-full h-[300px] flex items-center justify-center bg-gray-200">
              <img
                src={image.image}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </div>
            
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Gallery;