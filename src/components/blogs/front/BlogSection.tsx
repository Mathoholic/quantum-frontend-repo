'use client'

import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogModal from "./BlogModal"; // Import the BlogModal component

interface Blog {
  id: number;
  imageUrl: string;
  title: string;
  category: string;
  date: string;
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
                  {new Date(blog.date).toLocaleDateString()}
                </p>
                <h3 className="text-lg font-semibold mb-4">{blog.title}</h3>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setSelectedBlog(blog)}
                    className="text-pink-600 font-medium hover:underline"
                  >
                    Read More →
                  </button>
                  <button className="text-gray-400 hover:text-pink-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12h7m0 0l-3-3m3 3l-3 3m-6 0H3m0 0l3-3m-3 3l3 3"
                      />
                    </svg>
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
