import React from 'react';

const MainContent: React.FC = () => {
  return (
    <main className="flex flex-col items-center text-center w-full h-auto justify-center gap-[20px] px-4 absolute inset-x-0 top-20">
      <h1 className=" font-extrabold text-gray-800 mb-4 w-full max-w-[576px] font-comic text-[60px] font-bold leading-[75px]">
        Take A Quantum Leap Into Learning
      </h1>
      <p className="text-gray-600 text-lg max-w-2xl">
        Quantum kids is a new age, progressive pre-school aiming to provide
        Child-Centric education hugely inspired by Montessori philosophy. Our
        thoughtfully designed environment nurtures each child's natural
        curiosity and creativity, inspiring them to become passionate and
        life long learners.
      </p>
    </main>
  );
};

export default MainContent;
