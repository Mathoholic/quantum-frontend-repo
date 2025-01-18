"use client";
import React, { useState } from "react";

const CommonForm = ({ onSubmit }: any) => {
  const [formData, setFormData] = useState({
    childName: "",
    parentName: "",
    location: "",
    email: "",
    mobileNumber: "",
    program: "",
    type: "raw",
    isChecked: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); // State to manage submission status
  interface FormErrors {
    childName: string;
    parentName: string;
    location: string;
    email: string;
    mobileNumber: string;
    program: string;
    isChecked: string;
  }

  const [errors, setErrors] = useState<FormErrors>({
    childName: "",
    parentName: "",
    location: "",
    email: "",
    mobileNumber: "",
    program: "",
    isChecked: "",
  });

  const currentYear = 2025;
  const nextYear = currentYear + 1;

  const programs = ["Daycare", "Playgroup", "Nursery", "LKG", "UKG"];

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    const newErrors = { ...errors };
    Object.keys(newErrors).forEach((key) => {
      newErrors[key as keyof FormErrors] = "";
    });
    setErrors(newErrors);
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = { ...errors };

    // Clear previous errors
    Object.keys(newErrors).forEach((key) => {
      newErrors[key as keyof FormErrors] = "";
    });

    // Validate required fields
    if (!formData.childName) {
      newErrors.childName = "Child name is required.";
      valid = false;
    }

    if (!formData.parentName) {
      newErrors.parentName = "Parent name is required.";
      valid = false;
    }

    if (!formData.location) {
      newErrors.location = "Location is required.";
      valid = false;
    }

    if (!formData.email) {
      newErrors.email = "Email is required.";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }

    if (!formData.mobileNumber) {
      newErrors.mobileNumber = "Phone number is required.";
      valid = false;
    } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Please enter a valid 10-digit phone number.";
      valid = false;
    }

    if (!formData.program) {
      newErrors.program = "Program selection is required.";
      valid = false;
    }

    if (!formData.isChecked) {
      newErrors.isChecked = "You must agree to receive messages on WhatsApp.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Validate the form before submitting
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await fetch("https://api.quantumkids.in/form/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true); // Set submission status to true
        setFormData({
          childName: "",
          parentName: "",
          location: "",
          email: "",
          mobileNumber: "",
          program: "",
          type: "raw",
          isChecked: false,
        });
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 h-fit ">
      {isSubmitted ? (
        <div className="text-green-500 text-lg font-semibold">
          Thank you for your submission! We will contact you soon.
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-2">
            <span className="text-red-400">Signup Now </span> for{" "}
            <span className="text-blue-400">AY</span>{" "}
            <span className="text-green-500">
              {" "}
              {currentYear}-{String(nextYear).slice(-2)}
            </span>
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-pink-400 mb-6">
            Fill the form below and we'll get in touch shortly!
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                name="childName"
                value={formData.childName}
                onChange={handleChange}
                placeholder="Child Name"
                className="w-full p-1 sm:p-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                required
              />
              {errors.childName && <p className="text-red-500 text-xs">{errors.childName}</p>}

              <input
                type="text"
                name="parentName"
                value={formData.parentName}
                onChange={handleChange}
                placeholder="Parent Name"
                className="w-full p-1 sm:p-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                required
              />
              {errors.parentName && <p className="text-red-500 text-xs">{errors.parentName}</p>}

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Area you're located in"
                className="w-full sm:col-span-2 p-1 sm:p-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                required
              />
              {errors.location && <p className="text-red-500 text-xs">{errors.location}</p>}

              <div className="relative col-span-1 sm:col-span-2">
                <input
                  type="tel"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full p-1 sm:p-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                  required
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  📞
                </span>
              </div>
              {errors.mobileNumber && <p className="text-red-500 text-xs">{errors.mobileNumber}</p>}

              <div className="relative col-span-1 sm:col-span-2">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Id"
                  className="w-full p-1 sm:p-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                  required
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  ✉️
                </span>
              </div>
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

              <select
                name="program"
                value={formData.program}
                onChange={handleChange}
                className="w-full p-1 sm:p-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all appearance-none col-span-1 sm:col-span-2"
                required
              >
                <option value="">Select Program</option>
                {programs.map((program) => (
                  <option key={program} value={program}>
                    {program}
                  </option>
                ))}
              </select>
              {errors.program && <p className="text-red-500 text-xs">{errors.program}</p>}

              <label className="flex items-center space-x-2 col-span-1 sm:col-span-2">
                <input
                  type="checkbox"
                  name="isChecked"
                  checked={formData.isChecked}
                  onChange={handleChange}
                  className="rounded text-blue-500"
                />
                <span className="text-gray-700 text-xs sm:text-sm">
                  I agree to receive messages on WhatsApp
                  <img
                    src="/watsappLogo.png"
                    alt="WhatsApp"
                    className="inline-block w-4 h-4 sm:w-5 sm:h-5 ml-2"
                  />
                </span>
              </label>
              {errors.isChecked && <p className="text-red-500 text-xs">{errors.isChecked}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-red-400 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-full hover:bg-red-500 transition-colors duration-300 flex items-center justify-center space-x-2 group ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-white animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4zm2 5.29a7.978 7.978 0 01-1.71-1.71L10 12v7a8 8 0 01-4-1.71z"
                    ></path>
                  </svg>
                  <span className="text-xs sm:text-sm">Submitting...</span>
                </div>
              ) : (
                <>
                  <span className="text-xs sm:text-sm">Submit</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </>
              )}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default CommonForm;
