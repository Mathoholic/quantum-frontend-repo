'use client'

import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export interface Blog {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  [key: string]: any; 
}
export default function BlogPage() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
    image: null as File | null,
  });
  
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
      const fetchBlogs = async () => {
        try {
          debugger;
          const response = await axios.get('http://localhost:3002/blogs');
          setBlogs(response.data);
          console.log('Blogs fetched:', blogs);
        } catch (error) {
          console.error('Error fetching blogs:', error);
        }
      };

    fetchBlogs();
  }, [blogs]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      image: e.target.files ? e.target.files[0] : null,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData();
    form.append('title', formData.title);
    form.append('content', formData.content);
    form.append('tags', formData.tags);
    const file = fileInputRef.current?.files?.[0];
    if (file) {
      form.append('image', file);
    }

    try {
      const response = await axios.post('http://localhost:3002/blogs', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Blog created:', response.data);
      showToast();
      setFormData({
        title: '',
        content: '',
        tags: '',
        image: null,
      });
      setIsModalOpen(false);
      setBlogs([...blogs, response.data]);
    } catch (error) {
      console.error('Error creating blog:', error);
      showErrorToast();
    }
  };
  const showErrorToast = () => {
    toast.success("Error In Creting Blog!", {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };
  const showToast = () => {
      toast.success("Blog Created successful!", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    };
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

      {blogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog: any) => (
          <div key={blog.id} className="p-4 bg-gray-100 rounded-lg shadow-md">
            {blog.imageUrl && <img src={blog.imageUrl} alt={blog.title} className="w-full h-48 object-cover rounded-md mb-4" />}
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{blog.title}</h2>
            <p className="text-gray-700 mb-2">{blog.content}</p>
            <p className="text-gray-500">Tags: {blog.tags}</p>
          </div>
        ))}

        </div>
      ) : (
        <p className="text-gray-500">No blogs available.</p>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Create a Blog</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Content</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Image</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:text-sm file:font-medium file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Create Blog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
