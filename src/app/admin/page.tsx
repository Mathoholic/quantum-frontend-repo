"use client";

import React, { useState, useEffect, useRef } from "react";
import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import {
  ColDef,
  ClientSideRowModelModule,
  ModuleRegistry,
  TextFilterModule,
  ColumnAutoSizeModule
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
  ColumnAutoSizeModule
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
  const gridRef = useRef<AgGridReact>(null);
  const [tabCounts, setTabCounts] = useState({
    Raw: 0,
    Interested: 0,
    FollowUp: 0,
    VisitScheduled: 0,
    Converted: 0,
    NotInterested: 0,
  });
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
    fetchTabCounts();
    
  }, [selectedTab]);
  const fetchTabCounts = async () => {
    const statuses = ["raw", "interested", "followUp", "visitScheduled", "converted", "notInterested"];
    const counts: { [key: string]: number } = {};

    for (const status of statuses) {
      try {
        const response = await fetch(`http://localhost:3001/form/count?status=${status}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        counts[status] = data.count;
      } catch (error) {
        console.error(`Failed to fetch count for status ${status}:`, error);
      }
    }

    setTabCounts({
      Raw: counts.raw || 0,
      Interested: counts.interested || 0,
      FollowUp: counts.followUp || 0,
      VisitScheduled: counts.visitScheduled || 0,
      Converted: counts.converted || 0,
      NotInterested: counts.notInterested || 0,
    });
  };
  const fetchData = async (category: string) => {
    debugger;
    const gridApi = gridRef.current?.api;
    if (gridApi) {
      gridApi.showLoadingOverlay();
    }
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
      fetchTabCounts();
      setRowData(mappedData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      
      setLoading(false);
    }
  };

  const updateRecord = async (id: string, category: string) => {
    debugger;
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
      // let newStatus = event.target.value;
      // if (newStatus === "Raw") {
      //   newStatus = "raw";
      // }
      // if (newStatus === "Interested") {
      //   newStatus = "interested";
      // }
      // if (newStatus === "FollowUp") {
      //   newStatus = "followUp";
      // }
      // if (newStatus === "Visit Scheduled") {
      //   newStatus = "visitScheduled";
      // }
      // if (newStatus === "Converted") {
      //   newStatus = "converted";
      // }
      // if (newStatus === "Not Interested") {
      //   newStatus = "notInterested";
      // }
      // updateRecord(props.data.uuid, newStatus);
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
  const onGridReady = (params: any) => {
    debugger;
    params.api.sizeColumnsToFit();
  };
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
              {tab} ({tabCounts[tab.replace(" ", "") as keyof typeof tabCounts]})
            </button>
          ))}
        </div>
        {/* {loading ? (
          <div>Loading...</div>
        ) : ( */}
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
            onGridReady={onGridReady}
            //  rowSelection="multiple"
             
             suppressHorizontalScroll={true}
            // suppressCutToClipboard={true}
            defaultColDef={{
              filter: true,
            }}
          />
        </div>
        {/* )} */}
      </div>
    </div>
  );
};

export default Admin;
