"use client";
import React from 'react';
import ContactInfo from "@/components/contact_us/ContactInfo";
import ContactSection from "@/components/contact_us/ContactSection";

const Contact = () => {
  return (
    <div className="min-h-screen bg-blue-100 relative overflow-hidden">
      {/* Top Section */}
      <ContactSection />
      {/* Main Content */}
      <div className="bg-[#E8F9FF] flex items-center justify-center">
        <div className="w-full px-8 py-12">
          {/* Centered Contact Info */}
          <ContactInfo />
        </div>
      </div>
    </div>
  );
};

export default Contact;