import BlogSection from "@/components/blogs/front/BlogSection";
import GameCard from "@/components/blogs/front/GameCard";

export default function Home() {
  return (
    <div className="bg-sky-50 min-h-screen">
      {/* Game Card Section */}
      <section className="flex justify-center items-center ">
        <GameCard />
      </section>

      {/* Blog Section */}
      <section className="">
        <BlogSection />
      </section>
    </div>
  );
}
