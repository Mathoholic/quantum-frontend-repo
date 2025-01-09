import TeamCarousel from "@/components/aboutus/aboutus";
import Image from "next/image";

const AboutUs = () => {
  return (
    <div className="w-screen relative">
      {/* Full width of the screen */}
      <div className="relative w-full h-[calc(100vh-80px)] mt-[3px]">
        {/* First Image */}
        <Image
          src="/about-us/aboutus.svg"
          alt="About Us Banner"
          layout="fill"
          objectFit="cover"
          className="w-full h-full"
          priority
        />

        {/* Second Image positioned in the white space */}
        <div className="absolute inset-0 flex items-center justify-center top-60 group">
          <div className="relative w-2/4 h-4/6 transform group-hover:translate-y-4 transition-transform duration-2000 ease-in-out">
            <Image
              src="/about-us/text-aboutus.svg"
              alt="About Us Text"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Section with blue background for the mission and vision images */}
      <div className="bg-[#D4F3F5]">
        <div className="py-8 flex justify-center ">
          <h1 className="text-center text-4xl font-bold">
            <span className="font-serif text-[#EE487C]">M</span>
            <span className="font-serif text-[#EE487C]">i</span>
            <span className="font-serif text-[#EE487C]">s</span>
            <span className="font-serif text-[#EE487C]">s</span>
            <span className="font-serif text-[#EE487C]">i</span>
            <span className="font-serif text-[#EE487C]">o</span>
            <span className="font-serif text-[#EE487C]">n</span>
            <span className="font-serif text-[#EE487C]"> & </span>
            <span className="font-sans text-[#EE487C]">V</span>
            <span className="font-sans text-[#EE487C]">i</span>
            <span className="font-sans text-[#EE487C]">s</span>
            <span className="font-sans text-[#EE487C]">i</span>
            <span className="font-sans text-[#EE487C]">o</span>
            <span className="font-sans text-[#EE487C]">n</span>
          </h1>
        </div>

        <div className="bg-[#D4F3F5] py-8">
          <div className="flex justify-center space-x-8">
            {/* First Box */}
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 text-center">
              <div className="relative w-full h-64 mb-4">
                <Image
                  src="/about-us/target.svg"
                  alt="Mission Vision Icon"
                  layout="fill"
                  objectFit="contain"
                  className="mx-auto"
                />
              </div>
              <h3 className="font-bold text-xl mb-2">Mission</h3>
              <p className="text-sm text-gray-600">
                To provide Child - Centric education in a safe and stimulating
                environment, through a blend of Montessori principles and other
                progressive practices.
              </p>
            </div>

            {/* Second Box */}
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 text-center">
              <div className="relative w-full h-64 mb-4">
                <Image
                  src="/about-us/mission-board.svg"
                  alt="Mission and Vision"
                  layout="fill"
                  objectFit="contain"
                  className="mx-auto"
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
          <div className="mt-6">
            <TeamCarousel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
