import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import ChatBot from "./ChatBot"; 

const FloatingButtons = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChatBot = () => {
    setIsChatOpen(!isChatOpen);
  };
  
  return (
    <>
      <div className="fixed bottom-10 right-10 z-50 space-y-4">
        {/* Floating ChatBot button */}
        <button
          onClick={toggleChatBot}
          className="bg-blue-500 p-4 rounded-full text-white shadow-md hover:bg-blue-600 transition-all flex items-center justify-center"
        >
          <span className="text-2xl">
            <MessageCircle />
          </span>
        </button>

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/your-number"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 p-4 rounded-full text-white shadow-md hover:bg-green-600 transition-all flex items-center justify-center"
        >
          <span className="text-2xl">
            <FaWhatsapp /> 
          </span>
        </a>
      </div>

      {/* ChatBot with proper positioning and z-index */}
      {isChatOpen && (
        <div 
          className="fixed bottom-32 right-10 z-60 bg-white p-4 shadow-xl rounded-lg" 
          style={{ width: '300px', height: '400px' }} // Customize the size of the chatbot
        >
          <ChatBot />
        </div>
      )}
    </>
  );
};

export default FloatingButtons;
