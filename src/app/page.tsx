"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import Footer from "@/components/Footer";
import Portrait from "@/components/Portrait";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

export default function Home() {
  useEffect(() => {
    // Detect mobile device using user agent
    const isMobile = typeof window !== "undefined" && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // Only enable ScrollSmoother on non-mobile devices
    let smootherInstance: ScrollSmoother | null = null;

    if (!isMobile) {
      smootherInstance = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1, // Smoothing factor for scroll
        effects: true, // Enable lag/scroll-based effects
        normalizeScroll: true, // Prevents mobile address bar resizing, disables overscroll bounce
      });
    }

    return () => {
      if (smootherInstance) {
        smootherInstance.kill();
      }
    };
  }, []);

  return (
    <div id="smooth-wrapper" className="min-h-dvh">
      <main id="smooth-content" className="relative min-h-[max(500px,calc(100dvh-75px))] flex flex-col justify-between px-6 py-12">
        <Portrait>
          {/* Masked Text Overlay - Color matches background #F2F3F4 */}
          <div className="w-full max-w-5xl text-[#F2F3F4]">
            <h1 className="text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] leading-none font-medium tracking-tight">
              PIA
            </h1>
            <h1 className="text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] leading-none font-medium tracking-tight text-right md:-mt-8">
              SINGH
            </h1>
          </div>
        </Portrait>

        {/* Hero Section with Large Name */}
        <div className="flex-1 flex items-center justify-center bg-[#F2F3F4]">
          <div className="w-full max-w-5xl">
            <h1 className="text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] leading-none font-medium tracking-tight text-neutral-900">
              PIA
            </h1>
            <h1 className="text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] leading-none font-medium tracking-tight text-neutral-900 text-right md:-mt-8">
              SINGH
            </h1>
          </div>
        </div>

        {/* Bio at Bottom */}
        <div className="max-w-2xl">
          <p className="text-md font-light text-neutral-700 leading-relaxed">
            A financial reporter and multi-format creator telling stories that matter.
          </p>
        </div>
      </main >

      <Footer />
    </div >
  );
}
