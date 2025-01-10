import React from 'react';
import FeatureSection from './FeatureSection';

const Kreedo = () => (
  <FeatureSection
    bgColor="bg-[#097B2C33]"
    title={<>Our academic partner - <span className="text-green-500">KREEDO</span></>}
    content="With over 15 years of experience in early education, KREEDO has been instrumental in providing an integrated curriculum that blends innovative teaching methods, promising high learning outcomes."
    imageSrc="/why-quantum/kreedo-image.svg"
    imageAlt="Kreedo"
    reverse={true}
  />
);

export default Kreedo;
