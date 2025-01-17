'use client';

import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

interface GetNewsEventsModalProps {
  newsEventId: string;
  closeModal: () => void;
  onNewsEventUpdated: () => void;
  isEditing: boolean;
}

export default function GetNewsEventsModal({
  newsEventId,
  closeModal,
  onNewsEventUpdated,
  isEditing,
}: GetNewsEventsModalProps) {
  const [newsEvent, setNewsEvent] = useState<{
    title: string;
    description: string;
    imageUrls: string[];
    eventDate: string;
  } | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    eventDate: '',
    images: [] as File[],
    imagePreviews: [] as string[],
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchNewsEvent = async () => {
      try {
        const response = await axios.get(`https://api.quantumkids.in/news-events/${newsEventId}`);
        setNewsEvent(response.data);
        setFormData({
          title: response.data.title,
          description: response.data.description,
          eventDate: new Date(response.data.eventDate).toISOString().split('T')[0],
          images: [],
          imagePreviews: response.data.imageUrls.map((url: string) => `https://api.quantumkids.in${url}`),
        });
      } catch (error) {
        console.error('Error fetching news/event:', error);
      }
    };

    fetchNewsEvent();
  }, [newsEventId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const previews = files.map((file) => URL.createObjectURL(file));
      setFormData((prev) => ({
        ...prev,
        images: files,
        imagePreviews: [...prev.imagePreviews, ...previews],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedNewsEvent = new FormData();
    updatedNewsEvent.append('title', formData.title);
    updatedNewsEvent.append('description', formData.description);
    updatedNewsEvent.append('eventDate', formData.eventDate);
    formData.images.forEach((image) => updatedNewsEvent.append('images', image));

    try {
      const response = await axios.put(`https://api.quantumkids.in/news-events/${newsEventId}`, updatedNewsEvent, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('News/Event updated:', response.data);
      setNewsEvent(response.data);
      onNewsEventUpdated();
      toast.success('News/Event updated successfully!', {
        position: 'top-right',
        autoClose: 500,
      });
    } catch (error) {
      console.error('Error updating news/event:', error);
      toast.error('Error updating news/event!', {
        position: 'top-right',
        autoClose: 500,
      });
    }
  };

  if (!newsEvent) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto pt-10">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl w-full mx-4">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          {isEditing ? 'Edit News/Event' : newsEvent.title}
        </h2>
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
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={6}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Event Date</label>
              <input
                type="date"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Images</label>
              <div className="grid grid-cols-3 gap-4 mb-4">
                {formData.imagePreviews.map((preview, index) => (
                  <img
                    key={index}
                    src={preview}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-md"
                  />
                ))}
              </div>
              <input
                type="file"
                name="images"
                accept="image/*"
                multiple
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
            <div className="grid grid-cols-3 gap-4 mb-4">
              {newsEvent.imageUrls.map((url, index) => (
                <img
                  key={index}
                  src={`https://api.quantumkids.in${url}`}
                  alt={newsEvent.title}
                  className="w-full h-32 object-cover rounded-md"
                />
              ))}
            </div>
            <p className="text-gray-700 mb-4">{newsEvent.description}</p>
            <p className="text-gray-700 mb-4">{new Date(newsEvent.eventDate).toLocaleDateString()}</p>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
