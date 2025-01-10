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
    <div className="w-full bg-white shadow-lg rounded-lg px-16 py-4">
      <iframe
        src="//lightwidget.com/widgets/5f7649ce486b58f59e86138d6de8a7e5.html"
        className="lightwidget-widget rounded-lg"
        style={{
          width: '100%',
          height: '300px',
          border: '0',
          overflow: 'hidden',
        }}
        scrolling="no"
      />
    </div>
  );
};

export default LightWidget;