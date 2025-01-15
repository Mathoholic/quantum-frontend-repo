import Head from "next/head";
import PanoramaSlider from "../components/carousel";

export default function Home() {
  return (
    <>
      <Head>
        <title>Panorama Slider</title>
        <meta name="description" content="A panorama slider using Swiper.js in Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center ">
        <PanoramaSlider />
      </main>
    </>
  );
}
