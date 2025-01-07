import React from 'react';
import Image from 'next/image';

const HeroSection: React.FC = () => {
  return (
    <div className="bg-blue-100 min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Decorative images container */}
      <div className="absolute inset-x-0 top-1/4 flex justify-between">
        {/* Left decorative image */}
        <div className="ml-4">
          <Image
            src="/rocket.svg"
            alt="Left Decorative"
            width={192}
            height={192}
            className="w-32 md:w-48"
          />
        </div>

        {/* Right decorative image */}
        <div className="mr-4">
          <Image
            src="/pencil.svg"
            alt="Right Decorative"
            width={192}
            height={192}
            className="w-32 md:w-48"
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex flex-col items-center text-center py-16">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Take A Quantum Leap Into Learning
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl">
          Quantum kids is a new age, progressive pre-school aiming to provide
          Child-Centric education hugely inspired by Montessori philosophy. Our
          thoughtfully designed environment nurtures each child's natural
          curiosity and creativity, inspiring them to become passionate and
          life long learners.
        </p>
        <button className="mt-8 bg-pink-500 text-white px-6 py-3 rounded-lg text-lg shadow-lg hover:bg-pink-600">
          Let’s Get Started
        </button>
      </main>

      {/* Decorative Footer Icons */}
      <div className="flex space-x-4 mt-10">
        <div className="bg-orange-400 w-12 h-12 rounded-full"></div>
        <div className="bg-teal-400 w-12 h-12 rounded-full"></div>
      </div>
    </div>
  );
};

export default HeroSection;
