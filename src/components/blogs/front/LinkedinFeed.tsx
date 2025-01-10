import React from 'react';

const JuicerFeed: React.FC = () => {
  return (
    <div className="flex justify-center items-center p-4">
      <iframe
        src="https://www.juicer.io/api/feeds/centocode-technologies-pvt-ltd/iframe"
        frameBorder="0"
        width="1000"
        height="1000"
        className="rounded-lg shadow-lg"
        style={{ display: 'block', margin: '0 auto' }}
        title="Juicer Feed"
      ></iframe>
    </div>
  );
};

export default JuicerFeed;
