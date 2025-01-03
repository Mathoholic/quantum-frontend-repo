import React from "react";

interface BlogModalProps {
  blog: {
    id: number;
    imageUrl: string;
    title: string;
    category: string;
    date: string;
    content: string;
  };
  closeModal: () => void;
}

const BlogModal: React.FC<BlogModalProps> = ({ blog, closeModal }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 overflow-y-auto pt-10">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full mx-4 relative">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">{blog.title}</h2>
        <img
          src={blog.imageUrl}
          alt={blog.title}
          className="w-full h-64 object-cover rounded-md mb-6"
        />
        <p className="text-sm text-gray-500 uppercase tracking-wide mb-4 text-center">
          {blog.category} <span className="text-red-500">•</span>{" "}
          {new Date(blog.date).toLocaleDateString()}
        </p>
        <p className="text-gray-700 mb-6 leading-relaxed">{blog.content}</p>
        <div className="flex justify-center">
          <button
            onClick={closeModal}
            className="py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogModal;
