
"use client";
import React, { useState, useEffect } from "react";
import { Download } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";

interface StudentData {
  uuid: string;
  firstName: string;
  lastName: string;
  email: string;
  class: string;
  mobileNumber: string;
  totalYearlyPayment: string;
  firstInstallment: string;
  secondInstallment: string;
  thirdInstallment: string;
  customId: string;
}

const FeeDetails = () => {
  const [feeData, setFeeData] = useState<StudentData[]>([]);
  const [filteredData, setFilteredData] = useState<StudentData[]>([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInstallment, setSelectedInstallment] = useState<string>("");
  const [customIdInput, setCustomIdInput] = useState<string>("");

  const fetchFeeDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:3002/form/getAllClass/receipt");
      const result = await response.json();
      
      const dataArray = Array.isArray(result.data) ? result.data :
                       result.data && typeof result.data === 'object' ? [result.data] :
                       [];
      
      setFeeData(dataArray);
      setFilteredData(dataArray);
    } catch (error) {
      console.error("Error fetching fee details:", error);
      setError("Failed to fetch fee details");
      setFeeData([]);
      setFilteredData([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchFeeDetailsByClass = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:3002/form/getClassName?class=${encodeURIComponent(selectedClass)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      const dataArray = Array.isArray(result.data) ? result.data :
                       result.data && typeof result.data === 'object' ? [result.data] :
                       [];

      setFeeData(dataArray);
      setFilteredData(dataArray);
    } catch (error) {
      console.error("Error fetching fee details:", error);
      setError(`Failed to fetch details for class ${selectedClass}`);
      setFeeData([]);
      setFilteredData([]);
    } finally {
      setLoading(false);
    }
  };

  const generateReceipt = async () => {
    if (!customIdInput || !selectedInstallment) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3002/form/generate-receipt/${customIdInput}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ installmentNumber: parseInt(selectedInstallment) }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate receipt');
      }

      const result = await response.json();
      toast.success("Receipt generated successfully!");
      closeModal();
      fetchFeeDetails(); // Refresh the data
    } catch (error) {
      console.error('Error generating receipt:', error);
      toast.error("Failed to generate receipt");
    }
  };

  useEffect(() => {
    fetchFeeDetails();
  }, []);

  const getCSVFile = async () => {
    try {
      const response = await fetch("http://localhost:3002/form/fee/details/csv", {
        method: "GET",
        headers: {
          "Content-Type": "text/csv",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "fee-details.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error("Error fetching the CSV file:", error);
      toast.error("Failed to download CSV file");
    }
  };

  const classOptions = [
    "Nursery", "LKG", "UKG",
    "Class 1", "Class 2", "Class 3",
    "Class 4", "Class 5", "Class 6"
  ];

  const openModal = (customId: string) => {
    setCustomIdInput(customId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCustomIdInput("");
    setSelectedInstallment("");
  };

  return (
    <div className="w-full p-6 bg-white shadow-md rounded-lg relative">
      <ToastContainer />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Fee Details</h1>
        <button
          onClick={getCSVFile}
          className="px-4 py-2 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200 flex items-center gap-2 shadow-sm"
        >
          <Download className="h-4 w-4" />
          Download CSV
        </button>
      </div>

      <div className="mb-6">
        <div className="flex gap-4 mb-4">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-4 py-2 border rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Class</option>
            {classOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          
          <button
            onClick={fetchFeeDetailsByClass}
            disabled={!selectedClass || loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Loading...' : 'Filter by Class'}
          </button>
          
          <button
            onClick={() => {
              setSelectedClass('');
              fetchFeeDetails();
            }}
            disabled={loading}
            className="px-4 py-2 bg-gray-600 text-white rounded-md text-sm hover:bg-gray-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Reset Filter
          </button>
        </div>
        
        {error && (
          <div className="text-red-500 mt-2">{error}</div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Custom ID</th>
              <th className="p-3 text-left">Class</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Mobile</th>
              <th className="p-3 text-left">First Installment</th>
              <th className="p-3 text-left">Second Installment</th>
              <th className="p-3 text-left">Third Installment</th>
              <th className="p-3 text-left">First Installment Status</th>
              <th className="p-3 text-left">Second Installment Status</th>
              <th className="p-3 text-left">Third Installment Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={12} className="text-center p-4">Loading...</td>
              </tr>
            ) : filteredData.length === 0 ? (
              <tr>
                <td colSpan={12} className="text-center p-4">No data found</td>
              </tr>
            ) : (
              filteredData.map((row) => (
                <tr key={row.uuid} className="border-b">
                  <td className="p-3">{row.customId}</td>
                  <td className="p-3">{row.class}</td>
                  <td className="p-3">{`${row.firstName} ${row.lastName}`}</td>
                  <td className="p-3">{row.email}</td>
                  <td className="p-3">{row.mobileNumber}</td>
                  <td className="p-3">{row.firstInstallment}</td>
                  <td className="p-3">{row.secondInstallment}</td>
                  <td className="p-3">{row.thirdInstallment}</td>
                  <td className="p-3"></td>
                  <td className="p-3"></td>
                  <td className="p-3"></td>
                  <td className="p-3">
                    <button
                      onClick={() => openModal(row.customId)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors"
                    >
                      Generate Receipt
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Custom Modal */}
      {isModalOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeModal}
          />
          
          {/* Modal Content */}
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl z-50 w-96">
            <h2 className="text-xl font-semibold mb-4">Generate Receipt</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Custom ID
              </label>
              <input
                type="text"
                value={customIdInput}
                onChange={(e) => setCustomIdInput(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Custom ID"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Installment
              </label>
              <select
                value={selectedInstallment}
                onChange={(e) => setSelectedInstallment(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Installment</option>
                <option value="1">Installment 1</option>
                <option value="2">Installment 2</option>
                <option value="3">Installment 3</option>
              </select>
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={generateReceipt}
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors"
              >
                Generate
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FeeDetails;