
'use client';

import { useState } from 'react';
import BlogList from '@/components/blogs/admin/BlogList';
import BlogModal from '@/components/blogs/admin/CreateBlogModal';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BlogPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <ToastContainer />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Blogs</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Blog
        </button>
      </div>

      <BlogList />

      {isModalOpen && (
        <BlogModal closeModal={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}