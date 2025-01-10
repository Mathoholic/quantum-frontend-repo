import { FaFacebook, FaInstagram, FaWhatsapp, FaLinkedin } from 'react-icons/fa';

const ContactInfo: React.FC = () => {
  return (
    <div className="px-6 py-8 bg-[#E8F9FF] rounded-lg flex flex-col max-w-[1288px] gap-6">
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
        <div className="space-y-4 text-lg text-gray-700 w-[440px] h-[478px] gap-0 justify-between relative font-outfit text-[20px] font-medium leading-[32px] text-left">
          <p className="flex items-center">
            <span className="mr-2">📧</span>
            <a
              href="mailto:contact@quantumkids.in"
              className="text-pink-500 hover:underline"
            >
              contact@quantumkids.in
            </a>
          </p>
          <p className="flex items-center">
            <span className="mr-2">📞</span>
            <a href="tel:+918971133673" className="text-pink-500 hover:underline">
              +91 8971133673
            </a>
          </p>
          <p className="flex items-start">
            <span className="mr-2">📍</span>
            56, Sy no. 25, Sompura Village, Sarjapura hobli, Anekal Taluk,
            Bangalore, Karnataka - 562125.

            Landmark: Next to ARS SIGNATURE Phase 2
          </p>
          
          <div className="flex space-x-4 text-pink-500 text-2xl absolute bottom-0 left-0">
            <a href="#" className="hover:text-pink-700">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-pink-700">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-pink-700">
              <FaWhatsapp />
            </a>
            <a href="#" className="hover:text-pink-700">
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Right Side: Map */}
        <div className="w-[765px] h-[478px] gap-0">
          <iframe
            src="https://www.google.com/maps/place/12.864800,77.773698/data=!4m6!3m5!1s0!7e2!8m2!3d12.864799999999999!4d77.773698?entry=gps&coh=192189&g_ep=CAESBzI0LjQ5LjYYACCenQoqkAEsOTQyMjYwNDYsOTQyNDI1ODksOTQyMjMyOTksOTQyMTY0MTMsOTQyMTI0OTYsOTQyMDczOTQsOTQyMDc1MDYsOTQyMDg1MDYsOTQyMTc1MjMsOTQyMTg2NTMsOTQyMjgyMDQsOTQyMjk4MzksOTQyMzkxMjcsNDcwODcxMTgsNDcwODQzOTMsOTQyMTMyMDBCAklO"
            className="w-full h-full rounded-tl-[12px] border shadow-sm"
            loading="lazy"
            title="Location Map"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
