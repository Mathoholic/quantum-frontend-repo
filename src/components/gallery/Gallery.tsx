'use client';

import React, { useEffect, useState } from 'react';
import GalleryCard from './GalleryCard';

interface Image {
  id: number;
  image: string;
  alt: string;
  title: string;
}

const Gallery: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);

  // Fetch images from backend
  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch('http://localhost:3002/picture-gallery');
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

  return (
    <div className="bg-blue-100 py-10 px-6">
      <h2 className="text-center mb-8 text-pink-500 font-comic text-4xl sm:text-5xl font-bold underline underline-offset-8">
        Gallery
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((image) => (
          <GalleryCard
            key={image.id}
            imageUrl={image.image}
            altText={image.alt}
            title={image.title}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
