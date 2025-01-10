import React from "react";
import Image from "next/image";

const testimonials = [
  {
    text: "I am so glad we chose Quantum Kids for our daughter, Anaya. From day one, the teachers have been so warm and supportive, making her transition to preschool smooth and stress-free. Anaya has blossomed into a confident and curious learner. The activities are so engaging that she comes home every day excited to share what she’s learned. We couldn’t be happier with the nurturing environment Quantum Kids provides!",
    author: "Parent of Anaya",
  },
  {
    text: "Quantum Kids has been a blessing for our son, Aarav. He used to struggle with sharing and interacting with other kids, but the team at Quantum Kids has worked wonders. The play-based curriculum and group activities have helped him develop better social skills and teamwork. Aarav has become more independent and confident in expressing himself. We’re truly grateful for everything the school has done for him!",
    author: "Parent of Aarav",
  },
  {
    text: "Choosing Quantum Kids for our son, Ishaan, was the best decision we made. The school’s emphasis on creativity and exploration has fueled his imagination and curiosity. The teachers ensure that each child feels valued, and Ishaan loves every moment he spends there. He has developed strong problem-solving skills and a deep love for learning. We’re so impressed with the care and thoughtfulness of the program at Quantum Kids!",
    author: "Parent of Ishaan",
  },
];

const Testimonials: React.FC = () => {
  return (
    <div className="bg-[#fcdce6] py-24 relative">
      <Image 
        src="paint.svg" 
        alt="Decorative Image" 
        width={158.06} 
        height={166.79} 
        className="absolute top-[-50px] left-10 m-4"
      />
      <h2 className="text-4xl font-bold font-comic text-center mb-8">Stories That Speak for Themselves</h2>
      <p className="text-center text-gray-600 mb-8 text-outfit">
        Discover What Our Customers Have to Say About Their Experience with Us
      </p>  
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-[#ed477c] rounded-lg p-6 shadow-md flex flex-col justify-between relative"
          >
            <p className="text-white italic mb-4 mt-20">"{testimonial.text}"</p>
            <p className="text-white font-semibold">— {testimonial.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
