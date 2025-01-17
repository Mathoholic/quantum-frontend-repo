"use client"
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import TeamMemberCard from './TeamMemberCard';
import TeamMemberModal from './TeamMemberModal';
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch('http://208.109.214.146:3002/team');
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

  const handleOpenModal = (member: TeamMember) => {
    setSelectedMember(member);
  };

  const handleCloseModal = () => {
    setSelectedMember(null);
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;
  if (members.length === 0) return <div className="text-center text-2xl lg:text-3xl 2xl:4xl text py-8">No team members found</div>;

  return (
    <div className="w-full min-h-full bg-[#FEDFB2] py-16 fade-in">
      <div className="max-w-7xl lg:max-w-5xl 2xl:max-w-[1600px] mx-auto">
        <h1 className="text-4xl lg:text-5xl 2xl:text-[54px] font-comic font-bold text-center lg:mb-8 2xl:mb-10 slide-up">Team Members</h1>
        
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          breakpoints={{
            1024: {
              slidesPerView: 3,
            },
            1536: {
              slidesPerView: 4,
            },
          }}
          pagination={{
            clickable: true,
            el: '.swiper-pagination',
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
            renderBullet: (index, className) => `<span class="${className}">${index + 1}</span>`,
          }}
          navigation
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {members.map((member) => (
            <SwiperSlide key={member.uuid}>
              <TeamMemberCard member={member} onOpenModal={handleOpenModal} />
            </SwiperSlide>
          ))}
        </Swiper>
        {selectedMember && (
          <TeamMemberModal member={selectedMember} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
};

export default TeamCarousel;