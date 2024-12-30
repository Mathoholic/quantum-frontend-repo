"use client";

import React, { useEffect, useState } from "react";

const FormPage = () => {
  const [formData, setFormData] = useState({
    customId: "",
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    address: "",
    education: "",
    courseInterest: ""
  });

  useEffect(() => {
    // Get customId from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const customId = urlParams.get('customId');
    if (customId) {
      setFormData(prev => ({ ...prev, customId }));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3002/form/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        alert('Form submitted successfully!');
      } else {
        alert('Error submitting form');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting form');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Student Application Form</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Custom ID Field - Read Only */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Custom ID</label>
            <input
              type="text"
              value={formData.customId}
              readOnly
              className="w-full p-2 border rounded-md bg-gray-100"
            />
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
            <input
              type="tel"
              value={formData.mobileNumber}
              onChange={(e) => setFormData(prev => ({ ...prev, mobileNumber: e.target.value }))}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* Address */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <textarea
              value={formData.address}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
              className="w-full p-2 border rounded-md"
              rows={3}
              required
            />
          </div>

          {/* Education */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Education</label>
            <input
              type="text"
              value={formData.education}
              onChange={(e) => setFormData(prev => ({ ...prev, education: e.target.value }))}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* Course Interest */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Course Interest</label>
            <select
              value={formData.courseInterest}
              onChange={(e) => setFormData(prev => ({ ...prev, courseInterest: e.target.value }))}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">Select a course</option>
              <option value="web-development">Web Development</option>
              <option value="data-science">Data Science</option>
              <option value="mobile-development">Mobile Development</option>
              <option value="cloud-computing">Cloud Computing</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormPage;