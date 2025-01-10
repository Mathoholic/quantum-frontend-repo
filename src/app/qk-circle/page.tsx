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
          
        </div>
      </section>
    </div>
  );
}
