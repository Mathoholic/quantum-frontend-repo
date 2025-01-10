import BlogSection from "@/components/blogs/front/BlogSection";
import GameCard from "@/components/blogs/front/GameCard";
import LightWidget from "@/components/blogs/front/InstagramFeed";
import JuicerFeed from "@/components/blogs/front/LinkedinFeed";

export default function Home() {
  return (
    <div className="bg-sky-100 min-h-screen p-8">
      {/* Blog Section */}
      <section className="space-y-8">
        <BlogSection />
        <div className="grid grid-row-1 md:grid-row-3 gap-4">
          <LightWidget />
          <JuicerFeed/>
          <div className="w-full relative bg-white shadow-lg rounded-lg px-8 py-4">
            <div className="text-center font-semibold py-2">Facebook Widget Placeholder</div>
          </div>
          <div className="w-full relative bg-white shadow-lg rounded-lg px-8 py-4">
            <div className="text-center font-semibold py-2">LinkedIn Widget Placeholder</div>
          </div>
        </div>
      </section>
    </div>
  );
}
