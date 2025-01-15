import React from 'react';
import HeroSection from '@/components/HeroSection';
import Carousel from '@/components/carousel_new';
import QuantumHover from '@/components/QuantumHover';
import EarlyEducationSection from '@/components/EducationSection';
import Highlights from '@/components/Highlights'; 
import Testimonials from '@/components/Testimonial';

const Home: React.FC = () => {
  return (
    <div>
      <HeroSection /> {/* Ensure this is correctly placed */}
      <Carousel />
      <QuantumHover />
      <EarlyEducationSection />
      <Highlights />
      <Testimonials />
    </div>
  );
};

export default Home;
