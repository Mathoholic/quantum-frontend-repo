import Header from '@/components/Header';
import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="bg-blue-100 min-h-screen flex flex-col items-center justify-center">
      

      <main className="flex flex-col items-center text-center py-16">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Take A Quantum Leap Into Learning
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl">
          Quantum kids is a new age, progressive pre-school aiming to provide
          Child-Centric education hugely inspired by Montessori philosophy. Our
          thoughtfully designed environment nurtures each child's natural
          curiosity and creativity, inspiring them to become passionate and
          life long learners.
        </p>
        <button className="mt-8 bg-pink-500 text-white px-6 py-3 rounded-lg text-lg">
          Let’s Get Started
        </button>
      </main>

      <footer className="flex space-x-4 mt-10">
        <div className="bg-orange-400 w-12 h-12 rounded-full"></div>
        <div className="bg-teal-400 w-12 h-12 rounded-full"></div>
      </footer>
    </div>
  );
};

export default Home;
