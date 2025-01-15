import React from 'react';
import Image from 'next/image';

const ChildCentricCurriculum: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center bg-[#D4F3F5] py-12 px-6 sm:px-12 lg:px-16">
      {/* Left Content Section */}
      <div
        className="flex-1 max-w-lg 2xl:max-w-4xl p-8 shadow-md bg-[#FFF6C8] min-h-[300px] sm:min-h-[400px] 2xl:min-h-[500px] flex flex-col justify-center"
        style={{ textAlign: 'center' }}
      >
        <h2
          className="text-3xl mx-auto lg:text-4xl 2xl:text-[52px] font-bold leading-tight text-orange-400"
          style={{
            fontFamily: 'Comic Sans MS',
          }}
        >
          Child-Centric Curriculum
        </h2>
        <p
          className="text-lg lg:text-xl 2xl:text-2xl font-medium leading-relaxed text-black mt-4 mx-auto"
          style={{
            fontFamily: 'Outfit',
          }}
        >
          Our curriculum is designed with CHILD at the core, based on extensive
          research and emphasis on PLAY based learning according to NEP
          guidelines. It is a perfect blend of Montessori and other progressive
          methodologies which are proven to help immensely in a child's overall
          development. Children Learn from concrete to Abstract while focusing
          on core subjects like English, Math, Science, Art, and Craft.
        </p>
      </div>

      {/* Right Image Section */}
      <div className="flex-1 relative max-w-lg mt-8 lg:mt-0">
        <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px]">
          <Image
            src="/why-quantum/teacher.svg"
            alt="Teacher illustration"
            fill
            className="object-contain 2xl:object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default ChildCentricCurriculum;
