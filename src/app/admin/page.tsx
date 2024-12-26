"use client";

import React, { useState, useEffect, useRef } from "react";
import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import {
  ColDef,
  ClientSideRowModelModule,
  ModuleRegistry,
  TextFilterModule,
} from "ag-grid-community";
import { ValidationModule } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
// import {

//   ClipboardModule,

// } from "ag-grid-enterprise";
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ValidationModule,
  TextFilterModule,
  // ClipboardModule,
]);

interface IRow {
  fullName: string;
  email: string;
  phone: string;
  customId: string;
  category: string;
  status: string;
  uuid: string;
}

const Admin = () => {
  const [rowData, setRowData] = useState<IRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [columnDefs] = useState<ColDef[]>([
    {
      headerName: "Custom ID",
      field: "customId",
      filter: "agTextColumnFilter",
    },
    {
      headerName: "Full Name",
      field: "fullName",
      filter: "agTextColumnFilter",
    },
    { headerName: "Email", field: "email", filter: "agTextColumnFilter" },
    { headerName: "Phone", field: "phone", filter: "agTextColumnFilter" },
    { headerName: "Category", field: "category", filter: "agTextColumnFilter" },
    { headerName: "Status", field: "status", filter: "agTextColumnFilter" },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: DropdownRenderer,
    },
  ]);
  const [selectedTab, setSelectedTab] = useState("Raw");

  useEffect(() => {
    fetchData(selectedTab);
  }, [selectedTab]);

  const fetchData = async (category: string) => {
    setLoading(true);
    const offset = 1;
    const pageSize = 10;
    let status = "raw";
    if (category === "Raw") {
      status = "raw";
    }
    if (category === "Interested") {
      status = "interested";
    }
    if (category === "FollowUp") {
      status = "followUp";
    }
    if (category === "Visit Scheduled") {
      status = "visitScheduled";
    }
    if (category === "Converted") {
      status = "converted";
    }
    if (category === "Not Interested") {
      status = "notInterested";
    }
    try {
      const response = await fetch(
        `http://localhost:3001/form/status?status=${status}&offset=${offset}&pageSize=${pageSize}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Fetched data:", data);

      const mappedData = data.data.map((item: any) => ({
        fullName: `${item.firstName} ${item.lastName}`,
        lname: item.lastName,
        email: item.email,
        phone: item.mobileNumber,
        customId: item.customId,
        category: item.category,
        status: item.status,
        uuid: item.uuid,
      }));

      setRowData(mappedData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateRecord = async (id: string, category: string) => {
    let uuid = id;
    let status = category;
    await fetch(
      `http://localhost:3001/form/updateStatus?uuid=${uuid}&status=${status}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, category }),
      }
    );
    fetchData(selectedTab);
  };

  function DropdownRenderer(props: any): React.JSX.Element {
    const options = [
      "raw",
      "interested",
      "followUp",
      "visitScheduled",
      "converted",
      "notInterested",
    ];

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newStatus = event.target.value;
      updateRecord(props.data.uuid, newStatus);
    };

    return (
      <select onChange={handleChange} value={props.data.status}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-5xl">
        <div className="mb-4">
          {[
            "Raw",
            "Interested",
            "FollowUp",
            "Visit Scheduled",
            "Converted",
            "Not Interested",
          ].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`mr-2 px-4 py-2 rounded-md text-white transition-all duration-300 ${
                selectedTab === tab
                  ? "bg-blue-600"
                  : "bg-gray-400 hover:bg-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div
          className="ag-theme-alpine"
          style={{ height: "400px", width: "100%" }}
        >
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            theme={"legacy"}
            components={{ dropdownRenderer: DropdownRenderer }}
            modules={[
              ClientSideRowModelModule,
              ValidationModule,
              TextFilterModule,
            ]}
            // suppressCutToClipboard={true}
            defaultColDef={{
              filter: true,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Admin;
