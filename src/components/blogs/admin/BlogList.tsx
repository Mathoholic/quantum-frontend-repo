'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import GetBlogModal from './GetBlogModal'; 
export interface Blog {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  tags: string;
}

export default function BlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null); 
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://208.109.214.146:3002/blogs');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  const handleBlogUpdated = () => {
    // Fetch the updated list of blogs
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://208.109.214.146:3002/blogs');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  };

  const handleDelete = async (blogId: string) => {
    try {
      await axios.delete(`http://208.109.214.146:3002/blogs/${blogId}`);
      handleBlogUpdated();
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const truncateContent = (content: string) => {
    return content.split(' ').slice(0, 20).join(' ') + '...';
  };

  return (
    <div>
      {blogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="p-4 bg-gray-100 rounded-lg shadow-md cursor-pointer"
            >
              {blog.imageUrl && (
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                  onClick={() => setSelectedBlogId(blog.id)}
                />
              )}
              <h2 className="text-2xl font-bold text-gray-800 mb-2" onClick={() => setSelectedBlogId(blog.id)}>{blog.title}</h2>
              <p className="text-gray-700 mb-2" onClick={() => setSelectedBlogId(blog.id)}>{truncateContent(blog.content)}</p>
              <p className="text-gray-500 mb-2" onClick={() => setSelectedBlogId(blog.id)}>Tags: {blog.tags}</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => {
                    setSelectedBlogId(blog.id);
                    setIsEditing(true);
                  }}
                  className="text-blue-600 hover:text-blue-800 text-xl"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(blog.id)}
                  className="text-red-600 hover:text-red-800 text-xl"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No blogs available.</p>
      )}
      {selectedBlogId && (
        <GetBlogModal
          blogId={selectedBlogId}
          closeModal={() => {
            setSelectedBlogId(null);
            setIsEditing(false);
          }}
          onBlogUpdated={handleBlogUpdated} // Pass the handler to the modal
          isEditing={isEditing} // Pass the editing state to the modal
        />
      )}
    </div>
  );
}
