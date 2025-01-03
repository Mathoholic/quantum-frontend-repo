// components/GameCard.tsx
import React from "react";

const GameCard: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row items-center bg-sky-100 px-24 py-20 gap-3 rounded-lg">
      {/* Text Section */}
      <div className="md:w-1/2 text-left mb-6 md:mb-0">
        <p className="text-sm text-gray-500 uppercase mb-2">Development</p>
        <p className="text-xs text-gray-400 mb-4">16 March 2023</p>
        <h2 className="text-4xl font-bold text-pink-600 mb-4">
          How to make a Game look more attractive with New VR & AI Technology
        </h2>
        <p className="text-sm text-gray-600 mb-6 mr-16">
          Google has been investing in AI for many years and bringing its
          benefits to individuals, businesses, and communities. Whether it’s
          publishing state-of-the-art research, building helpful products or
          developing tools and resources that enable others, we’re committed to
          making AI accessible to everyone.
        </p>
        <button className="bg-pink-100 text-pink-600 font-medium py-2 px-4 rounded hover:bg-pink-200">
          Read More
        </button>
      </div>

      {/* Image Section */}
      <div className="md:w-1/2">
        <img
          src="/blog/kids-globe.png" // Replace with your image path
          alt="Kids exploring a globe"
          className="rounded-lg"
        />
      </div>
    </div>
  );
};

export default GameCard;
