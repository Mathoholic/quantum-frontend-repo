import * as React from "react";
import { useMemo } from "react";

interface BlogModalProps {
  blog: {
    id: number;
    imageUrl: string;
    title: string;
    category: string;
    updatedAt: string;
    content: string;
  };
  closeModal: () => void;
  buttonText?: string;
}

const BlogModal: React.FC<BlogModalProps> = ({ blog, closeModal, buttonText = "Close" }) => {
  const formattedDate = useMemo(() => new Date(blog.updatedAt).toLocaleDateString(), [blog.updatedAt]);
  const modalContainerClassNames = "bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full mx-4 relative";

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className={modalContainerClassNames}>
        <div className="max-h-[80vh] overflow-y-auto">
          {/* Modal Content */}
          <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">
            {blog.title}
          </h2>
          <div className="flex justify-center items-center mb-4 h-64">
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="max-h-full max-w-full object-contain rounded-md"
            />
          </div>
          <p className="text-sm text-gray-500 uppercase tracking-wide mb-2 text-center">
            {blog.category} <span className="text-red-500">•</span>{" "}
            {formattedDate} 
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed">{blog.content}</p>
        </div>

        {/* Footer */}
        <div className="flex justify-center mt-4">
          <button
            onClick={closeModal}
            className="py-2 px-6 bg-pink-600 hover:bg-pink-700 text-white font-medium rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogModal;
