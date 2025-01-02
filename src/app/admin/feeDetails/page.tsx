"use client";
import React, { useState, useEffect } from "react";
import { Download, Edit2, Save } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";

const FeeDetails = () => {
  const [feeData, setFeeData] = useState<Array<any>>([]);
  const [filteredData, setFilteredData] = useState<Array<any>>([]);
  const [editingRow, setEditingRow] = useState<string | null>(null);
  const [editValues, setEditValues] = useState({
    firstInstallment: "",
    secondInstallment: "",
    thirdInstallment: "",
    firstInstallmentStatus: "",
    secondInstallmentStatus: "",
    thirdInstallmentStatus: ""
  });
  const [filters, setFilters] = useState({
    customId: "",
    name: "",
    email: "",
    mobileNumber: "",
    firstInstallment: "",
    secondInstallment: "",
    thirdInstallment: "",
    firstInstallmentStatus: "",
    secondInstallmentStatus: "",
    thirdInstallmentStatus: "",
  });

  const fetchFeeDetails = async () => {
    try {
      const response = await fetch("http://localhost:3002/form/fee/details");
      const result = await response.json();
      setFeeData(result.data.data);
      setFilteredData(result.data.data);
    } catch (error) {
      console.error("Error fetching fee details:", error);
    }
  };

  useEffect(() => {
    fetchFeeDetails();
  }, []);

  const handleEdit = (row: any) => {
    setEditingRow(row.uuid);
    setEditValues({
      firstInstallment: row.firstInstallment,
      secondInstallment: row.secondInstallment,
      thirdInstallment: row.thirdInstallment,
      firstInstallmentStatus: row.firstInstallmentStatus,
      secondInstallmentStatus: row.secondInstallmentStatus,
      thirdInstallmentStatus: row.thirdInstallmentStatus,
    });
  };

  const handleSave = async (row: any) => {
    const uuid = row.uuid;
    try {
      const payload = {
        ...row,
        firstInstallment: editValues.firstInstallment,
        secondInstallment: editValues.secondInstallment,
        thirdInstallment: editValues.thirdInstallment,
        firstInstallmentStatus: editValues.firstInstallmentStatus,
        secondInstallmentStatus: editValues.secondInstallmentStatus,
        thirdInstallmentStatus: editValues.thirdInstallmentStatus,
      };

      const response = await fetch(
        `http://localhost:3002/form/fee/update?uuid=${uuid}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        fetchFeeDetails();
        setEditingRow(null);
        setEditValues({
          firstInstallment: "",
          secondInstallment: "",
          thirdInstallment: "",
          firstInstallmentStatus: "",
          secondInstallmentStatus: "",
          thirdInstallmentStatus: "",
        });
        showSuccessToast();
      }
    } catch (error) {
      console.error("Error updating fee details:", error);
    }
  };

  const showSuccessToast = () => {
    toast.success("Fee updated successfully!", {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const value = e.target.value;
    setFilters((prevFilters) => {
        const updatedFilters = { ...prevFilters, [key]: value };

        // Perform filtering using the updated filter value
        const updatedData = feeData.filter((row) => {
            return (
                (!updatedFilters.customId || row.customId.includes(updatedFilters.customId)) &&
                (!updatedFilters.name ||
                    `${row.firstName} ${row.lastName}`
                        .toLowerCase()
                        .includes(updatedFilters.name.toLowerCase())) &&
                (!updatedFilters.email || row.email.toLowerCase().includes(updatedFilters.email.toLowerCase())) &&
                (!updatedFilters.mobileNumber || row.mobileNumber.includes(updatedFilters.mobileNumber)) &&
                (!updatedFilters.firstInstallment || row.firstInstallment.toLowerCase().includes(updatedFilters.firstInstallment.toLowerCase())) &&
(!updatedFilters.secondInstallment || row.secondInstallment.toLowerCase().includes(updatedFilters.secondInstallment.toLowerCase())) &&
(!updatedFilters.thirdInstallment || row.thirdInstallment.toLowerCase().includes(updatedFilters.thirdInstallment.toLowerCase())) &&
(!updatedFilters.firstInstallmentStatus || row.firstInstallmentStatus.toLowerCase().includes(updatedFilters.firstInstallmentStatus.toLowerCase())) &&
(!updatedFilters.secondInstallmentStatus || row.secondInstallmentStatus.toLowerCase().includes(updatedFilters.secondInstallmentStatus.toLowerCase())) &&
(!updatedFilters.thirdInstallmentStatus || row.thirdInstallmentStatus.toLowerCase().includes(updatedFilters.thirdInstallmentStatus.toLowerCase()))

            );
        });

        setFilteredData(updatedData); 
        return updatedFilters;
    });
};

  const getCSVFile = async () => {
    try {
        const response = await fetch('http://localhost:3002/form/fee/details/csv', {
            method: 'GET',
            headers: {
                'Content-Type': 'text/csv',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'fee-details.csv';
        document.body.appendChild(a);
        a.click();
        a.remove();
    } catch (error) {
        console.error('Error fetching the CSV file:', error);
    }
};
  return (
    <div className="w-full p-6 bg-white shadow-md rounded-lg">
      <ToastContainer />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Fee Details</h1>
        <button
          onClick={() => getCSVFile()}
          className="px-4 py-2 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200 flex items-center gap-2 shadow-sm"
        >
          <Download className="h-4 w-4" />
          Download CSV
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">
                Custom ID
                <input
                  type="text"
                  value={filters.customId}
                  onChange={(e) => handleFilterChange(e, "customId")}
                  className="mt-1 p-1 w-full border rounded"
                  placeholder="Filter"
                />
              </th>
              <th className="p-3 text-left">
                Name
                <input
                  type="text"
                  value={filters.name}
                  onChange={(e) => handleFilterChange(e, "name")}
                  className="mt-1 p-1 w-full border rounded"
                  placeholder="Filter"
                />
              </th>
              <th className="p-3 text-left">
                Email
                <input
                  type="text"
                  value={filters.email}
                  onChange={(e) => handleFilterChange(e, "email")}
                  className="mt-1 p-1 w-full border rounded"
                  placeholder="Filter"
                />
              </th>
              <th className="p-3 text-left">
                Mobile
                <input
                  type="text"
                  value={filters.mobileNumber}
                  onChange={(e) => handleFilterChange(e, "mobileNumber")}
                  className="mt-1 p-1 w-full border rounded"
                  placeholder="Filter"
                />
              </th>
              <th className="p-3 text-left">
                First Installment
                <input
                  type="text"
                  value={filters.firstInstallment}
                  onChange={(e) => handleFilterChange(e, "firstInstallment")}
                  className="mt-1 p-1 w-full border rounded"
                  placeholder="Filter"
                />
              </th>
              <th className="p-3 text-left">
                Second Installment
                <input
                  type="text"
                  value={filters.secondInstallment}
                  onChange={(e) => handleFilterChange(e, "secondInstallment")}
                  className="mt-1 p-1 w-full border rounded"
                  placeholder="Filter"
                />
              </th>
              <th className="p-3 text-left">
                Third Installment
                <input
                  type="text"
                  value={filters.thirdInstallment}
                  onChange={(e) => handleFilterChange(e, "thirdInstallment")}
                  className="mt-1 p-1 w-full border rounded"
                  placeholder="Filter"
                />
              </th>
              <th className="p-3 text-left">
                First Installment Status
                <input
                  type="text"
                  value={filters.firstInstallmentStatus}
                  onChange={(e) => handleFilterChange(e, "firstInstallmentStatus")}
                  className="mt-1 p-1 w-full border rounded"
                  placeholder="Filter"
                />
              </th>
              <th className="p-3 text-left">
                Second Installment Status
                <input
                  type="text"
                  value={filters.secondInstallmentStatus}
                  onChange={(e) => handleFilterChange(e, "secondInstallmentStatus")}
                  className="mt-1 p-1 w-full border rounded"
                  placeholder="Filter"
                />
              </th>
              <th className="p-3 text-left">
                Third Installment Status
                <input
                  type="text"
                  value={filters.thirdInstallmentStatus}
                  onChange={(e) => handleFilterChange(e, "thirdInstallmentStatus")}
                  className="mt-1 p-1 w-full border rounded"
                  placeholder="Filter"
                />
              </th>

              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row) => (
              <tr key={row.uuid} className="border-b">
                <td className="p-3">{row.customId}</td>
                <td className="p-3">{`${row.firstName} ${row.lastName}`}</td>
                <td className="p-3">{row.email}</td>
                <td className="p-3">{row.mobileNumber}</td>
                <td className="p-3">
                  {editingRow === row.uuid ? (
                    <input
                      type="text"
                      value={editValues.firstInstallment}
                      onChange={(e) =>
                        setEditValues({
                          ...editValues,
                          firstInstallment: e.target.value,
                        })
                      }
                      className="w-32 p-2 border rounded"
                    />
                  ) : (
                    row.firstInstallment
                  )}
                </td>
                <td className="p-3">
                  {editingRow === row.uuid ? (
                    <input
                      type="text"
                      value={editValues.secondInstallment}
                      onChange={(e) =>
                        setEditValues({
                          ...editValues,
                          secondInstallment: e.target.value,
                        })
                      }
                      className="w-32 p-2 border rounded"
                    />
                  ) : (
                    row.secondInstallment
                  )}
                </td>
                <td className="p-3">
                  {editingRow === row.uuid ? (
                    <input
                      type="text"
                      value={editValues.thirdInstallment}
                      onChange={(e) =>
                        setEditValues({
                          ...editValues,
                          thirdInstallment: e.target.value,
                        })
                      }
                      className="w-32 p-2 border rounded"
                    />
                  ) : (
                    row.thirdInstallment
                  )}
                </td>
                <td className="p-3">
                  {editingRow === row.uuid ? (
                    <input
                      type="text"
                      value={editValues.firstInstallmentStatus}
                      onChange={(e) =>
                        setEditValues({
                          ...editValues,
                          firstInstallmentStatus: e.target.value,
                        })
                      }
                      className="w-32 p-2 border rounded"
                    />
                  ) : (
                    row.firstInstallmentStatus
                  )}
                </td>
                <td className="p-3">
                  {editingRow === row.uuid ? (
                    <input
                      type="text"
                      value={editValues.secondInstallmentStatus}
                      onChange={(e) =>
                        setEditValues({
                          ...editValues,
                          secondInstallmentStatus: e.target.value,
                        })
                      }
                      className="w-32 p-2 border rounded"
                    />
                  ) : (
                    row.secondInstallmentStatus
                  )}
                </td>
                <td className="p-3">
                  {editingRow === row.uuid ? (
                    <input
                      type="text"
                      value={editValues.thirdInstallmentStatus}
                      onChange={(e) =>
                        setEditValues({
                          ...editValues,
                          thirdInstallmentStatus: e.target.value,
                        })
                      }
                      className="w-32 p-2 border rounded"
                    />
                  ) : (
                    row.thirdInstallmentStatus
                  )}
                </td>
                <td className="p-3">
                  {editingRow === row.uuid ? (
                    <button
                      onClick={() => handleSave(row)}
                      className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
                    >
                      <Save className="h-4 w-4" />
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(row)}
                      className="px-4 py-2 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 flex items-center gap-2"
                    >
                      <Edit2 className="h-4 w-4" />
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeeDetails;
