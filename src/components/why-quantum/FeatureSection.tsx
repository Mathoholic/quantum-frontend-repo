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
    className = ''
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
  }) => {
  const ContentSection = () => (
    <div className="flex-1 space-y-6 lg:p-8">
      <h2 className={`text-3xl sm:text-4xl lg:text-5xl ${titleColor} font-medium leading-tight`} style={{ fontFamily: 'Comic Sans MS', fontSize: '48px', fontWeight: 400, lineHeight: '66.89px', textAlign: 'left', textUnderlinePosition: 'from-font', textDecorationSkipInk: 'none' }}>
        {title}
      </h2>
      {content && (
        <p className="text-base sm:text-lg lg:text-xl font-outfit max-w-2xl" style={{ fontFamily: 'Outfit', fontSize: '20px', fontWeight: 600, lineHeight: '25.2px', letterSpacing: '0.02em', textAlign: 'left', textUnderlinePosition: 'from-font', textDecorationSkipInk: 'none' }}>
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
    <div className={`${bgColor} ${className} w-full py-4 lg:py-8`}>
      <div className="container  px-16">
        <div className={`flex flex-col lg:flex-row items-center gap-8 ${reverse ? 'lg:flex-row-reverse' : ''}`}>
          <ContentSection />
          <ImageSection />
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
