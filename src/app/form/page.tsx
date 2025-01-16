"use client";

import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CheckCircle, Loader } from "lucide-react";

interface FormData {
  customId: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  primaryContactName: string;
  program: string;
  addmissionYear: string;
  parentName:string;
}

interface Errors {
  email: string;
  mobileNumber: string;
}

interface TouchedFields {
  email: boolean;
  mobileNumber: boolean;
}

const FormPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setFormFlag] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);
  const [userApplicationId ,setUserApplicationId] = useState("")
  const [touchedFields, setTouchedFields] = useState<TouchedFields>({
    email: false,
    mobileNumber: false
  });

  const [formData, setFormData] = useState<FormData>({
    customId: "",
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    primaryContactName: "",
    program: "",
    parentName: "",
    addmissionYear: ""
  });

  const [errors, setErrors] = useState<Errors>({
    email: "",
    mobileNumber: ""
  });

  const validateField = (name: string, value: string): string => {
    if (!touchedFields[name as keyof TouchedFields]) return "";

    switch (name) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !value 
          ? "Email is required"
          : !emailRegex.test(value) 
          ? "Please enter a valid email address" 
          : "";
      
      case 'mobileNumber':
        const mobileRegex = /^[0-9]{10}$/;
        return !value 
          ? "Mobile number is required"
          : !mobileRegex.test(value) 
          ? "Please enter a valid 10-digit mobile number" 
          : "";
      
      default:
        return "";
    }
  };

  const validateForm = () => {
    const allFieldsTouched = {
      email: true,
      mobileNumber: true
    };
    setTouchedFields(allFieldsTouched);

    const newErrors = {
      email: validateField('email', formData.email),
      mobileNumber: validateField('mobileNumber', formData.mobileNumber)
    };

    setErrors(newErrors);

    const isValid = Object.values(formData).every(value => value !== "") &&
                   Object.values(newErrors).every(error => error === "");
    
    setIsFormValid(isValid);
    return isValid;
  };

  const handleBlur = (fieldName: keyof TouchedFields) => {
    setTouchedFields(prev => ({
      ...prev,
      [fieldName]: true
    }));
    
    const error = validateField(fieldName, formData[fieldName]);
    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));
  };

  useEffect(() => {
    if (Object.values(touchedFields).some(touched => touched)) {
      validateForm();
    }
  }, [formData]);

  const checkUserFilledForm = async (customId: string) => {
    if (!customId) {
      setIsLoading(false);
      return false;
    }
    
    try {
      const response = await fetch(`http://208.109.214.146:3002/form/enqueryForm/find?customId=${customId}`);
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
      const program = urlParams.get('program') || '';
      const parentName = urlParams.get('parentName') || '';
      
      const hasFilledForm = await checkUserFilledForm(customId);
      
      if (!hasFilledForm && customId) {
        setFormData(prev => ({
          ...prev,
          customId,
          program,
          parentName
        }));
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
    
    if (!validateForm()) {
      toast.error('Please fill all fields correctly');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch('http://208.109.214.146:3002/form/enqueryForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        const respData = await response.json(); 
        setFormData({
          customId: "",
          firstName: "",
          lastName: "",
          email: "",
          mobileNumber: "",
          primaryContactName: "",
          program: "",
          addmissionYear: "",
          parentName: "",
        });
        setUserApplicationId(respData.data.applicantId); 
        setFormFlag(false);
        showSuccessToast();
      } else {
        console.error("Failed to submit form:", response.statusText);
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
  const downLoadPDF = () => {
   
    const pdfPath = "/ApplicationPdf/admission-form.pdf"; 
    const link = document.createElement("a");
    link.href = pdfPath;
    link.download = "Application.pdf"; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <ToastContainer />
      {showForm ? (
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6 text-center">Student Application Form</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Enquiry ID</label>
              <input
                type="text"
                value={formData.customId}
                readOnly
                className="w-full p-2 border rounded-md bg-gray-100"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Program *</label>
              <input
                type="text"
                value={formData.program}
                readOnly
                className="w-full p-2 border rounded-md bg-gray-100"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Parent Name *</label>
              <input
                type="text"
                value={formData.parentName}
                readOnly
                className="w-full p-2 border rounded-md bg-gray-100"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">First Name *</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Last Name *</label>
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
              <label className="block text-sm font-medium text-gray-700">Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                onBlur={() => handleBlur('email')}
                className={`w-full p-2 border rounded-md ${touchedFields.email && errors.email ? 'border-red-500' : ''}`}
                required
              />
              {touchedFields.email && errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Primary Contact Name *</label>
              <input
                type="text"
                value={formData.primaryContactName}
                onChange={(e) => setFormData(prev => ({ ...prev, primaryContactName: e.target.value }))}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Admission Year *</label>
              <input
                type="text"
                value={formData.addmissionYear}
                onChange={(e) => setFormData(prev => ({ ...prev, addmissionYear: e.target.value }))}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
              </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Mobile Number *</label>
              <input
                type="tel"
                value={formData.mobileNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                  setFormData(prev => ({ ...prev, mobileNumber: value }));
                }}
                onBlur={() => handleBlur('mobileNumber')}
                className={`w-full p-2 border rounded-md ${touchedFields.mobileNumber && errors.mobileNumber ? 'border-red-500' : ''}`}
                required
              />
              {touchedFields.mobileNumber && errors.mobileNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.mobileNumber}</p>
              )}
            </div>

            <button
              type="submit"
              className={`w-full py-2 px-4 rounded-md transition-colors flex items-center justify-center ${
                isFormValid 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              disabled={!isFormValid || isLoading}
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
        <div className="flex flex-col items-center text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Form Submitted</h1>
          <p className="text-gray-600 mb-4">You have successfully submitted the form. Thank you!</p>
  
          <div className="bg-gray-100 p-4 rounded-lg shadow-inner mb-4 w-full">
            <h2 className="text-lg font-semibold text-gray-800">
              Your Application ID:
              <span className="text-blue-600 font-bold"> {userApplicationId ? userApplicationId: '-'}</span>
            </h2>
          </div>
  
          <button
            onClick={downLoadPDF}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-300"
          >
            Download Your Application 
          </button>
        </div>
      </div>
      )}
    </div>
  );
};

export default FormPage;