import Image from "next/image";

const ContactSection = () => {
  return (
    <section className="relative bg-blue-100">
      {/* Image Section with Overlay */}
      <div className="relative">
        <Image
          src="/children-image.png" // Replace with your actual image path
          alt="Children holding hands"
          width={900}
          height={400}
          className="w-full h-auto"
        />
        {/* Text Overlay */}
        <div className="absolute inset-0 flex items-start justify-center pt-10">
          <h1 className="text-5xl font-bold text-white drop-shadow-lg">
            <span className="text-yellow-500">C</span>
            <span className="text-pink-500">o</span>
            <span className="text-blue-500">n</span>
            <span className="text-green-500">t</span>
            <span className="text-purple-500">a</span>
            <span className="text-red-500">c</span>
            <span className="text-orange-500">t</span> Us!
          </h1>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
