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
  initialReverse = false,
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
  initialReverse?: boolean;
  contentAnimation?: string;
  imageAnimation?: string;
}) => {
  const ContentSection = () => (
    <div className={`flex-1 p-2 rounded-lg lg:p-6 lg:rounded-xl text-center 2xl:border 2xl:rounded-2xl lg:text-left ${bgcontentColor} ${contentAnimation}`}>
      <div className="p-4">
        <h2
          className={`2xl:text-[52px] lg:text-4xl text-2xl ${titleColor} font-bold leading-tight 2xl:leading-tight`}
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
          className="text-lg 2xl:text-2xl max-w-2xl p-2 mx-auto lg:mx-0"
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
              <div className="flex items-center gap-3 justify-start lg:justify-start">
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
              <p className="text-sm text-start sm:text-base text-black font-outfit ml-9">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const ImageSection = () => (
    <div className="relative w-full rounded-md h-[300px] sm:h-[300px] lg:h-[500px] overflow-hidden">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="object-contain transition-transform duration-300 rounded-lg hover:scale-95"
        priority
      />
    </div>
  );

  return (
    <>
    <div className={`${bgColor} ${className} hidden lg:block  py-6 px-3 2xl:px-10 lg:py-12`}>
      <div className=" px-2 sm:px-12 lg:px-16 items-center">
        <div
          className={`flex flex-col-reverse  lg:flex-row items-center gap-4 lg:gap-8 ${
            (reverse || initialReverse) ? 'lg:flex-row-reverse' : ''
          }`}
        >
          <div className="flex-1">
            <ContentSection />
          </div>
          <div className="flex-1">
            <ImageSection />
          </div>
        </div>
      </div>
    </div>
    <div className={`${bgColor} ${className} block lg:hidden  py-6 px-3 2xl:px-10 lg:py-12`}>
      <div className=" px-2 sm:px-12 lg:px-16 items-center">
        <div
          className={`flex flex-col gap-5`}
        >
          <div className="flex-1 order-2">
            <ImageSection />
          </div>
          <div className="flex-1 order-1">
            <ContentSection />
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default FeatureSection;
