import React from 'react';
import HeroSection from '@/components/HeroSection';
import Carousel from '@/components/carousel';
import QuantumHover from '@/components/QuantumHover';
import EarlyEducationSection from '@/components/EducationSection';

const Home: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <Carousel />
      <QuantumHover />
      <EarlyEducationSection />
    </div>
  );
};

export default Home;
