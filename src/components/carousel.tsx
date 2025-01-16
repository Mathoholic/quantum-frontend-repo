'use client'

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

const images = [
  { id: "nature-1", src: "/carousel/1.png" },
  { id: "nature-2", src: "/carousel/2.png" },
  { id: "nature-3", src: "/carousel/3.png" },
  { id: "nature-4", src: "/carousel/4.png" },
  { id: "nature-5", src: "/carousel/5.png" },
  { id: "nature-6", src: "/carousel/6.png" },
  { id: "nature-7", src: "/carousel/7.png" },
  { id: "nature-8", src: "/carousel/8.png" },
];

const Panorama: React.FC = () => {
  const pathname = usePathname();
  const sliderInitialized = useRef(false);

  const initializeSlider = () => {
    // Check if the slider is already initialized
    if (window && (window as any).PanoramaSlider && !sliderInitialized.current) {
      const sliderElement = document.querySelector(".panorama-slider");
      if (sliderElement) {
        (window as any).PanoramaSlider.init(sliderElement);
        sliderInitialized.current = true;
      }
    }
  };

  useEffect(() => {
    // Load external CSS and scripts
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://panorama-slider.uiinitiative.com/assets/index.c1d53924.css";
    document.head.appendChild(link);

    const preloadLink = document.createElement("link");
    preloadLink.rel = "modulepreload";
    preloadLink.href =
      "https://panorama-slider.uiinitiative.com/assets/vendor.dba6b2d2.js";
    document.head.appendChild(preloadLink);

    const script = document.createElement("script");
    script.type = "module";
    script.crossOrigin = "anonymous";
    script.src =
      "https://panorama-slider.uiinitiative.com/assets/index.d2ce9dca.js";
    script.onload = initializeSlider;
    document.body.appendChild(script);

    // Cleanup
    return () => {
      document.head.removeChild(link);
      document.head.removeChild(preloadLink);
      document.body.removeChild(script);
      sliderInitialized.current = false;
    };
  }, []);

  useEffect(() => {
    // Reinitialize the slider on pathname changes
    initializeSlider();
  }, [pathname]);

  return (
    <>
      <div className="panorama-slider bg-[#d5f3f5] p-4">
        <div className="swiper">
          <div className="swiper-wrapper">
            {images.map((image) => (
              <div key={image.id} className="swiper-slide">
                <Image
                  className="slide-image"
                  src={image.src}
                  alt={image.id}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            ))}
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </div>
    </>
  );
};

export default Panorama;
