import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselNavigationProps {
  members: any[];
  currentSlide: number;
  handlePrevious: () => void;
  handleNext: () => void;
  setCurrentSlide: (index: number) => void;
}

const CarouselNavigation: React.FC<CarouselNavigationProps> = ({
  members,
  currentSlide,
  handlePrevious,
  handleNext,
  setCurrentSlide,
}) => {
  return (
    <div className='w-full py-16'> 
        <div className="flex justify-between  items-center max-w-md mx-auto mt-12">
      <button 
        onClick={handlePrevious}
        className="bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-8 h-8 text-gray-600" />
      </button>

      <div className="flex gap-1 ">
        {members.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentSlide ? 'bg-red-500' : 'bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <button 
        onClick={handleNext}
        className="bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-8 h-8 text-gray-600" />
      </button>
    </div>
    </div>
  );
};

export default CarouselNavigation;
