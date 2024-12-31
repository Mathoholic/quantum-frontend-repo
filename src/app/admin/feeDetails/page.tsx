"use client";
import React, { useState, useEffect } from 'react';
import { Edit2, Save } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';

const FeeDetails = () => {
    const [feeData, setFeeData] = useState<Array<{
        uuid: string;
        firstName: string;
        lastName: string;
        mobileNumber: string;
        email: string;
        firstInstallment: string;
        secondInstallment: string;
        thirdInstallment: string;
        customId: string;
    }>>([]);
    const [editingRow, setEditingRow] = useState(null);
    const [editValues, setEditValues] = useState({
        firstInstallment: '',
        secondInstallment: '',
        thirdInstallment: ''
    });

    const fetchFeeDetails = async () => {
        try {
            debugger;
            const response = await fetch('http://localhost:3002/form/fee/details');
            const result = await response.json();
            setFeeData(result.data.data);
        } catch (error) {
            console.error('Error fetching fee details:', error);
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
            thirdInstallment: row.thirdInstallment
        });
    };

    const handleSave = async (row: any) => {
        debugger;
        const uuid = row.uuid;
        try {
            const payload = {
                firstName: row.firstName,
                lastName: row.lastName,
                mobileNumber: row.mobileNumber,
                email: row.email,
                firstInstallment: editValues.firstInstallment,
                secondInstallment: editValues.secondInstallment,
                thirdInstallment: editValues.thirdInstallment,
                customId: row.customId
            };

            const response = await fetch(`http://localhost:3002/form/fee/update?uuid=${uuid}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                // Refresh the data
                fetchFeeDetails();
                setEditingRow(null);
                setEditValues({
                    firstInstallment: '',
                    secondInstallment: '',
                    thirdInstallment: ''
                });
                showSuccessToast();
            }

        } catch (error) {
            console.error('Error updating fee details:', error);
        }
    };
    const showSuccessToast = () => {
        toast.success('Fee updated successfully!', {
          position: 'top-right',
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      };
    return (
        <div className="w-full p-6 bg-white shadow-md rounded-lg">
            <ToastContainer />
            <h1 className="text-2xl font-bold mb-6">Fee Details</h1>
            <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-3 text-left">Custom ID</th>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Email</th>
                            <th className="p-3 text-left">Mobile</th>
                            <th className="p-3 text-left">First Installment</th>
                            <th className="p-3 text-left">Second Installment</th>
                            <th className="p-3 text-left">Third Installment</th>
                            <th className="p-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {feeData.map((row: any) => (
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
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditValues({
                                                ...editValues,
                                                firstInstallment: e.target.value
                                            })}
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
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditValues({
                                                ...editValues,
                                                secondInstallment: e.target.value
                                            })}
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
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditValues({
                                                ...editValues,
                                                thirdInstallment: e.target.value
                                            })}
                                            className="w-32 p-2 border rounded"
                                        />
                                    ) : (
                                        row.thirdInstallment
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
