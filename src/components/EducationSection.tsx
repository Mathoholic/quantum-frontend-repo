import Image from "next/image";

const EarlyEducationSection = () => {
  return (
    <section className="bg-[#fcd4df] py-16 relative">
      <div className="absolute top-[-70px] right-20 m-4">
        <Image src="/plus.svg" alt="Top Right Image" width={100} height={100} />
      </div>
      <div className="container mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          {/* Left Column: Text Content */}
          <div className="text-center lg:text-left">
            <h3 className="text-pink-600 text-sm font-semibold uppercase">Play based learning</h3>
            <h1 className="text-4xl font-bold font-comic text-black mt-4">
              Early education is not a luxury, but a necessity!
            </h1>
            <p className="text-gray-700 text-lg mt-6 font-outfit leading-relaxed custom-paragraph">
              A child’s brain development is phenomenal during the early years — over 
              75% development happens during 0-6 years, where they absorb everything
              around them just like sponges. We believe in a strong foundation in the
              early years, and providing a rich structured environment makes a huge
              difference in their lives.
            </p>
            <p className="text-gray-700 text-lg mt-6 leading-relaxed custom-paragraph">
              At Quantum Kids, learning is a joyful, hands-on experience where PLAY is
              not only encouraged but integrated as a powerful tool for discovery and
              development. Through a rich blend of exploration, collaboration, and
              independence, we create a dynamic atmosphere that supports every child’s
              unique journey, fostering a love for learning that lasts a lifetime.
            </p>
          </div>

          {/* Right Column: Diagram */}
          <div className="flex justify-center items-center">
            <div className="relative w-full h-full">
              <video
                src="/flow-pink.mp4"
                className="w-full h-full"
                autoPlay
                loop
                muted
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EarlyEducationSection;
