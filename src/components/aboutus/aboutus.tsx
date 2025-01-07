"use client"
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface IMember {
  uuid: string;
  memberName: string;
  memberRole: string;
  memberEmail: string;
  memberMobile: string;
  memberId: string;
  memberDesination: string;
  description: string;
  profilePic: string | null;
  order: string;
  userImageFile: File | null;
}

const TeamCarousel = () => {
  const [members, setMembers] = useState<IMember[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch('http://localhost:3002/team');
        if (!response.ok) throw new Error('Failed to fetch team members');
        const data = await response.json();
        setMembers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? members.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === members.length - 1 ? 0 : prev + 1));
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;
  if (members.length === 0) return <div className="text-center py-8">No team members found</div>;

  return (
    <div className="w-full bg-[#FEDFB2] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Team</h1>
        
        {/* Full width card */}
        <div className="relative bg-white shadow-lg min-h-[500px] mb-8">
          {/* Red top border */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-red-500"></div>
          
          <div className="max-w-7xl mx-auto p-6 ">
            <div className="flex flex-col md:flex-row gap-8 mt-10">
              <div className="md:w-1/2">
                {members[currentIndex].profilePic ? (
                  <img
                    src={members[currentIndex].profilePic}
                    alt={members[currentIndex].memberName}
                    className="w-full h-[300px] object-cover"
                  />
                ) : (
                  <div className="w-full h-[300px] bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No image available</span>
                  </div>
                )}
              </div>
              
              <div className="md:w-1/2">
                <h2 className="text-2xl font-bold text-gray-800">
                  {members[currentIndex].memberName}
                </h2>
                <p className="text-red-500 font-semibold mt-1">
                  {members[currentIndex].memberRole}
                </p>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  {members[currentIndex].description}
                </p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-red-500"></div>
        </div>
                
        {/* External Navigation */}
        <div className="flex justify-between items-center px-4 max-w-7xl mx-auto">
          <button 
            onClick={handlePrevious}
            className="bg-white rounded-full p-3 shadow-lg hover:bg-gray-50"
          >
            <ChevronLeft className="w-8 h-8 text-gray-600" />
          </button>
          
          {/* Dots */}
          <div className="flex gap-2">
            {members.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full ${
                  index === currentIndex ? 'bg-red-500' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button 
            onClick={handleNext}
            className="bg-white rounded-full p-3 shadow-lg hover:bg-gray-50"
          >
            <ChevronRight className="w-8 h-8 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamCarousel;