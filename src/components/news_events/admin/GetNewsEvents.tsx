'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

interface GetNewsEventsProps {
  newsEventId: string;
  closeModal: () => void;
}

export default function GetNewsEvents({ newsEventId, closeModal }: GetNewsEventsProps) {
  const [newsEvent, setNewsEvent] = useState<{
    title: string;
    description: string;
    imageUrl: string | null;
    eventDate: string;
  } | null>(null);

  useEffect(() => {
    const fetchNewsEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/news-events/${newsEventId}`);
        setNewsEvent(response.data);
      } catch (error) {
        console.error('Error fetching news/event:', error);
      }
    };

    fetchNewsEvent();
  }, [newsEventId]);

  if (!newsEvent) {
    return null;
  }

  const imageUrl = newsEvent.imageUrl ? `http://localhost:3002${newsEvent.imageUrl}` : null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto pt-10">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl w-full mx-4">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">{newsEvent.title}</h2>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={newsEvent.title}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
            <span className="text-gray-500">No image available</span>
          </div>
        )}
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
      </div>
    </div>
  );
}
