'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import GetNewsEventsModal from './GetNewsEventsModal';

export interface NewsEvent {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    eventDate: string;
}

export default function NewsEventsList() {
    const [newsEvents, setNewsEvents] = useState<NewsEvent[]>([]);
    const [selectedNewsEventId, setSelectedNewsEventId] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    const fetchNewsEvents = async () => {
        try {
            const response = await axios.get('https://api.quantumkids.in/news-events');
            setNewsEvents(response.data);
        } catch (error) {
            console.error('Error fetching news/events:', error);
        }
    };

    useEffect(() => {
        fetchNewsEvents();
    }, []);

    const handleDelete = async (newsEventId: string) => {
        try {
            await axios.delete(`https://api.quantumkids.in/news-events/${newsEventId}`);
            fetchNewsEvents();
        } catch (error) {
            console.error('Error deleting news/event:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            {newsEvents.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {newsEvents.map((newsEvent) => (
                        <div
                            key={newsEvent.id}
                            className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            {newsEvent.imageUrl && (
                                <img
                                    src={`https://api.quantumkids.in${newsEvent.imageUrl}`}
                                    alt={newsEvent.title}
                                    className="w-full h-48 object-cover rounded-md mb-4 cursor-pointer"
                                    onClick={() => setSelectedNewsEventId(newsEvent.id)}
                                />
                            )}
                            <h2 className="text-2xl font-bold text-gray-800 mb-2 cursor-pointer" onClick={() => setSelectedNewsEventId(newsEvent.id)}>
                                {newsEvent.title}
                            </h2>
                            <p className="text-gray-700 mb-2 cursor-pointer" onClick={() => setSelectedNewsEventId(newsEvent.id)}>
                                {newsEvent.description}
                            </p>
                            <p className="text-gray-500 mb-2 cursor-pointer" onClick={() => setSelectedNewsEventId(newsEvent.id)}>
                                Event Date: {new Date(newsEvent.eventDate).toLocaleDateString()}
                            </p>
                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={() => {
                                        setSelectedNewsEventId(newsEvent.id);
                                        setIsEditing(true);
                                    }}
                                    className="text-blue-600 hover:text-blue-800 text-xl"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={() => handleDelete(newsEvent.id)}
                                    className="text-red-600 hover:text-red-800 text-xl"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">No news/events available.</p>
            )}
            {selectedNewsEventId && (
                <GetNewsEventsModal
                    newsEventId={selectedNewsEventId}
                    closeModal={() => {
                        setSelectedNewsEventId(null);
                        setIsEditing(false);
                    }}
                    onNewsEventUpdated={fetchNewsEvents}
                    isEditing={isEditing}
                />
            )}
        </div>
    );
}
