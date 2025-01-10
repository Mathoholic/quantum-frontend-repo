"use client";

import React, { useState, useRef, useEffect } from "react";

const ChatBot = () => {
  const [isChatBotVisible, setIsChatBotVisible] = useState(true); // State to toggle visibility
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hi! I'm here to help you register. Can I have your first name?",
      avatar: "👋",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [currentStep, setCurrentStep] = useState("firstName");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    parentName: "",
    location: "",
    email: "",
    mobileNumber: "",
    program: "",
  });

  const programs = ["Daycare", "Playgroup", "Nursery", "LKG", "UKG"];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  const validatePhone = (phone: string) => /^\d{10}$/.test(phone);

  const handleProgramSelection = async (program: string) => {
    setFormData((prev) => ({ ...prev, program }));
    setMessages((prev) => [
      ...prev,
      { type: "user", text: program, avatar: "👤" },
      { type: "bot", text: "Thank you! I'll submit your registration now.", avatar: "✅" },
    ]);
    setCurrentStep("submit");

    const submissionData = { ...formData, program };

    await handleSubmit(submissionData);
  };

  const handleNextStep = (value: string) => {
    let isValid = true;
    let botResponse = "";
    let nextStep = "";
    let avatar = "🤖";

    switch (currentStep) {
      case "firstName":
        if (value.trim()) {
          setFormData((prev) => ({ ...prev, firstName: value }));
          botResponse = `Nice to meet you, ${value}! What's your last name?`;
          nextStep = "lastName";
          avatar = "😊";
        } else {
          isValid = false;
          botResponse = "Please enter a valid first name.";
          avatar = "⚠️";
        }
        break;

      case "lastName":
        if (value.trim()) {
          setFormData((prev) => ({ ...prev, lastName: value }));
          botResponse = "Great! What's your parent's name?";
          nextStep = "parentName";
          avatar = "👥";
        } else {
          isValid = false;
          botResponse = "Please enter a valid last name.";
          avatar = "⚠️";
        }
        break;

      case "parentName":
        if (value.trim()) {
          setFormData((prev) => ({ ...prev, parentName: value }));
          botResponse = "Which area are you located in?";
          nextStep = "location";
          avatar = "📍";
        } else {
          isValid = false;
          botResponse = "Please enter a valid parent's name.";
          avatar = "⚠️";
        }
        break;

      case "location":
        if (value.trim()) {
          setFormData((prev) => ({ ...prev, location: value }));
          botResponse = "Please enter your mobile number (10 digits):";
          nextStep = "mobileNumber";
          avatar = "📱";
        } else {
          isValid = false;
          botResponse = "Please enter a valid location.";
          avatar = "⚠️";
        }
        break;

      case "mobileNumber":
        if (validatePhone(value)) {
          setFormData((prev) => ({ ...prev, mobileNumber: value }));
          botResponse = "Please enter your email address:";
          nextStep = "email";
          avatar = "📧";
        } else {
          isValid = false;
          botResponse = "Please enter a valid 10-digit mobile number.";
          avatar = "⚠️";
        }
        break;

      case "email":
        if (validateEmail(value)) {
          setFormData((prev) => ({ ...prev, email: value }));
          botResponse = "Please select a program by clicking on one of the options below.";
          nextStep = "program";
          avatar = "📚";
        } else {
          isValid = false;
          botResponse = "Please enter a valid email address.";
          avatar = "⚠️";
        }
        break;
    }

    if (isValid) {
      setMessages((prev) => [
        ...prev,
        { type: "user", text: value, avatar: "👤" },
        { type: "bot", text: botResponse, avatar },
      ]);
      setCurrentStep(nextStep);
      setInputValue("");
    } else {
      setMessages((prev) => [
        ...prev,
        { type: "user", text: value, avatar: "👤" },
        { type: "bot", text: botResponse, avatar },
      ]);
    }
  };

  const handleSubmit = async (submissionData: any) => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3002/form/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });
      if (response.ok) {
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            text: "Registration submitted successfully! We will contact you soon.",
            avatar: "🎉",
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            text: "There was an error submitting your registration. Please try again later.",
            avatar: "❌",
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: "There was an error submitting your registration. Please try again later.",
          avatar: "❌",
        },
      ]);
    } finally {
      setIsLoading(false);
      setCurrentStep("complete");
    }
  };

  if (!isChatBotVisible) return null; 

  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg w-80 h-[80vh] flex flex-col">
      {/* Header */}
      <div className="bg-blue-500 text-white p-4 rounded-t-lg flex justify-between items-center">
        <h2 className="text-lg font-semibold">ChatBot Registration</h2>
        <button
          onClick={() => setIsChatBotVisible(false)}
          className="text-white text-lg font-bold focus:outline-none"
        >
          ✖
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
          >
            {message.type === "bot" && (
              <div className="w-8 h-8 rounded-full flex items-center justify-center mr-2 bg-blue-100">
                {message.avatar}
              </div>
            )}
            <div
              className={`max-w-[75%] p-3 rounded-lg ${
                message.type === "user"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-gray-100 text-gray-800 rounded-bl-none"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        {currentStep === "program" && (
          <div className="space-y-2">
            {programs.map((program, index) => (
              <button
                key={index}
                onClick={() => handleProgramSelection(program)}
                className="block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                {program}
              </button>
            ))}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t">
        {currentStep !== "complete" && currentStep !== "program" && (
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isLoading) handleNextStep(inputValue);
              }}
              placeholder="Type your message..."
              className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={() => handleNextStep(inputValue)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBot;
