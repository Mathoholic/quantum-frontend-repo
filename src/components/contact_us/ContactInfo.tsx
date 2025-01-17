import { FaFacebook, FaInstagram, FaWhatsapp, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

const ContactInfo: React.FC = () => {
  return (
    <div className="flex justify-center items-center bg-[#E8F9FF]">
      <div className="lg:px-8 py-8 bg-white rounded-lg flex flex-col lg:flex-row justify-between w-full lg:max-w-[1440px] gap-4 2xl:max-w-[2000px] 2xl:px-16 2xl:py-12">
        {/* Left Side: Heading, Content, and Social Links Section */}
        <div className="flex flex-col lg:flex-col lg:items-start gap-2 w-full lg:w-1/2 p-2">
          <div className="text-lg text-gray-700 w-full 2xl:w-[700px]">
            <div className="grid grid-cols-2 w-full 2xl:w-[800px]">
              <h2 className=" text-[24px] lg:text-[42px] font-bold lg:leading-[58.53px] col-span-2 font-comic text-left 2xl:text-[44px] 2xl:leading-[70px]">
          Let’s Discuss
              </h2>
              <h2 className="text-[23px] lg:text-[42px] font-bold leading-[58.53px] col-span-2 font-comic text-left 2xl:text-[44px] 2xl:leading-[70px]">
          on something <span className="text-pink-500">cool</span> together
              </h2>
            </div>
          </div>
          <div className="space-y-4 text-md text-gray-700 w-full relative font-outfit lg:text-2xl xl:text-[18px] font-medium lg:leading-[32px] text-left 2xl:w-[550px] 2xl:text-[24px] 2xl:leading-[38px] lg:mt-8">
            <p className="flex items-center">
              <FaEnvelope className="mr-2 lg:mr-4 2xl:mr-3 2xl:text-2xl" />
              <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=contact@quantumkids.in"
          className="text-pink-500 hover:underline"
              >
          contact@quantumkids.in
              </a>
            </p>
            <p className="flex items-center">
              <FaPhoneAlt className="mr-2 lg:mr-4 2xl:mr-3 2xl:text-2xl" />
              <a href="tel:+918971133673" className="text-pink-500 hover:underline">
          +91 8971133673
              </a>
            </p>
            <p className="flex items-start">
              <FaMapMarkerAlt className="mr-2 lg:mr-1 text-lg lg:text-3xl 2xl:mr-4 2xl:text-4xl" />
              <span>
          56, Sy no. 25, Sompura Village,<br/> Sarjapura hobli, Anekal Taluk,
          <br/>
          Bangalore, Karnataka - 562125.
          <br />
          Landmark: ARS Signature Phase 2
              </span>
            </p>
          </div>
          <div className="hidden lg:flex space-x-4 text-pink-500 text-2xl 2xl:text-3xl 2xl:space-x-6 mt-8 lg:mt-auto">
            <a href="https://www.facebook.com/people/Quantumkids-preschool-and-daycare/61571233544577/" className="hover:text-pink-700">
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

        {/* Right Side: Map Section */}
        <div className="w-full lg:w-1/2 px-2 h-[200px] lg:h-[600px] 2xl:h-[700px] mt-4 mb-1 py-10 lg:py-0 lg:mt-0">
          <iframe
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27600.914365740273!2d77.773698!3d12.8648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15bf5829fdf9%3A0xf49138e39c1c3!2s12%C2%B051'53.3%22N%2077%C2%B046'25.3%22E!5e0!3m2!1sen!2sin!4v1673344000000!5m2!1sen!2sin">
          </iframe>

          <div className=" lg:hidden flex space-x-4 text-pink-500 text-2xl 2xl:text-3xl 2xl:space-x-6 mt-8 lg:mt-auto">
            <a href="https://www.facebook.com/people/Quantumkids-preschool-and-daycare/61571233544577/" className="hover:text-pink-700">
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
      </div>
    </div>
  );
};

export default ContactInfo;
