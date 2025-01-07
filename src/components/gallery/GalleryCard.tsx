import React, { useState } from 'react';
import ImageModal from './ImageModal';

interface GalleryCardProps {
  imageUrl: string;
  altText: string;
  title: string;
}

const GalleryCard: React.FC<GalleryCardProps> = ({ imageUrl, altText, title }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div 
        className="gallery-card bg-white border rounded-lg overflow-hidden shadow-md relative group transform transition-transform duration-300 hover:scale-105"
        onClick={openModal}
      >
        <div className="aspect-w-1 aspect-h-1">
          <img
            src={imageUrl}
            alt={altText}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
      </div>

      {isModalOpen && (
        <ImageModal imageUrl={imageUrl} altText={altText} onClose={closeModal} />
      )}
    </>
  );
};

export default GalleryCard;
