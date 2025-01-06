"use client";
import React, { useState, useEffect } from "react";
import { Check, Download } from "lucide-react";
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
  applicantId: string;
  pendingFee:string;

}

interface FeeDetailsProps {
  customId: string;
  applicantId: string;
  firstName: string;
  lastName: string;
  class: string;
  firstInstallment: string;
  firstInstallmentDate: string | null;
  secondInstallment: string;
  secondInstallmentDate: string | null;
  thirdInstallment: string;
  thirdInstallmentDate: string | null;
  pendingFee:string;
  totalYearlyPayment: string;
}

const FeeDetails = () => {
  const [feeData, setFeeData] = useState<StudentData[]>([]);
  const [receiptInfo, setReceiptInfo] = useState<FeeDetailsProps[]>([]);
  const [filteredData, setFilteredData] = useState<StudentData[]>([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoading, setGenerateLoader] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkResponse, setCheckResponse] = useState(false);
  const [userClassName ,setUserClassName] = useState<string>("");
  
  const [selectedInstallments, setSelectedInstallments] = useState<string[]>(
    []
  );
  const [firstInstallmentDate, setFirstInstallmentDate] = useState<
    string | null
  >(null);
  const [secondInstallmentDate, setSecondInstallmentDate] = useState<
    string | null
  >(null);
  const [thirdInstallmentDate, setThirdInstallmentDate] = useState<
    string | null
  >(null);
  const [customIdInput, setCustomIdInput] = useState<string>("");
  const [applicantId, setApplicationId] = useState<string>("");
  const [userPendingFee,setuserPendingFee] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const getAvailableInstallments = (customId: string) => {
    const studentData = filteredData.find(
      (student) => student.customId === customId
    );
    const receiptData = receiptInfo.find((r) => r.customId === customId);

    if (!studentData) return [];

    const installments = [];

    if (
      studentData.firstInstallment &&
      parseFloat(studentData.firstInstallment) > 0 &&
      !receiptData?.firstInstallmentDate
    ) {
      installments.push("1");
    }

    if (
      studentData.secondInstallment &&
      parseFloat(studentData.secondInstallment) > 0 &&
      !receiptData?.secondInstallmentDate
    ) {
      installments.push("2");
    }

    if (
      studentData.thirdInstallment &&
      parseFloat(studentData.thirdInstallment) > 0 &&
      !receiptData?.thirdInstallmentDate
    ) {
      installments.push("3");
    }

    return installments;
  };

  const fetchFeeDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "http://localhost:3002/form/getAllClass/receipt"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      const dataArray = Array.isArray(result.data)
        ? result.data
        : [result.data];
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

  const fetchReceiptGeneratedData = async () => {
    try {
      const response = await fetch(
        "http://localhost:3002/fee-receipt-generate"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setReceiptInfo(Array.isArray(data) ? data : [data]);
    } catch (error) {
      console.error("Error fetching receipt data:", error);
      toast.error("Failed to fetch receipt information");
    }
  };

  const getInstallmentStatus = (
    customId: string,
    installmentNumber: number
  ) => {
    const receipt = receiptInfo.find((r) => r.customId === customId);
    if (!receipt) return "Pending";

    const dateField =
      installmentNumber === 1
        ? receipt.firstInstallmentDate
        : installmentNumber === 2
        ? receipt.secondInstallmentDate
        : receipt.thirdInstallmentDate;

    return dateField
      ? `Paid on ${new Date(dateField).toLocaleDateString()}`
      : "Pending";
  };

  const fetchFeeDetailsByClass = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:3002/form/getClassName?class=${encodeURIComponent(
          selectedClass
        )}`,
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

      const dataArray = Array.isArray(result.data)
        ? result.data
        : result.data && typeof result.data === "object"
        ? [result.data]
        : [];

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
  type FeeReceiptResponse = {
    uuid: string;
    customId: string;
    firstInstallment: string;
    firstInstallmentDate: string;
    secondInstallment: string | null;
    secondInstallmentDate: string | null;
    thirdInstallment: string | null;
    thirdInstallmentDate: string;
  };
  // const generateReceipt = async () => {
  //   if (!customIdInput || selectedInstallments.length === 0 || !date) {
  //     toast.error("Please fill in all required fields");
  //     return;
  //   }

  //   try {
  //     const studentData = filteredData.find(
  //       (student) => student.customId === customIdInput
  //     );

  //     if (!studentData) {
  //       toast.error("Student data not found");
  //       return;
  //     }

  //     const payload = {
  //       customId: customIdInput,
  //       firstInstallment: studentData.firstInstallment || "0",
  //       firstInstallmentDate: selectedInstallments.includes("1")
  //         ? date
  //         : firstInstallmentDate,
  //       secondInstallment: studentData.secondInstallment || "0",
  //       secondInstallmentDate: selectedInstallments.includes("2")
  //         ? date
  //         : secondInstallmentDate,
  //       thirdInstallment: studentData.thirdInstallment || "0",
  //       thirdInstallmentDate: selectedInstallments.includes("3")
  //         ? date
  //         : thirdInstallmentDate,
  //     };

  //     console.log("Payload:", payload);

  //     const response = await fetch(
  //       `http://localhost:3002/fee-receipt-generate?customId=${customIdInput}`,
  //       {
  //         method: checkResponse ? "PATCH" : "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(payload),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error(`Failed to generate receipt: ${response.statusText}`);
  //     }

  //     const result = await response.json();
  //     console.log("Response:", result);
  //     toast.success("Receipt generated successfully!");
  //     closeModal();
  //     fetchFeeDetails();
  //     fetchReceiptGeneratedData();
  //   } catch (error) {
  //     console.error("Error generating receipt:", error);
  //     toast.error("Failed to generate receipt");
  //   }
  // };
  const generateReceipt = async () => {
    setGenerateLoader(true);
    if (!customIdInput || selectedInstallments.length === 0 || !date) {
      setGenerateLoader(false);
      toast.error("Please fill in all required fields");
      return;
    }
  
    try {
      const studentData = filteredData.find(
        (student) => student.customId === customIdInput
      );
      if (!studentData) {
        toast.error("Student data not found");
        return;
      }
  
      const fullName = name.trim().split(" ");
      const firstName = fullName[0];
      const lastName = fullName.slice(1).join(" ") || "";
  
      // Determine the starting pending fee
      const previousReceipt = receiptInfo.find(r => r.customId === customIdInput);
      const initialPendingFee = previousReceipt 
        ? parseFloat(previousReceipt.pendingFee || "0") 
        : parseFloat(studentData.pendingFee || "0");
  
      // Calculate the new pending fee
      const pendingFee = String(
        initialPendingFee -
        (selectedInstallments.includes("1") ? parseFloat(studentData.firstInstallment) : 0) -
        (selectedInstallments.includes("2") ? parseFloat(studentData.secondInstallment) : 0) -
        (selectedInstallments.includes("3") ? parseFloat(studentData.thirdInstallment) : 0)
      );
  
      // const payload = {
      //   customId: customIdInput,
      //   applicantId: applicantId,
      //   firstName: firstName,
      //   lastName: lastName,
      //   class: userClassName,
      //   firstInstallment: selectedInstallments.includes("1")
      //     ? studentData.firstInstallment
      //     : "0",
      //   firstInstallmentDate: selectedInstallments.includes("1")
      //     ? date
      //     : firstInstallmentDate,
      //   secondInstallment: selectedInstallments.includes("2")
      //     ? studentData.secondInstallment
      //     : "0",
      //   secondInstallmentDate: selectedInstallments.includes("2")
      //     ? date
      //     : secondInstallmentDate,
      //   thirdInstallment: selectedInstallments.includes("3")
      //     ? studentData.thirdInstallment
      //     : "0",
      //   thirdInstallmentDate: selectedInstallments.includes("3")
      //     ? date
      //     : thirdInstallmentDate,
      //   totalYearlyPayment: studentData.totalYearlyPayment,
      //   pendingFee: pendingFee,
      // };
      const payload = {
        customId: customIdInput,
        applicantId: applicantId,
        firstName: firstName,
        lastName: lastName,
        class: userClassName,
        firstInstallment: selectedInstallments.includes("1")
          ? studentData.firstInstallment
          : previousReceipt?.firstInstallment || studentData.firstInstallment,
        firstInstallmentDate: selectedInstallments.includes("1")
          ? date
          : previousReceipt?.firstInstallmentDate || firstInstallmentDate,
        secondInstallment: selectedInstallments.includes("2")
          ? studentData.secondInstallment
          : previousReceipt?.secondInstallment || studentData.secondInstallment,
        secondInstallmentDate: selectedInstallments.includes("2")
          ? date
          : previousReceipt?.secondInstallmentDate || secondInstallmentDate,
        thirdInstallment: selectedInstallments.includes("3")
          ? studentData.thirdInstallment
          : previousReceipt?.thirdInstallment || studentData.thirdInstallment,
        thirdInstallmentDate: selectedInstallments.includes("3")
          ? date
          : previousReceipt?.thirdInstallmentDate || thirdInstallmentDate,
        totalYearlyPayment: studentData.totalYearlyPayment,
        pendingFee: pendingFee,
      };
      const response = await fetch(
        `http://localhost:3002/fee-receipt-generate?customId=${customIdInput}`,
        {
          method: checkResponse ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
  
      if (!response.ok) {
        throw new Error(`Failed to generate receipt: ${response.statusText}`);
      }
  
      const result = await response.json();
      setGenerateLoader(false);
      toast.success("Receipt generated successfully!");


     if(result){
        try {
          const pdfResponse = await fetch(
            `http://localhost:3002/fee-receipt-generate/getReceipt?customId=${customIdInput}&applicantId=${applicantId}`,
            {
              method: 'GET',
              headers: {
                'Accept': 'application/pdf', 
              },
            }
          );
      
          if (!pdfResponse.ok) {
            throw new Error(`HTTP error! status: ${pdfResponse.status}`);
          }
          const blob = await pdfResponse.blob();
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `receipt-${customIdInput}.pdf`; 
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
      
        } catch (error) {
          console.error('Error downloading receipt:', error);
          throw new Error('Failed to download receipt. Please try again.');
        }
     }
      
      closeModal();
      fetchFeeDetails();
      fetchReceiptGeneratedData();
    } catch (error) {
      console.error("Error generating receipt:", error);
      toast.error("Failed to generate receipt");
      setGenerateLoader(false);
    }
  };
  
  useEffect(() => {
    fetchFeeDetails();
    fetchReceiptGeneratedData();
  }, []);

  const getCSVFile = async () => {
    try {
      const response = await fetch(
        "http://localhost:3002/fee-receipt-generate/fee/details/csv",
        {
          method: "GET",
          headers: {
            "Content-Type": "text/csv",
          },
        }
      );

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
    "Nursery",
    "LKG",
    "UKG",
    "Class 1",
    "Class 2",
    "Class 3",
    "Class 4",
    "Class 5",
    "Class 6",
  ];

  const openModal = async (
    customId: string,
    name: string,
    applicantId: string,
    className :string
  ) => {

    setCustomIdInput(customId);
    setName(name);
    setApplicationId(applicantId);
    setUserClassName(className);

    let checkResponse;
    try {
      checkResponse = await fetch(
        `http://localhost:3002/fee-receipt-generate/byId?customId=${customId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      debugger;
      if (checkResponse.ok) {
        checkResponse = await checkResponse.json();
        setCheckResponse(true);
        setFirstInstallmentDate(checkResponse.firstInstallmentDate);
        setSecondInstallmentDate(checkResponse.secondInstallmentDate);
        setThirdInstallmentDate(checkResponse.thirdInstallmentDate);
      } else {
        setCheckResponse(false);
      }
    } catch (error) {
      console.error("Error fetching receipt data:", error);
      toast.error("Failed to fetch receipt data");
      return;
    }

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setDate("");
    setCustomIdInput("");
    setSelectedInstallments([]);
  };

  const filledInstallments: Record<"1" | "2" | "3", string | null> = {
    "1": firstInstallmentDate,
    "2": secondInstallmentDate,
    "3": thirdInstallmentDate,
  };
  const areAllInstallmentsPaid = (customId: string): boolean => {
    const receiptData = receiptInfo.find((r) => r.customId === customId);
    const studentData = filteredData.find(
      (student) => student.customId === customId
    );

    if (!receiptData || !studentData) return false;

    const hasFirst = parseFloat(studentData.firstInstallment) > 0;
    const hasSecond = parseFloat(studentData.secondInstallment) > 0;
    const hasThird = parseFloat(studentData.thirdInstallment) > 0;

    return Boolean(
      (!hasFirst || receiptData.firstInstallmentDate) &&
      (!hasSecond || receiptData.secondInstallmentDate) &&
      (!hasThird || receiptData.thirdInstallmentDate)
    );
  };
  return (
    <div className="w-full p-6 bg-white shadow-md rounded-lg relative">
      <ToastContainer />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Fee Details</h1>
        {/* <button
          onClick={getCSVFile}
          className="px-4 py-2 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200 flex items-center gap-2 shadow-sm"
        >
          <Download className="h-4 w-4" />
          Download CSV
        </button> */}
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
            {loading ? "Loading..." : "Filter by Class"}
          </button>

          <button
            onClick={() => {
              setSelectedClass("");
              fetchFeeDetails();
            }}
            disabled={loading}
            className="px-4 py-2 bg-gray-600 text-white rounded-md text-sm hover:bg-gray-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Reset Filter
          </button>
        </div>

        {error && <div className="text-red-500 mt-2">{error}</div>}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3  w-36 text-left">Custom ID</th>
              <th className="p-3  w-36 text-left">Applicant ID</th>
              <th className="p-3 w-36 text-left">Class</th>
              <th className="p-3 w-36 text-left">Name</th>
              <th className="p-3 w-36 text-left">Email</th>
              <th className="p-3 w-36 text-left">Mobile</th>
              
              <th className="p-3 w-36 text-left">First Installment</th>
              <th className="p-3 w-36 text-left">Second Installment</th>
              <th className="p-3 w-36 text-left">Third Installment</th>
              <th className="p-3 w-36 text-left">First Installment Status</th>
              <th className="p-3 w-36 text-left">Second Installment Status</th>
              <th className="p-3 w-36 text-left">Third Installment Status</th>
              {/* <th className="p-3 w-36 text-left">Total Fee</th>
              <th className="p-3 w-36 text-left">Pending Fee</th> */}
              <th className="p-3 w-36 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={12} className="text-center p-4">
                  Loading...
                </td>
              </tr>
            ) : filteredData.length === 0 ? (
              <tr>
                <td colSpan={12} className="text-center p-4">
                  No data found
                </td>
              </tr>
            ) : (
              filteredData.map((row) => (
                <tr key={row.uuid} className="border-b">
                  <td className="p-3">{row.customId}</td>
                
                  <td className="p-3">{row.applicantId}</td>
                  <td className="p-3">{row.class}</td>
                  <td className="p-3">{`${row.firstName} ${row.lastName}`}</td>
                  <td className="p-3">{row.email}</td>
                  <td className="p-3">{row.mobileNumber}</td>
                  {/* <td className="p-3">{row.totalYearlyPayment}</td>
                  <td className="p-3">{row.pendingFee}</td> */}
                  <td className="p-3">
                    {row.firstInstallment &&
                    parseFloat(row.firstInstallment) > 0
                      ? "₹"+ ' '+row.firstInstallment
                      : "Not Applicable"}
                  </td>
                  <td className="p-3">
                    {row.secondInstallment &&
                    parseFloat(row.secondInstallment) > 0
                      ? "₹"+ ' '+row.secondInstallment
                      : "Not Applicable"}
                  </td>
                  <td className="p-3">
                    {row.thirdInstallment &&
                    parseFloat(row.thirdInstallment) > 0
                      ? "₹"+ ' '+ row.thirdInstallment
                      : "Not Applicable"}
                  </td>
                  <td className="p-3">
                    {row.firstInstallment &&
                    parseFloat(row.firstInstallment) > 0
                      ? getInstallmentStatus(row.customId, 1)
                      : "Not Applicable"}
                  </td>
                  <td className="p-3">
                    {row.secondInstallment &&
                    parseFloat(row.secondInstallment) > 0
                      ? getInstallmentStatus(row.customId, 2)
                      : "Not Applicable"}
                  </td>
                  <td className="p-3">
                    {row.thirdInstallment &&
                    parseFloat(row.thirdInstallment) > 0
                      ? getInstallmentStatus(row.customId, 3)
                      : "Not Applicable"}
                  </td>
                  {/* <td className="p-3">
                    {row.totalYearlyPayment}
                  </td>
                  <td className="p-3">
                    {row.pendingFee}
                  </td> */}
                  <td className="p-3">
                    <button
                      onClick={() =>
                        openModal(
                          row.customId,
                          row.firstName + " " + row.lastName,
                          row.applicantId,  row.class

                        )
                      }
                      className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors"
                    >
                      {/* <button
    onClick={() => openModal(row.customId, row.firstName + " " + row.lastName, row.applicantId)}
    disabled={areAllInstallmentsPaid(row.customId)}
    className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
  ></button> */}
                      Generate Receipt
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeModal}
          />

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
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Appilcation ID
              </label>
              <input
                type="text"
                value={applicantId}
                onChange={(e) => setCustomIdInput(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Custom ID"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setCustomIdInput(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Custom ID"
              />
            </div>
           {/* div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Installments
              </label>
              {areAllInstallmentsPaid(customIdInput) && (
                <Check className="h-4 w-4 text-green-500" />
              )}
              <div className="space-y-2">
                {getAvailableInstallments(customIdInput).map((installment) => (
                  <label key={installment} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={installment}
                      checked={selectedInstallments.includes(installment)}
                      onChange={(e) => {
                        const { value, checked } = e.target;
                        setSelectedInstallments((prev) =>
                          checked
                            ? [...prev, value]
                            : prev.filter((i) => i !== value)
                        );
                      }}
                      className="form-checkbox h-4 w-4 text-blue-600 transition"
                    />
                    Installment {installment}
                  </label>
                ))}
              </div>

              <div className="mb-7">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div> < */}
            {areAllInstallmentsPaid(customIdInput) ? (
        <div className="flex items-center gap-2 p-4 bg-green-50 rounded-md text-green-700 mb-6">
          <Check className="h-5 w-5" />
          <span>All installments have been completed</span>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Installments
            </label>
            <div className="space-y-2">
              {getAvailableInstallments(customIdInput).map((installment) => (
                <label key={installment} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={installment}
                    checked={selectedInstallments.includes(installment)}
                    onChange={(e) => {
                      const { value, checked } = e.target;
                      setSelectedInstallments((prev) =>
                        checked
                          ? [...prev, value]
                          : prev.filter((i) => i !== value)
                      );
                    }}
                    className="form-checkbox h-4 w-4 text-blue-600 transition"
                  />
                  Installment {installment}
                </label>
              ))}
            </div>

            <div className="mb-7 mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            {/* <button
              onClick={closeModal}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button> */}
            {/* <button
              onClick={generateReceipt}
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Generate
            </button> */}
          </div>
        </>
      )}
            <div className="flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
  onClick={generateReceipt}
  disabled={isLoading || areAllInstallmentsPaid(customIdInput) || !selectedInstallments.length || !date}
  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
>
  <span>{isLoading ? <span className="loader mr-2 bg-white"></span> : "Generate"}</span>
  {isLoading && <span className="loader-text">Generating...</span>}
</button>


            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FeeDetails;
