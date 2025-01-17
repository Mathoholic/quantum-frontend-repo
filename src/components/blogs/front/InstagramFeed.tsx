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
    <>    <div className=" hidden lg:block w-full 2xl:max-h-[500px]  bg-white shadow-lg rounded-lg flex items-center justify-center px-8 py-2 2xl:px-4 2xl:py-1">
      <iframe
        src="http://lightwidget.com/widgets/67a2718a7c9a5ba5ba0b985475511c89.html"
        className="lightwidget-widget rounded-lg"
        style={{
          width: '100%',
          height: '100%',
          border: '0',
          overflow: 'hidden',
          transform: 'scale(1)',
          transformOrigin: '0 0'
        }}
        scrolling="no"
      />
    </div>
    <div className="w-full lg:hidden block 2xl:max-h-[500px]  bg-white shadow-lg rounded-lg flex items-center justify-center px-8 py-2 2xl:px-4 2xl:py-1">
      <iframe
        src="http://lightwidget.com/widgets/dfe47f4dcc2a5b0297d08450bafc2ea9.html"
        className="lightwidget-widget rounded-lg"
        style={{
          width: '100%',
          height: '100%',
          border: '0',
          overflow: 'hidden',
          transform: 'scale(1)',
          transformOrigin: '0 0'
        }}
        scrolling="no"
      />
    </div>
    </>
  );
};

export default LightWidget;


// <!-- LightWidget WIDGET --><script src="https://cdn.lightwidget.com/widgets/lightwidget.js"></script><iframe src="//lightwidget.com/widgets/dfe47f4dcc2a5b0297d08450bafc2ea9.html" scrolling="no" allowtransparency="true" class="lightwidget-widget" style="width:100%;border:0;overflow:hidden;"></iframe>