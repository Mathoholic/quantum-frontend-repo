"use client";

import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CheckCircle, Loader } from "lucide-react";

const FormPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setFormFlag] = useState(true);
  const [formData, setFormData] = useState({
    customId: "",
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    address: "",
    education: "",
    gender: "",
    class: "" 
  });
  const classOptions = [
    "Nursery",
    "LKG",
    "UKG",
    "Class 1",
    "Class 2",
    "Class 3",
    "Class 4",
    "Class 5",
    "Class 6",
    "Class 7",
    "Class 8",
    "Class 9",
    "Class 10"
  ];

  const checkUserFilledForm = async (customId: string) => {
    if (!customId) {
      setIsLoading(false);
      return false;
    }
    
    try {
      const response = await fetch(`http://localhost:3002/form/enqueryForm/find?customId=${customId}`);
      const result = await response.json();

     
      if (result.data === true) {
        setFormFlag(false); 
        return true; 
      } else {
        setFormFlag(true);
        return false;
      }
    } catch (error) {
      console.error('Error:', error);
      setFormFlag(true);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const initializeForm = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const customId = urlParams.get('customId') || '';
      
      const hasFilledForm = await checkUserFilledForm(customId);
      
      if (!hasFilledForm && customId) {
        setFormData(prev => ({ ...prev, customId }));
      }
    };

    initializeForm();
  }, []);

  const showSuccessToast = () => {
    toast.success('Form submitted successfully!', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:3002/form/enqueryForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setFormData({
          customId: "",
          firstName: "",
          lastName: "",
          email: "",
          mobileNumber: "",
          address: "",
          education: "",
          gender: "",
          class:""
        });
        setFormFlag(false);
        showSuccessToast();
      } else {
        toast.error('Error submitting form');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error submitting form');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center">
          <Loader className="w-12 h-12 text-blue-600 animate-spin mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <ToastContainer />
      {showForm ? (
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6 text-center">Student Application Form</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Form fields remain the same */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Custom ID</label>
              <input
                type="text"
                value={formData.customId}
                readOnly
                className="w-full p-2 border rounded-md bg-gray-100"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Class</label>
              <select
                value={formData.class}
                onChange={(e) => setFormData(prev => ({ ...prev, class: e.target.value }))}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="">Select Class</option>
                {classOptions.map((classOption) => (
                  <option key={classOption} value={classOption}>
                    {classOption}
                  </option>
                ))}
              </select>
            </div>
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

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <input
                type="text"
                value={formData.gender}
                onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value }))}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin mr-2" />
                  Submitting...
                </>
              ) : (
                'Submit Application'
              )}
            </button>
          </form>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col items-center">
            <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
            <h1 className="text-2xl font-bold mb-2 text-center">Form Already Submitted</h1>
            <p className="text-gray-600 text-center">You have already submitted the form. Thank you!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormPage;