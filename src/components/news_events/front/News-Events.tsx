'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Main Swiper CSS
import 'swiper/css/navigation'; // Optional: Add navigation styles if using navigation module
import 'swiper/css/pagination'; // Optional: Add pagination styles if using pagination module

interface Event {
  id: number;
  imageUrls: string[];
  title: string;
  description: string;
  eventDate: string;
}

const EventsNews = () => {
  const [eventsData, setEventsData] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        const response = await axios.get('https://api.quantumkids.in/news-events');
        setEventsData(response.data);
      } catch (error) {
        console.error('Error fetching events data:', error);
      }
    };

    fetchEventsData();
  }, []);

  const formatDate = (dateString: string) => {
    return dateString.split('T')[0];
  };

  return (
    <div className="bg-pinkBackground py-16">
      <h2 className="text-center mb-8 text-pink-500 font-comic text-4xl sm:text-5xl font-bold ">
        News & Events
      </h2>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
        {eventsData.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
          >
            <Swiper spaceBetween={10} slidesPerView={1} loop={true}>
              {event.imageUrls.map((imageUrl, index) => (
                <SwiperSlide key={index}>
                  <Image
                    src={`https://api.quantumkids.in${imageUrl}`}
                    alt={event.title}
                    width={400}
                    height={240}
                    className="w-full h-40 object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="p-4">
              <h2 className="text-lg font-bold text-pink-800">{event.title}</h2>
              <p className="text-gray-700 mt-2 text-sm">{event.description}</p>
              <p className="text-gray-500 mt-2 text-xs">{formatDate(event.eventDate)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsNews;
