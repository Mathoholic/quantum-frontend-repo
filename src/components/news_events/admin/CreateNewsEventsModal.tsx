'use client';

import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";

interface NewsEventsModalProps {
  closeModal: () => void;
  newsEventId?: string | null;
}

export default function NewsEventsModal({ closeModal, newsEventId }: NewsEventsModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    eventDate: '',
    image: null as File | null,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (newsEventId) {
      const fetchNewsEvent = async () => {
        try {
          const response = await axios.get(`http://localhost:3002/news-events/${newsEventId}`);
          const { title, description, eventDate, imageUrl } = response.data;
          setFormData({
            title,
            description,
            eventDate: new Date(eventDate).toISOString().split('T')[0],
            image: null,
          });
        } catch (error) {
          console.error('Error fetching news/event:', error);
        }
      };
      fetchNewsEvent();
    }
  }, [newsEventId]);

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
    form.append('description', formData.description);
    form.append('eventDate', formData.eventDate);
    const file = fileInputRef.current?.files?.[0];
    if (file) {
      form.append('image', file);
    }

    try {
      const response = await axios.post('http://localhost:3002/news-events', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('News/Event created:', response.data);
      toast.success("News/Event Created successfully!", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setFormData({
        title: '',
        description: '',
        eventDate: '',
        image: null,
      });
      closeModal();
    } catch (error) {
      console.error('Error creating news/event:', error);
      toast.error("Error creating news/event!", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl w-full">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">{newsEventId ? 'View News/Event' : 'Create a News/Event'}</h2>
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
              disabled={!!newsEventId}
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
              disabled={!!newsEventId}
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
              disabled={!!newsEventId}
            />
          </div>

          {!newsEventId && (
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
          )}

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={closeModal}
              className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              {newsEventId ? 'Close' : 'Cancel'}
            </button>
            {!newsEventId && (
              <button
                type="submit"
                className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create News/Event
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
