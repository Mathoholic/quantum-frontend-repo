import React from 'react';

const images = [
  'https://wowslider.com/sliders/demo-93/data1/images/sunset.jpg',
  'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(31).webp',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrd3dQTKHapOH0Pir-VG7Lf9DwLzYuwgVhbg&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFU7U2h0umyF0P6E_yhTX45sGgPEQAbGaJ4g&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReqXUWHhvgS_uCZR1vCu0jYrGiSS_5OahAeA&s',
];

const Carousel: React.FC = () => {
  return (
    <div className="relative w-full h-[400px] overflow-hidden bg-[#DFF9FA] flex items-center justify-center">
      <div className="flex animate-infinite-scroll space-x-4">
        {/* Original images */}
        {images.map((src, index) => (
          <div
            key={index}
            className="w-[300px] flex-shrink-0 transform scale-95 transition-transform duration-300 hover:scale-100"
          >
            <img
              src={src}
              alt={`Carousel ${index}`}
              className="rounded-lg shadow-lg w-full h-full object-cover"
            />
          </div>
        ))}
        {/* Duplicate images for seamless looping */}
        {images.map((src, index) => (
          <div
            key={index + images.length}
            className="w-[300px] flex-shrink-0 transform scale-95 transition-transform duration-300 hover:scale-100"
          >
            <img
              src={src}
              alt={`Carousel duplicate ${index}`}
              className="rounded-lg shadow-lg w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
