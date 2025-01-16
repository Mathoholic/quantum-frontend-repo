import BlogSection from "@/components/blogs/front/BlogSection";
import LightWidget from "@/components/blogs/front/InstagramFeed";
import FacebookWidget from "@/components/blogs/front/Facebook";

export default function Home() {
  return (
    <div className="bg-sky-100 min-h-screen p-4 2xl:p-2 text-center">
      {/* Blog Section */}
      <section className="space-y-8">
        <BlogSection />
        <div className="grid grid-row-1 md:grid-row-3 2xl:px-10 2xl:grid-row-4 gap-2 2xl:gap-4">
          <LightWidget />
          <FacebookWidget />
        </div>
      </section>
    </div>
  );
}
