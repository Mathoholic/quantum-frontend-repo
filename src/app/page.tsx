import React from 'react';
import HeroSection from '@/components/HeroSection';
import Carousel from '@/components/carousel';
import QuantumHover from '@/components/QuantumHover';
import EarlyEducationSection from '@/components/EducationSection';
import Highlights from '@/components/Highlights'; 
import Testimonials from '@/components/Testimonial';

const Home: React.FC = () => {
  return (
    <div>
      <HeroSection /> 
      <Carousel />
      <QuantumHover />
      <EarlyEducationSection />
      <Highlights />
      <Testimonials />
    </div>
  );
};

export default Home;
