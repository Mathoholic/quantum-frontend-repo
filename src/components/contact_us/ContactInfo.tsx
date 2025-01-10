import { FaFacebook, FaInstagram, FaWhatsapp, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const ContactInfo: React.FC = () => {
  return (
    <div className="px-16 py-8 bg-[#E8F9FF] rounded-lg flex flex-col max-w-[1288px] gap-6">
      {/* Heading Section */}
      <div className="text-lg text-gray-700 w-[630px] h-[118px]">
        <div className="grid grid-cols-2 w-[630px] h-[118px]">
          <h2 className="text-[42px] font-bold leading-[58.53px] col-span-2 font-comic text-left">
            Let’s Discuss
          </h2>
          <h2 className="text-[42px] font-bold leading-[58.53px] col-span-2 font-comic text-left">
            on something <span className="text-pink-500">cool</span> together
          </h2>
        </div>
      </div>

      {/* Content and Map Section */}
      <div className="flex flex-col md:flex-row items-start md:items-start justify-between w-full gap-20">
        {/* Left Side: Contact Information */}
        <div className="space-y-4 text-md text-gray-700 w-[440px] h-[478px] gap-0 justify-between relative font-outfit text-[20px] font-medium leading-[32px] text-left">
            <p className="flex items-center">
            <FaEnvelope className="mr-2" />
            <a
              href="mailto:contact@quantumkids.in"
              className="text-pink-500 hover:underline"
            >
              contact@quantumkids.in
            </a>
            </p>
            <p className="flex items-center">
            <FaPhone className="mr-2" />
            <a href="tel:+918971133673" className="text-pink-500 hover:underline">
              +91 8971133673
            </a>
            </p>
            <p className="flex items-start">
            <span><FaMapMarkerAlt className="m-1 " /></span>
            <span>
              56, Sy no. 25, Sompura Village, Sarjapura hobli, Anekal Taluk,
              Bangalore, Karnataka - 562125.
              <br />
              Landmark: Next to ARS SIGNATURE Phase 2
            </span>
            </p>
          
          
          <div className="flex space-x-4 text-pink-500 text-2xl absolute bottom-0 left-0">
            <a href="https://www.facebook.com/profile.php?id=61571464794833&mibextid=ZbWKwL" className="hover:text-pink-700">
              <FaFacebook />
            </a>
            <a href="https://www.instagram.com/quantumkidspreschoolanddaycare/" className="hover:text-pink-700">
              <FaInstagram />
            </a>
            <a href="https://wa.me/918971133673" className="hover:text-pink-700">
              <FaWhatsapp />
            </a>
            <a href="https://www.linkedin.com/company/quantum-kids-preschool-and-daycare" className="hover:text-pink-700">
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Right Side: Map */}
        <div className="w-[765px] h-[478px] gap-0">
        <iframe
  width="600"
  height="450"
  style={{ border: 0 }}
  loading="lazy"
  allowFullScreen
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27600.914365740273!2d77.773698!3d12.8648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15bf5829fdf9%3A0xf49138e39c1c3!2s12%C2%B051'53.3%22N%2077%C2%B046'25.3%22E!5e0!3m2!1sen!2sin!4v1673344000000!5m2!1sen!2sin">
</iframe>

        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
