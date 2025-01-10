import React from 'react';
import Image from 'next/image';

const DecorativeImages: React.FC = () => {
  return (
    <div className="absolute inset-x-0 top-20 flex justify-between">
      <div>
        <Image
          src="/rocket.svg"
          alt="Left Decorative"
          width={192}
          height={192}
          className="w-32 md:w-48"
        />
      </div>
      <div>
        <Image
          src="/pencil.svg"
          alt="Right Decorative"
          width={192}
          height={192}
          className="w-32 md:w-48"
        />
      </div>
    </div>
  );
};

export default DecorativeImages;
