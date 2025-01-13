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
      <div className="fixed bottom-10 right-10 z-50 flex space-x-4">
        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/${918971133673}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 p-2 rounded-full text-white shadow-md hover:bg-green-600 transition-all flex items-center justify-center"
        >
          <span className="text-xl">
            <FaWhatsapp /> 
          </span>
        </a>

        {/* Floating ChatBot button */}
        <button
          onClick={toggleChatBot}
          className="bg-blue-500 p-2  rounded-full text-white shadow-md hover:bg-blue-600 transition-all flex items-center justify-center"
        >
          <span className="text-xl">
            <MessageCircle />
          </span>
        </button>
      </div>

      {/* ChatBot with proper positioning and z-index */}
      {isChatOpen && (
        <div className="fixed bottom-[200px] right-10 z-50">
          <ChatBot />
        </div>
      )}
    </>
  );
};

export default FloatingButtons;
