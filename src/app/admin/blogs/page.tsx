"use client";

import React, { useState, useEffect } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import axios from "axios";

interface Blog {
  id: number;
  title: string;
  content: string;
  tags: string[];
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Blog | null; direction: "asc" | "desc" | null }>({ key: null, direction: null });
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
    imageUrl: "",
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3002/blogs");
      setBlogs(response.data);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (key: keyof Blog) => {
    let direction: "asc" | "desc" | null = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    } else if (sortConfig.key === key && sortConfig.direction === "desc") {
      direction = null;
    }
    setSortConfig({ key, direction });
  };

  const sortedBlogs = [...blogs].sort((a, b) => {
    if (!sortConfig.key || !sortConfig.direction) return 0;
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    if (sortConfig.direction === "asc") return aValue && bValue && aValue < bValue ? -1 : 1;
    if (sortConfig.direction === "desc") return aValue && bValue && aValue > bValue ? -1 : 1;
    return 0;
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3002/blogs", {
        ...formData,
        tags: formData.tags.split(",").map((tag) => tag.trim()),
      });
      setBlogs((prev) => [response.data, ...prev]);
      setFormData({ title: "", content: "", tags: "", imageUrl: "" });
      setFormVisible(false);
    } catch (error) {
      console.error("Failed to create blog:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3002/blogs/${id}`);
      setBlogs((prev) => prev.filter((blog) => blog.id !== id));
    } catch (error) {
      console.error("Failed to delete blog:", error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Blog Management</h1>
        <button
          onClick={() => setFormVisible(!formVisible)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          {formVisible ? "Close Form" : "Create Blog"}
        </button>
      </div>

      {formVisible && (
        <form className="bg-white p-4 rounded-md shadow-md mb-6" onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              rows={4}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Tags (comma-separated)</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Image URL</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md">
            Submit
          </button>
        </form>
      )}

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Tags</th>
              <th className="p-4">Created At</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center p-4">
                  Loading...
                </td>
              </tr>
            ) : sortedBlogs.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center p-4">
                  No blogs found
                </td>
              </tr>
            ) : (
              sortedBlogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-gray-50">
                  <td className="p-4">{blog.title}</td>
                  <td className="p-4">{blog.tags.join(", ")}</td>
                  <td className="p-4">{new Date(blog.createdAt).toLocaleDateString()}</td>
                  <td className="p-4">
                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBlogs;
