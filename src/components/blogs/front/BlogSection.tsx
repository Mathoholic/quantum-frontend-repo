'use client'

import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogModal from "./BlogModal"; 
import { FaShare } from "react-icons/fa";

interface Blog {
  id: number;
  imageUrl: string;
  title: string;
  category: string;
  updatedAt: string;
  content: string;
}

const BlogSection: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:3002/blogs');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="container bg-sky-100 pt-10 smx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-sm text-gray-500 font-roboto uppercase tracking-wide mb-2">
            Building the Future
          </h2>
          <h1 className="text-3xl font-bold font-comic text-pink-600">
            Latest From the <span className="text-black">Social Media</span>
          </h1>
        </div>

    </div>
  );
};

export default BlogSection;
