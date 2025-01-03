'use client';

import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

interface GetBlogModalProps {
  blogId: string;
  closeModal: () => void;
  onBlogUpdated: () => void;
  isEditing: boolean; // Add this prop to handle edit mode
}

export default function GetBlogModal({ blogId, closeModal, onBlogUpdated, isEditing }: GetBlogModalProps) {
  const [blog, setBlog] = useState<{
    title: string;
    content: string;
    imageUrl: string | null;
    tags: string;
  } | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
    image: null as File | null,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/blogs/${blogId}`);
        setBlog(response.data);
        setFormData({
          title: response.data.title,
          content: response.data.content,
          tags: response.data.tags,
          image: null,
        });
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchBlog();
  }, [blogId]);

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

    const updatedBlog = new FormData();
    updatedBlog.append('title', formData.title);
    updatedBlog.append('content', formData.content);
    updatedBlog.append('tags', formData.tags);
    if (formData.image) {
      updatedBlog.append('image', formData.image);
    }

    try {
      const response = await axios.patch(`http://localhost:3002/blogs/${blogId}`, updatedBlog, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Blog updated:', response.data);
      setBlog(response.data);
      onBlogUpdated(); // Notify parent component about the update
      toast.success("Blog updated successfully!", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error('Error updating blog:', error);
      toast.error("Error updating blog!", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  if (!blog) {
    return null;
  }

  const imageUrl = blog.imageUrl ? `http://localhost:3002${blog.imageUrl}` : null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto pt-10">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl w-full mx-4">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">{isEditing ? 'Edit Blog' : blog.title}</h2>
        {isEditing ? (
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
                onClick={closeModal}
                className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit Changes
              </button>
            </div>
          </form>
        ) : (
          <>
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={blog.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
                <span className="text-gray-500">No image available</span>
              </div>
            )}
            <p className="text-gray-700 mb-4">{blog.content}</p>
            <p className="text-gray-500 mb-4">Tags: {blog.tags}</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
