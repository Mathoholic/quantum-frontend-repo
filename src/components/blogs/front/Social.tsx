'use client'

import React, { useEffect, useState } from "react";
import axios from "axios";

import { FaShare } from "react-icons/fa";

interface Blog {
  id: number;
  imageUrl: string;
  title: string;
  category: string;
  updatedAt: string;
  content: string;
}

const Social: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('https://api.quantumkids.in/blogs');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="bg-sky-100 pt-10 smx-auto px-6 w-full flex items-center justify-center flex-col">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-sm text-gray-500 2xl:text-xl font-outfit uppercase tracking-wide mb-2">
            Building the Future
          </h2>
          <h1 className="text-3xl 2xl:text-[54px] font-bold font-comic text-pink-600">
            Latest From the <span className="text-black">Social Media</span>
          </h1>
        </div>

    </div>
  );
};

export default Social;
