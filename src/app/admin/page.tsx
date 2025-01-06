import React from 'react';

export default function AdminHomePage() {
  return (
    <div className="p-8 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Admin Dashboard
      </h1>
      
      <div className="bg-blue-50 p-6 rounded-lg">
        <p className="text-gray-600 text-lg leading-relaxed">
          Welcome to the Admin Dashboard! Use the sidebar to navigate to different sections like Leads and Members.
        </p>
      </div>
    </div>
  );
}