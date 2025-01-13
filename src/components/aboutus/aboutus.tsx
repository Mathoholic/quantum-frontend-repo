"use client"
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TeamMemberCard from './TeamMemberCard';
import CarouselNavigation from './CarouselNavigation';
import "../../styles/about-us.css";

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

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(".fade-in, .slide-up");
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          el.classList.add("visible");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
    <div className="w-full min-h-screen bg-[#FEDFB2] py-16 fade-in">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-16 slide-up">Team</h1>
        
        <div className="relative mb-8">
          <div className="flex justify-between gap-6">
            {visibleMembers.map((member) => (
              <TeamMemberCard key={member.uuid} member={member} />
            ))}
          </div>
        </div>

        <CarouselNavigation 
          members={members} 
          currentSlide={currentSlide} 
          handlePrevious={handlePrevious} 
          handleNext={handleNext} 
          setCurrentSlide={setCurrentSlide} 
        />
      </div>
    </div>
  );
};

export default TeamCarousel;