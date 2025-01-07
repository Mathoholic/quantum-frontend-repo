import React from 'react';
import HeroSection from '@/components/HeroSection';
import Carousel from '@/components/carousel';

const Home: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <Carousel />
    </div>
  );
};

export default Home;
