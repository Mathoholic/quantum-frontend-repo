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
    <section className="bg-pink-100 py-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-sm text-gray-500 uppercase tracking-wide mb-2">
            Building the Future
          </h2>
          <h1 className="text-3xl font-bold text-pink-600">
            Latest From the <span className="text-black">Social Media</span>
          </h1>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">
                  {blog.category} <span className="text-red-500">•</span>{" "}
                  {new Date(blog.updatedAt).toLocaleDateString()}
                </p>
                <h3 className="text-lg font-semibold mb-4">{blog.title}</h3>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setSelectedBlog(blog)}
                    className="text-pink-600 font-medium hover:underline"
                  >
                    Read More →
                  </button>
                    <button className="text-pink-600 font-medium hover:underline flex items-center">
                      <FaShare className="mr-2" /> Share
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedBlog && (
        <BlogModal blog={selectedBlog} closeModal={() => setSelectedBlog(null)} />
      )}
    </section>
  );
};

export default BlogSection;
