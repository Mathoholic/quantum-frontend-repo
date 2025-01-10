'use client'

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  {
    title: "Holistic Development",
    description:
      "Our school is dedicated to nurturing not just Academic excellence, but also social-emotional skills, physical growth, Gross and fine motor skills and Practical Life skills—making your child ready for the future.",
    imageSrc: "/holistic.svg",
    alt: "Holistic Development",
  },
  {
    title: "Personalised Learning Journey",
    description:
      "We understand that every child is unique and cater to their individual needs, ensuring the best possible learning environment.",
    imageSrc: "/learning.svg",
    alt: "Personalised Learning Journey",
  },
  {
    title: "High Learning outcomes",
    description:
      "Our curriculum is designed to deliver measurable and meaningful learning outcomes, ensuring a seamless transition to formal schooling while equipping children with a strong foundation.",
    imageSrc: "/high_learning.svg",
    alt: "High Learning outcomes",
  },
  {
    title: "Commitment to Quality",
    description:
      "From facilities to faculty, every aspect of our school is designed to ensure your child thrives.",
    imageSrc: "/quality.svg",
    alt: "Commitment to Quality",
  },
];

const Highlights: React.FC = () => {
  const highlightsRef = useRef<HTMLDivElement[]>([]);
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

    highlightsRef.current.forEach((el, index) => {
      gsap.from(el, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none",
          onEnter: () => {
            gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: "power3.out" });
          },
        },
      });
    });
  }, []);

  return (
    <div className="bg-[#ffe0b3] py-12">
      <h2 ref={headingRef} className="text-4xl font-bold font-comic text-center mb-8">Highlights</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-4">
        {highlights.map((highlight, index) => (
          <div
            key={index}
            ref={(el) => {
              highlightsRef.current[index] = el!;
            }}
            className="bg-[#fcb13f] rounded-lg p-6 shadow-md text-outfit flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:rotate-1"
          >
            <Image
              src={highlight.imageSrc}
              alt={highlight.alt}
              width={217}
              height={153}
              className="mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{highlight.title}</h3>
            <p className="text-gray-700">{highlight.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Highlights;
