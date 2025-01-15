import React from 'react';
import Image from "next/image";

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
    checklistItems = [] as ChecklistItem[],
    className = '',
    bgcontentColor = '',
    initialReverse = false, // Add this line
    contentAnimation = '',
    imageAnimation = '',
  }: {
    bgColor: string;
    title: React.ReactNode;
    titleColor?: string;
    content?: string;
    imageSrc: string;
    imageAlt: string;
    reverse?: boolean;
    checklistItems?: ChecklistItem[];
    className?: string;
    bgcontentColor?: string;
    initialReverse?: boolean; // Add this line
    contentAnimation?: string;
    imageAnimation?: string;
  }) => {
  const ContentSection = () => (
    <div className={`flex-1 space-y-6 lg:p-8 text-center 2xl:border 2xl:rounded-2xl lg:text-left ${bgcontentColor} ${contentAnimation}`}>
      <div className=" p-4"> {/* Added background color */}
        <h2
          className={`2xl:text-[52px] text-4xl  ${titleColor} font-bold leading-tight`}
          style={{
            fontFamily: 'Comic Sans MS',
            textAlign: 'left',
            textUnderlinePosition: 'from-font',
            textDecorationSkipInk: 'none',
          }}
        >
          {title}
        </h2>
      </div>
      {content && (
        <p
          className="text-lg 2xl:text-2xl max-w-2xl mx-auto lg:mx-0"
          style={{
            fontFamily: 'Outfit',
            fontWeight: 500,
            lineHeight: '1.6',
            letterSpacing: '0.02em',
            textAlign: 'left',
          }}
        >
          {content}
        </p>
      )}
      {checklistItems.length > 0 && (
        <div className="space-y-4 mt-6">
          {checklistItems.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <div
                  className={`w-6 h-6 ${item.iconBgColor || 'bg-pink-500'} rounded-full flex items-center justify-center`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    fill="white"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 18L4.5 13.5L6 12L9 15L18 6L19.5 7.5L9 18Z" />
                  </svg>
                </div>
                <h3
                  className={`text-lg sm:text-xl ${item.titleColor || 'text-pink-500'} font-serif`}
                >
                  {item.title}
                </h3>
              </div>
              <p className="text-sm sm:text-base text-black font-outfit ml-9">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const ImageSection = () => (
    <div className={`flex-1 relative ${imageAnimation}`}>
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
    <div className={`${bgColor} ${className}  py-6 2xl:px-20 lg:py-12 `}>
      <div className=" px-6 sm:px-12 lg:px-16 items-center ">
        <div className={`flex flex-col lg:flex-row items-center gap-8 ${reverse ? 'lg:flex-row-reverse' : initialReverse ? 'lg:flex-row-reverse' : ''}`}> {/* Modify this line */}
          <div className="flex-1 ">
            <ContentSection />
          </div>
          <div className="flex-1">
            <ImageSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
