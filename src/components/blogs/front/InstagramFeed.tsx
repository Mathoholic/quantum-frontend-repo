'use client'

import { useEffect } from 'react';

const LightWidget: React.FC = () => {
  useEffect(() => {
    // Dynamically load the LightWidget script
    const script = document.createElement('script');
    script.src = 'https://cdn.lightwidget.com/widgets/lightwidget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup the script when the component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="w-full 2xl:max-h-[500px] bg-white shadow-lg rounded-lg px-8 py-2 2xl:px-4 2xl:py-1">
      <iframe
        src="http://lightwidget.com/widgets/31361854a1635f699014530873e69dec.html"
        className="lightwidget-widget rounded-lg"
        style={{
          width: '100%',
          height: '200px',
          border: '0',
          overflow: 'hidden',
          transform: 'scale(0.8)',
          transformOrigin: '0 0'
        }}
        scrolling="no"
      />
    </div>
  );
};

export default LightWidget;


