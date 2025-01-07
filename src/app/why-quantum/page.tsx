import React from 'react';
import Image from "next/image";

const WhyQuantum = () => {
  // Reusable feature section component
  interface ChecklistItem {
    title: string;
    description: string;
    iconBgColor?: string;
    titleColor?: string;
  }
  
  const FeatureSection = ({ 
      bgColor, 
      title, 
      titleColor = 'text-black',
      content, 
      imageSrc, 
      imageAlt,
      reverse = false,
      checklistItems = [] as ChecklistItem[]
    }: {
      bgColor: string;
      title: React.ReactNode;
      titleColor?: string;
      content?: string;
      imageSrc: string;
      imageAlt: string;
      reverse?: boolean;
      checklistItems?: ChecklistItem[];
    }) => {
    const ContentSection = () => (
      <div className="flex-1 space-y-6 p-4 lg:p-8">
        <h2 className={`text-3xl sm:text-4xl lg:text-5xl ${titleColor} font-medium leading-tight`}>
          {title}
        </h2>
        {content && (
          <p className="text-base sm:text-lg lg:text-xl font-serif max-w-2xl">
            {content}
          </p>
        )}
        {checklistItems.length > 0 && (
          <div className="space-y-4 mt-6">
            {checklistItems.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 ${item.iconBgColor || 'bg-pink-500'} rounded-full flex items-center justify-center`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="white" viewBox="0 0 24 24">
                      <path d="M9 18L4.5 13.5L6 12L9 15L18 6L19.5 7.5L9 18Z" />
                    </svg>
                  </div>
                  <h3 className={`text-lg sm:text-xl ${item.titleColor || 'text-pink-500'} font-serif`}>
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-black ml-9">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    );

    const ImageSection = () => (
      <div className="flex-1 relative">
        <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] overflow-hidden">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-contain transition-transform duration-300 hover:scale-95"
            priority
          />
        </div>
      </div>
    );

    return (
      <div className={`${bgColor} w-full py-8 lg:py-12`}>
        <div className="container mx-auto">
          <div className={`flex flex-col lg:flex-row items-center gap-8 ${reverse ? 'lg:flex-row-reverse' : ''}`}>
            <ContentSection />
            <ImageSection />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* Child-Centric Curriculum Section */}
      <FeatureSection
        bgColor="bg-[#D4F3F5]"
        title="Child-Centric Curriculum"
        content="Our curriculum is designed with CHILD at the core, based on extensive research and emphasis on PLAY based learning. According to NEP guidelines, it is a perfect blend of Montessori and other progressive methodologies, which are proven to help immensely in a child's overall development."
        imageSrc="/why-quantum/teacher.svg"
        imageAlt="Teacher illustration"
      />

      {/* KREEDO Section */}
      <FeatureSection
        bgColor="bg-[#097B2C33]"
        title={<>Our academic partner - <span className="text-green-500">KREEDO</span></>}
        content="With over 15 years of experience in early education, KREEDO has been instrumental in providing an integrated curriculum that blends innovative teaching methods, promising high learning outcomes."
        imageSrc="/why-quantum/kreedo-image.svg"
        imageAlt="Kreedo"
        reverse={true}
      />

      {/* Infrastructure Section */}
      <FeatureSection
        bgColor="bg-[#FCDAE5]"
        title="State-of-the-Art Infrastructure"
        titleColor="text-[#EE487C]"
        imageSrc="/why-quantum/student-study.svg"
        imageAlt="Infrastructure"
        checklistItems={[
          {
            title: "Spacious & Fully Furnished Classrooms",
            description: "Designed to foster creativity and engagement, our classrooms are bright, airy, and conducive to learning.",
            iconBgColor: "bg-[#EE487C]",
            titleColor: "text-[#EE487C]"
          },
          {
            title: "Fully Equipped Library",
            description: "A rich selection of books for every age group, nurturing a love for reading and knowledge.",
            iconBgColor: "bg-[#EE487C]",
            titleColor: "text-[#EE487C]"
          },
          {
            title: "Montessori Lab",
            description: "Featuring 250+ age-appropriate materials, our Montessori lab supports hands-on learning and cognitive growth in early childhood.",
            iconBgColor: "bg-[#EE487C]",
            titleColor: "text-[#EE487C]"
          },
          {
            title: "Covered Playground",
            description: "Our safe and spacious outdoor play area encourages physical activity, social interactions, and gross motor skill development.",
            iconBgColor: "bg-[#EE487C]",
            titleColor: "text-[#EE487C]"
          }
        ]}
      />

      {/* Safety & Security Section */}
      <FeatureSection
        bgColor="bg-[#FCDAE5]"
        title="Safety & Security"
        titleColor="text-[#EE487C]"
        imageSrc="/why-quantum/teacher-studying.svg"
        imageAlt="Safety and Security"
        reverse={true}
        checklistItems={[
          {
            title: "CCTV Surveillance",
            description: "Ensuring the highest levels of security.",
            iconBgColor: "bg-[#EE487C]",
            titleColor: "text-[#EE487C]"
          },
          {
            title: "Child-Friendly Spaces",
            description: "Designed to prioritise the safety and comfort of every child.",
            iconBgColor: "bg-[#EE487C]",
            titleColor: "text-[#EE487C]"
          },
          {
            title: "Safe Hands",
            description: "Well-trained and compassionate staff with a focus on care and protection.",
            iconBgColor: "bg-[#EE487C]",
            titleColor: "text-[#EE487C]"
          }
        ]}
      />

      {/* Hygiene & Cleanliness Section */}
      <FeatureSection
        bgColor="bg-[#FCDAE5]"
        title="Hygiene & Cleanliness"
        titleColor="text-[#EE487C]"
        imageSrc="/why-quantum/teacher-handwash.svg"
        imageAlt="Hygiene and Cleanliness"
        checklistItems={[
          {
            title: "Child-Friendly Hygiene Practices",
            description: "Clean, accessible hand-washing stations and well-maintained washrooms.",
            iconBgColor: "bg-[#EE487C]",
            titleColor: "text-[#EE487C]"
          },
          {
            title: "Focus on Health & Well-being",
            description: "Ensuring a safe and healthy environment for all students.",
            iconBgColor: "bg-[#EE487C]",
            titleColor: "text-[#EE487C]"
          }
        ]}
      />

      {/* Skilled Teachers Section */}
      <FeatureSection
        bgColor="bg-[#FEDFB2]"
        title="Highly Skilled, Approachable Teachers"
        titleColor="text-[#111111]"
        imageSrc="/why-quantum/teacher-thinking.svg"
        imageAlt="Skilled Teachers"
        checklistItems={[
          {
            title: "Expert Faculty",
            description: "Our teachers are not only highly trained but also passionate, experienced, and dedicated to your child's growth.",
            iconBgColor: "bg-[#E14B30]",
            titleColor: "text-[#E14B30]"
          },
          {
            title: "Teacher-Child Ratio",
            description: "1:15 along with support staff - ensuring individual attention and support.",
            iconBgColor: "bg-[#E14B30]",
            titleColor: "text-[#E14B30]"
          },
          {
            title: "Approachability",
            description: "Our teachers foster open communication with parents, creating a collaborative environment for each child's development.",
            iconBgColor: "bg-[#E14B30]",
            titleColor: "text-[#E14B30]"
          }
        ]}
      />

      {/* Assessment Approach Section */}
      <FeatureSection
        bgColor="bg-[#FEDFB2]"
        title="Assessment Approach"
        titleColor="text-[#E14B30]"
        imageSrc="/why-quantum/teacher-teaching.svg"
        imageAlt="Assessment"
        reverse={true}
        checklistItems={[
          {
            title: "For Learning & Of Learning",
            description: "Assessments are designed to guide your child's progress and identify areas for further development.",
            iconBgColor: "bg-[#E14B30]",
            titleColor: "text-[#E14B30]"
          },
          {
            title: "Observation Records",
            description: "Continuous monitoring through observation helps us adjust the learning path according to the child's evolving needs.",
            iconBgColor: "bg-[#E14B30]",
            titleColor: "text-[#E14B30]"
          }
        ]}
      />

      {/* Parent Engagement Section */}
      <FeatureSection
        bgColor="bg-[#FEDFB2]"
        title="Parent Engagement & Support"
        titleColor="text-[#E14B30]"
        imageSrc="/why-quantum/teacher-handwash.svg"
        imageAlt="Parent Engagement"
        checklistItems={[
          {
            title: "Workshops & Programs",
            description: "Regular workshops and activities that foster strong parent-child relationships and empower parents with tools to support their child's learning and development beyond schooling.",
            iconBgColor: "bg-[#E14B30]",
            titleColor: "text-[#E14B30]"
          },
          {
            title: "Tracking & Monitoring Your Child's Growth",
            description: "Easy access to updates on your child's progress.",
            iconBgColor: "bg-[#E14B30]",
            titleColor: "text-[#E14B30]"
          },
          {
            title: "Parent-Teacher Meetings (PTMs)",
            description: "Regular meetings to discuss and track development.",
            iconBgColor: "bg-[#E14B30]",
            titleColor: "text-[#E14B30]"
          },
          {
            title: "WhatsApp Groups",
            description: "Stay connected with updates, events, and announcements.",
            iconBgColor: "bg-[#E14B30]",
            titleColor: "text-[#E14B30]"
          }
        ]}
      />
    </div>
  );
};

export default WhyQuantum;
