import ContactForm from "@/components/contact_us/ContactForm";
import ContactInfo from "@/components/contact_us/ContactInfo";
import ContactSection from "@/components/contact_us/ContactSection";

const Contact = () => {
    return (
      <div className="min-h-screen bg-blue-100">
        {/* Top Section */}
        <ContactSection />
        {/* Main Content */}
        <div className="min-h-screen bg-[#E8F9FF] flex items-center justify-center">
      <div className="w-full  max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* Left Side */}
        <ContactInfo />
        {/* Right Side */}
        <ContactForm />
      </div>
    </div>
      </div>
    );
  };
  
  export default Contact;