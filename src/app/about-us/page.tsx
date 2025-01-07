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
        <div className="py-8">
          <Image
            src="/about-us/mission-vision.svg"
            alt="Mission and Vision"
            width={1000}
            height={500}
            className="object-contain mx-auto"
          />
        </div>

        <div className="py-8">
          <Image
            src="/about-us/miis-vis-icon.svg"
            alt="Mission Vision Icon"
            width={1000}
            height={500}
            className="object-contain mx-auto"
          />
        </div>
        <div className="py-8 mt-0 space-y-0">
          <Image
            src="/about-us/core-values.svg"
            alt="Mission and Vision"
            width={0}
            height={0}
            className="object-contain mx-auto w-full"
          />
          <TeamCarousel />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
