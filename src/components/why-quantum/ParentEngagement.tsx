import React from 'react';
import FeatureSection from './FeatureSection';

const ParentEngagement = () => (
  <FeatureSection
    className="animate-fade-in"
    bgColor="bg-[#FEDFB2]"
    bgcontentColor = "bg-[#FFF6C8]"
    title="Parent Engagement & Support"
    titleColor="text-[#E14B30]"
    imageSrc="/why-quantum/teacher-laptop.svg"
    imageAlt="Parent Engagement"
    checklistItems={[
      {
        title: "Workshops & Programs",
        description: "Regular workshops and activities that foster strong parent-child relationships and empower parents with tools to support their child's learning and development beyond schooling.",
        iconBgColor: "bg-[#E14B30]",
        titleColor: "text-[#E14B30]"
      },
      {
        title: "Tracking & Monitoring Your Child's Growth",
        description: "Easy access to updates on your child's progress.",
        iconBgColor: "bg-[#E14B30]",
        titleColor: "text-[#E14B30]"
      },
      {
        title: "Parent-Teacher Meetings (PTMs)",
        description: "Regular meetings to discuss and track development.",
        iconBgColor: "bg-[#E14B30]",
        titleColor: "text-[#E14B30]"
      },
      {
        title: "WhatsApp Groups",
        description: "Stay connected with updates, events, and announcements.",
        iconBgColor: "bg-[#E14B30]",
        titleColor: "text-[#E14B30]"
      }
    ]}
  />
);

export default ParentEngagement;
