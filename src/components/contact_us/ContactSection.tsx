import Image from "next/image";

const ContactSection = () => {
  return (
    <section className="relative bg-blue-100">
      {/* Image Section with Overlay */}
      <div className="relative">
        <Image
          src="/contactus/contactus.svg" // Replace with your actual image path
          alt="Children holding hands"
          width={900}
          height={400}
          className="w-full h-auto"
        />
        {/* Text Overlay */}
        
      </div>
    </section>
  );
};

export default ContactSection;
