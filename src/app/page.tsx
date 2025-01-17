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
        <div style={{ zIndex: 1, position: 'relative' }}>
          <HeroSection /> 
        </div>
        <div style={{ zIndex: 2, position: 'relative' }}>
          <Carousel />
        </div>
        <div style={{ zIndex: 3, position: 'relative' }}>
          <QuantumHover />
        </div>
        <div style={{ zIndex: 4, position: 'relative' }}>
          <EarlyEducationSection />
        </div>
        <div style={{ zIndex: 5, position: 'relative' }}>
          <Highlights />
        </div>
        <div style={{ zIndex: 6, position: 'relative' }}>
          <Testimonials />
        </div>
      </div>
    );
  };

  export default Home;
