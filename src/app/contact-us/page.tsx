"use client"
import React, { useState } from 'react';
import { X } from 'lucide-react';
import CommonForm from "@/components/common_form";
import ContactInfo from "@/components/contact_us/ContactInfo";
import ContactSection from "@/components/contact_us/ContactSection";

const Contact = () => {
  const [showCommonForm, setShowCommonForm] = useState(true);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleFormSubmit = () => {
    setIsFormSubmitted(true);
    setShowCommonForm(false);
  };

  const toggleForm = () => {
    setShowCommonForm(!showCommonForm);
  };

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

      <div
        className={`fixed top-0 left-0 h-full w-full bg-black/50 transition-opacity duration-300 ${
          showCommonForm ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleForm}
      >
        <div
          className={`fixed top-1/2 left-1/2 transform -translate-y-1/2 bg-white rounded-lg shadow-xl transition-all duration-500 ease-in-out ${
            showCommonForm 
              ? '-translate-x-1/2 opacity-100' 
              : '-translate-x-full opacity-0'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={toggleForm}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>

          <div className="p-6">
            <CommonForm onSubmit={handleFormSubmit} />
          </div>
        </div>
      </div>

      {!showCommonForm && !isFormSubmitted && (
        <button
          onClick={toggleForm}
          className="fixed left-4 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition-colors"
        >
          Open Form
        </button>
      )}
    </div>
  );
};

export default Contact;
