'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';

interface Event {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  eventDate: string; // Updated to match backend data
}

const EventsNews = () => {
  const [eventsData, setEventsData] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        const response = await axios.get('http://localhost:3002/news-events');
        setEventsData(response.data);
      } catch (error) {
        console.error('Error fetching events data:', error);
      }
    };

    fetchEventsData();
  }, []);

  const formatDate = (dateString: string) => {
    return dateString.split('T')[0]; // Extract date part in yyyy-mm-dd format
  };

  return (
    <div className="bg-pinkBackground py-16">
      <h1 className="text-4xl font-extrabold text-center text-pink-700 mb-12">
        Events & News
      </h1>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
        {eventsData.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
          >
            <Image
              src={`http://localhost:3002${event.imageUrl}`}
              alt={event.title}
              width={400}
              height={240}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold text-pink-800">{event.title}</h2>
              <p className="text-gray-700 mt-2 text-sm">{event.description}</p>
               <p className="text-gray-500 mt-2 text-xs">{formatDate(event.eventDate)}</p> {/* Display formatted event date */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsNews;
