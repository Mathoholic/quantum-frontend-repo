import React, { useState } from 'react';
import ImageModal from './ImageModal';

interface GalleryCardProps {
  imageUrl: string;
  altText: string;
  title: string;
}

const galleryCardStyles = "gallery-card bg-white border rounded-lg overflow-hidden shadow-md relative group transform transition-transform duration-300 hover:scale-105";

const GalleryCard: React.FC<GalleryCardProps> = ({ imageUrl, altText, title }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      openModal();
    }
  };

  return (
    <>
      <div
        className={galleryCardStyles}
        onClick={openModal}
        onKeyDown={handleKeyDown}
        tabIndex={0} // Makes the div focusable for keyboard users
      >
        <div className="w-full h-[300px] flex items-center justify-center bg-gray-200">
          <img
            src={imageUrl}
            alt={altText}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h3 className="text-lg font-semibold text-center">{title}</h3>
        </div>
      </div>

      {isModalOpen && (
        <ImageModal imageUrl={imageUrl} altText={altText} onClose={closeModal} />
      )}
    </>
  );
};

export default GalleryCard;