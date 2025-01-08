"use client";
import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { toast, ToastContainer } from "react-toastify";
interface Submission {
  uuid: string;
  customId: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  address: string;
  gender: string;
  submittedAt: string;
  program: string;
  totalYearlyPayment: string;
  firstInstallmentFee: string;
  secondInstallmentFee: string;
  thirdInstallmentFee: string;
  applicantId: string;
  pendingFee:string;
  parentName:string;
  addmissionYear:string;
}

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Submission | null;
}

const ReceiptModal = ({ isOpen, onClose, student }: ReceiptModalProps) => {
  const [totalFee, setTotalFee] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [firstInstallment, setFirstInstallment] = useState('');
  const [secondInstallment, setSecondInstallment] = useState('');
  const [thirdInstallment, setThirdInstallment] = useState('');
  const [loading, setLoading] = useState(false);
   const [isLoading, setGenerateLoader] = useState<boolean>(false);
  const calculateFees = () => {
    const total = parseFloat(totalFee) || 0;
    const discount = parseFloat(discountPercentage) || 0;
    const discountedAmount = total * (1 - discount / 100);
    return discountedAmount;
  };

  const validateInstallments = () => {
  const total = calculateFees();
  const first = parseFloat(firstInstallment) || 0;
  const second = parseFloat(secondInstallment) || 0;
  const third = parseFloat(thirdInstallment) || 0;

  const filledInstallments = [first, second, third].filter((val) => val > 0);

  // Invalid if more than one installment is skipped
  if (filledInstallments.length < 2 && total !== first + second + third) {
    return false;
  }

  return Math.abs(total - (first + second + third)) < 0.01;
};

const setFeeStructure = async () => {
  if (!student) return;
  setGenerateLoader(true);
  // Validate installments
  if (!validateInstallments()) {
    alert(
      'Invalid installment configuration. Ensure the sum matches the total after discount.'
    );
    return;
  }

  const customId = student.customId;
  if (customId) {
    try {
      const response = await fetch(`http://localhost:3002/form/class/receipt?customId=${customId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      setLoading(true);
      debugger;
      const url = result.data
        ? 'http://localhost:3002/form/class/updateReceipt'
        : 'http://localhost:3002/form/class/createReceipt';
      const method = result.data ? 'PATCH' : 'POST';

      const responseSave = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customId: student.customId,
          program: student.program,
          parentName: student.parentName,
          firstName: student.firstName,
          lastName: student.lastName,
          email: student.email,
          mobileNumber: student.mobileNumber,
          totalYearlyPayment: calculateFees().toString(),
          firstInstallment: firstInstallment || '0',
          secondInstallment: secondInstallment || '0',
          thirdInstallment: thirdInstallment || '0',
          applicantId: student.applicantId,
          addmissionYear:student.addmissionYear,
          pendingFee:calculateFees().toString()
        }),
      });

      if (!responseSave.ok) {
        throw new Error('Failed to save fee structure');
      }
    } catch (error) {
      console.error('Error saving fee structure:', error);
      toast.error("Failed to save fee structure");
      setGenerateLoader(false);
    } finally {
      setGenerateLoader(false);
      setLoading(false);
      onClose();
      setTotalFee('');
      setDiscountPercentage('');
      setFirstInstallment('');
      setSecondInstallment('');
      setThirdInstallment('');
      toast.success("Fee Structure Saved Successfully");
    }
  }
};


  if (!isOpen || !student) return null;

  const discountedTotal = calculateFees();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="space-y-6">
          <div className="text-center border-b pb-4">
            <h2 className="text-2xl font-bold">Student Fee Manage</h2>
            <p className="text-gray-500">Receipt Date: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Student Information</h3>
              <p>Name: {student.firstName} {student.lastName}</p>
              <p>Class: {student.program}</p>
              <p>CustomId: {student.customId}</p>
              <p>Applicant Id: {student.applicantId}</p>
            </div>
            <div>
              <h3 className="font-semibold">Contact Information</h3>
              <p>Email: {student.email}</p>
              <p>Phone: {student.mobileNumber}</p>
              <p>Address: {student.address}</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold mb-2">Fee Details</h3>
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left">Description</th>
                  <th className="px-4 py-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">Total Tuition Fee</td>
                  <td className="border px-4 py-2 text-right">
                    <input
                      type="number"
                      value={totalFee}
                      onChange={(e) => setTotalFee(e.target.value)}
                      className="w-full px-2 py-1 border rounded"
                      placeholder="Enter total fee"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Discount Percentage</td>
                  <td className="border px-4 py-2 text-right">
                    <input
                      type="number"
                      value={discountPercentage}
                      onChange={(e) => setDiscountPercentage(e.target.value)}
                      className="w-full px-2 py-1 border rounded"
                      placeholder="Enter discount percentage"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Total After Discount</td>
                  <td className="border px-4 py-2 text-right font-semibold">
                    ₹{discountedTotal.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">First Installment</td>
                  <td className="border px-4 py-2 text-right">
                    <input
                      type="number"
                      value={firstInstallment}
                      onChange={(e) => setFirstInstallment(e.target.value)}
                      className="w-full px-2 py-1 border rounded"
                      placeholder="Enter first installment"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Second Installment</td>
                  <td className="border px-4 py-2 text-right">
                    <input
                      type="number"
                      value={secondInstallment}
                      onChange={(e) => setSecondInstallment(e.target.value)}
                      className="w-full px-2 py-1 border rounded"
                      placeholder="Enter second installment"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Third Installment</td>
                  <td className="border px-4 py-2 text-right">
                    <input
                      type="number"
                      value={thirdInstallment}
                      onChange={(e) => setThirdInstallment(e.target.value)}
                      className="w-full px-2 py-1 border rounded"
                      placeholder="Enter third installment"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Close
            </button>
            <button
              onClick={() => setFeeStructure()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              <span>{isLoading ? <span className="loader mr-2 bg-white"></span> : "Save"}</span>
              {isLoading && <span className="loader-text">Generating...</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ApplicationForm = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Submission | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const classOptions = [
   'Daycare', 'Playgroup','Nursery', 'LKG', 'UKG'
  ];

  const fetchAllData = async () => {
    try {
      setLoading(true);
      debugger;
      const response = await fetch('http://localhost:3002/form/enqueryForm/get');
      const result = await response.json();
      setSubmissions(result.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFilteredData = async () => {
    if (!selectedClass) return;
    
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3002/form/class/get?class=${selectedClass}`);
      const result = await response.json();
      setSubmissions(result.data || []);
    } catch (error) {
      console.error('Error fetching filtered data:', error);
    } finally {
      setLoading(false);
    }
  };
  const [totalFee, setTotalFee] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [loading, setLoading] = useState(false);
  const calculateFees = () => {
    const total = parseFloat(totalFee) || 0;
    const discount = parseFloat(discountPercentage) || 0;
    const discountedAmount = total * (1 - discount / 100);
    
    return {
      total: discountedAmount,
      firstInstallment: Math.round(discountedAmount * 0.4),
      secondInstallment: Math.round(discountedAmount * 0.3),
      thirdInstallment: Math.round(discountedAmount * 0.3)
    };
  };
 

  useEffect(() => {
    fetchAllData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }
  const handleOpenReceipt = async (student:Submission) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
    
  };
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <ToastContainer />
      <ReceiptModal 
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedStudent(null);
        }}
        student={selectedStudent}
      />

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Applicant Form</h2>
        
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
            onClick={fetchFilteredData}
            disabled={!selectedClass}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Filter by Class
          </button>
          
          <button
            onClick={() => {
              setSelectedClass('');
              fetchAllData();
            }}
            className="px-4 py-2 bg-gray-600 text-white rounded-md text-sm hover:bg-gray-700 transition-colors"
          >
            Reset Filter
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
  <div className="inline-block min-w-full align-middle">
    <div className="border rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-medium">
              Custom ID
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-medium">
              Applicant ID
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-medium">
              Program
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-medium">
              Parent Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Gmail
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Number
            </th>
            {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Location
            </th> */}
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Admission Year
            </th>
            {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Submitted At
            </th> */}
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {submissions.map((submission) => (
            <tr key={submission.uuid} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {submission.customId}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div className="text-gray-900 font-medium">{submission.applicantId || '-'}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div className="text-gray-900 font-medium">{submission.program || '-'}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div className="text-gray-900 font-medium">{submission.parentName || '-'}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div className="font-medium">{submission.firstName} {submission.lastName}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                <div>{submission.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div className="text-gray-900 font-medium">{submission.mobileNumber}</div>
              </td>
              {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div className="text-gray-900 font-medium">{'-'}</div>
              </td> */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div className="text-gray-900 font-medium">{submission.addmissionYear}</div>
              </td>
              {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                <div>{new Date(submission.submittedAt).toLocaleDateString()}</div>
              </td> */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <button
                  onClick={() => handleOpenReceipt(submission)}
                  className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Create Fee Receipt
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>

    </div>
  );
};

export default ApplicationForm;