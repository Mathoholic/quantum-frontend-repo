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
    <div className="bg-[#ffe0b3] py-12 px-4 lg:px-8 2xl:px-16">
      <h2 ref={headingRef} className="2xl:text-[52px] text-4xl font-bold font-comic text-center text-gray-800 mb-14">Highlights</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-6 2xl:gap-8 2xl:max-w-[1440px] max-w-[1120px] mx-auto px-2 lg:px-4 2xl:px-8">
        {highlights.map((highlight, index) => (
          <div
            key={index}
            ref={(el) => {
              highlightsRef.current[index] = el!;
            }}
            className="bg-[#fcb13f] rounded-lg p-10 shadow-md text-outfit flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:rotate-1"
          >
            <Image
              src={highlight.imageSrc}
              alt={highlight.alt}
              width={300}
              height={250}
              className="mb-4 rounded-lg 2xl:w-[300px] 2xl:h-[250px] xl:w-[250px] xl:h-[200px] lg:w-[200px] lg:h-[150px]"
            />
            <h3 className="text-lg 2xl:text-2xl font-semibold mb-2 text-gray-900 ">{highlight.title}</h3>
            <p className="text-lg text-gray-700 2xl:text-2xl">{highlight.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Highlights;
