'use client'

import React from 'react';
import GalleryCard from './GalleryCard';

interface CarouselProps {
  images: { id: number; image: string; alt: string; title: string }[];
  reverse?: boolean; // Determines the movement direction
}

const Carousel: React.FC<CarouselProps> = ({ images, reverse = false }) => {
  const duplicatedImages = [...images, ...images]; // Duplicate the images array

  return (
    <div className={`relative w-full h-[400px] overflow-hidden bg-blue-100 flex items-center justify-center`}>
      <div className={`flex ${reverse ? 'animate-infinite-scroll-reverse' : 'animate-infinite-scroll'} space-x-4`}>
        {duplicatedImages.map((image, index) => (
          <div
            key={index}
            className="w-[300px] flex-shrink-0 transform scale-95 transition-transform duration-300 hover:scale-100"
          >
            <GalleryCard imageUrl={image.image} altText={image.alt} title={image.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;