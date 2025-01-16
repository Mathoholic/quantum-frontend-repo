'use client';

import React, { useEffect, useState } from 'react';
import Carousel from './Carousel';

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

  const middleIndex = Math.ceil(images.length / 2);
  const latestImages = images.slice(-middleIndex);
  const olderImages = images.slice(0, middleIndex);

  return (
    <div className="bg-blue-100 py-10 px-6">
      <h2 className="text-center mb-8 text-pink-500 font-comic text-4xl sm:text-5xl font-bold ">
        Gallery
      </h2>
      <div >
        <Carousel images={latestImages} reverse={false} />
        <Carousel images={olderImages} reverse={true} />
      </div>
    </div>
  );
};

export default Gallery;