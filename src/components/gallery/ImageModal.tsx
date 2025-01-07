import React from 'react';

interface ImageModalProps {
  imageUrl: string;
  altText: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, altText, onClose }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
      onClick={onClose} // Close modal when clicking outside the content
    >
      <div
        className="relative w-[90vw] max-w-4xl h-[500px] bg-white rounded-lg shadow-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()} // Prevent close on content click
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="flex items-center justify-center w-full h-full">
          <img
            src={imageUrl}
            alt={altText}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
