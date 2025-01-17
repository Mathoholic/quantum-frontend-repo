import BlogSection from "@/components/blogs/front/Social";
import LightWidget from "@/components/blogs/front/InstagramFeed";

export default function Home() {
  return (
    <div className="bg-sky-100  p-4 2xl:p-2 text-center">
      {/* Blog Section */}
      <section className="space-y-8">
        <BlogSection />
        <div className="w-full flex justify-center pb-10">
          <LightWidget />
          
        </div>
      </section>
    </div>
  );
}
