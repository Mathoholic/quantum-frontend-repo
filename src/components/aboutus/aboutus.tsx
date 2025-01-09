"use client"
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TeamMember {
  uuid: string;
  memberName: string;
  memberRole: string;
  description: string;
  profilePic?: string;
}

const TeamCarousel = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
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
    setCurrentSlide((prev) => (prev === 0 ? members.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === members.length - 1 ? 0 : prev + 1));
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;
  if (members.length === 0) return <div className="text-center py-8">No team members found</div>;

  const visibleMembers = members.slice(currentSlide, currentSlide + 4);
  if (visibleMembers.length < 4) {
    visibleMembers.push(...members.slice(0, 4 - visibleMembers.length));
  }

  return (
    <div className="w-full min-h-screen bg-[#FEDFB2] py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-16">Team</h1>
        
        <div className="relative mb-8">
          <div className="flex justify-between gap-6">
            {visibleMembers.map((member, index) => (
              <div key={member.uuid} className="w-1/4 perspective">
                <div className="relative preserve-3d duration-500 group-hover:rotate-y-180 cursor-pointer group">
                  {/* Card Front */}
                  <div className="w-full bg-white rounded-lg shadow-lg backface-hidden">
                    {member.profilePic ? (
                      <img
                        src={member.profilePic}
                        alt={member.memberName}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500">No image available</span>
                      </div>
                    )}
                    <div className="p-4 text-center">
                      <h2 className="text-xl font-bold text-gray-800">{member.memberName}</h2>
                      <p className="text-sm text-gray-500">{member.memberRole}</p>
                    </div>
                  </div>

                  {/* Card Back */}
                  {/* <div className="absolute inset-0 w-full h-full bg-white rounded-lg shadow-lg p-6 rotate-y-180 backface-hidden">
                    <div className="flex items-center justify-center h-full">
                      <p className="text-gray-600 text-center">{member.description}</p>
                    </div>
                  </div> */}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation moved below cards */}
        <div className="flex justify-between items-center max-w-md mx-auto mt-12">
          <button 
            onClick={handlePrevious}
            className="bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-8 h-8 text-gray-600" />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {members.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-red-500' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button 
            onClick={handleNext}
            className="bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-8 h-8 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamCarousel;