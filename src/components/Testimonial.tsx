'use client'

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    text: "I am so glad we chose Quantum Kids for our daughter, Anaya. From day one, the teachers have been so warm and supportive, making her transition to preschool smooth and stress-free. Anaya has blossomed into a confident and curious learner. The activities are so engaging that she comes home every day excited to share what she’s learned. We couldn’t be happier with the nurturing environment Quantum Kids provides!",
    author: "Parent of Anaya",
  },
  {
    text: "Quantum Kids has been a blessing for our son, Aarav. He used to struggle with sharing and interacting with other kids, but the team at Quantum Kids has worked wonders. The play-based curriculum and group activities have helped him develop better social skills and teamwork. Aarav has become more independent and confident in expressing himself. We’re truly grateful for everything the school has done for him!",
    author: "Parent of Aarav",
  },
  {
    text: "Choosing Quantum Kids for our son, Ishaan, was the best decision we made. The school’s emphasis on creativity and exploration has fueled his imagination and curiosity. The teachers ensure that each child feels valued, and Ishaan loves every moment he spends there. He has developed strong problem-solving skills and a deep love for learning. We’re so impressed with the care and thoughtfulness of the program at Quantum Kids!",
    author: "Parent of Ishaan",
  },
];

const Testimonials: React.FC = () => {
  const paintImageRef = useRef(null);
  const testimonialRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (headingRef.current) {
      gsap.from(headingRef.current, {
        opacity: 1,
        y: -50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }

    gsap.fromTo(
      paintImageRef.current,
      { x: "-100vw", rotation: 0 },
      {
        x: 0,
        rotation: 360,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: paintImageRef.current,
          start: "top bottom",
        },
      }
    );

    testimonialRefs.current.forEach((ref, index) => {
      if (ref) {
        gsap.fromTo(
          ref,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ref,
              start: "top bottom",
            },
            delay: index * 0.2,
          }
        );
      }
    });
  }, []);

  return (
    <div className="bg-[#fcdce6] lg:py-24 py-10 relative">
      <div ref={paintImageRef} className="absolute top-[-50px] lg:left-10  m-4">
        <Image 
          src="paint.svg" 
          alt="Decorative Image" 
          width={158.06} 
          height={166.79} 
          className="w-20 lg:w-40 2xl:w-52"
        />
      </div>
      <h2 ref={headingRef} className="2xl:text-[52px] lg:text-4xl text-2xl font-bold font-comic text-center text-pink-600 mb-2 2xl:mb-4 ">Stories That Speak for Themselves</h2>
      <p className="text-center text-gray-600 mb-8 text-outfit 2xl:text-[24px] 2xl:mb-12">
        Discover What Our Parents Have to Say About Their Experience with Us
      </p>  
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 2xl:max-w-[1250px] lg:max-w-[920px] max-w-6xl mx-auto px-4">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            ref={(el) => {
              testimonialRefs.current[index] = el;
            }}
            className="bg-[#ed477c] rounded-lg p-6 shadow-md flex flex-col justify-between relative transform transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:rotate-1"
          >
            <p className="text-white italic font-outfit mb-4  2xl:text-[24px]">"{testimonial.text}"</p>
            <p className="text-white font-outfit 2xl:text-[24px]">— {testimonial.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
