import TeamCarousel from "@/components/aboutus/aboutus";
import Image from "next/image";

const AboutUs = () => {
  return (
    <div className="w-full relative overflow-x-hidden">
      {/* Hero section */}
      <div className="relative w-full h-[calc(100vh-80px)] mt-[3px]">
        <Image
          src="/about-us/aboutus.svg"
          alt="About Us Banner"
          layout="fill"
          objectFit="cover"
          priority
        />

        {/* Centered text image */}
        <div className="absolute inset-0 flex items-center justify-center top-60 px-4 group">
          <div className="relative w-full max-w-2xl h-4/6 transform group-hover:translate-y-4 transition-transform duration-2000 ease-in-out">
            <Image
              src="/about-us/text-aboutus.svg"
              alt="About Us Text"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Mission and Vision section */}
      <div className="bg-[#D4F3F5] w-full">
        <div className="py-8">
          <h1 className="text-center text-4xl font-bold px-4">
            <span className="font-serif text-[#EE487C]">Mission </span>
            <span className="font-serif text-[#EE487C]">&amp; </span>
            <span className="font-sans text-[#EE487C]">Vision</span>
          </h1>
        </div>

        <div className="py-8 px-4">
          <div className="flex flex-col md:flex-row justify-center md:space-x-8 space-y-8 md:space-y-0 max-w-6xl mx-auto">
            {/* Mission Box */}
            <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/3 text-center">
              <div className="relative w-full h-48 md:h-64 mb-4">
                <Image
                  src="/about-us/target.svg"
                  alt="Mission Vision Icon"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <h3 className="font-bold text-xl mb-2">Mission</h3>
              <p className="text-sm text-gray-600">
                To provide Child - Centric education in a safe and stimulating
                environment, through a blend of Montessori principles and other
                progressive practices.
              </p>
            </div>

            {/* Vision Box */}
            <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/3 text-center">
              <div className="relative w-full h-48 md:h-64 mb-4">
                <Image
                  src="/about-us/mission-board.svg"
                  alt="Mission and Vision"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <h3 className="font-bold text-xl mb-2">Vision</h3>
              <p className="text-sm text-gray-600">
                To nurture independents, curious and compassionate learners who
                embrace cultural heritage and global perspectives, fostering a
                lifelong love of learning and a commitment to shopping
                sustainably.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values section */}
      <div className="bg-[#EE487C33] w-full py-8">
        <div className="max-w-full px-4">
          <img
            src="/about-us/Values-with-text.png"
            alt="Value with Text"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>

      {/* Team section */}
      <div>
        <TeamCarousel />
      </div>
    </div>
  );
};

export default AboutUs;