"use client";

import { useEffect, useState } from "react";
import ElasticGrid from "@/components/ElasticGrid";
import Footer from "@/components/Footer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

// Register GSAP plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

const ART_PIECES = [
    { title: "YOUR FULLNESS, TOO, WILL COME IF YOU DARE TO BE EMPTY", imageUrl: "/art/1.webp" },
    { title: "SELF PORTRAIT IN MEHNDI", imageUrl: "/art/2.webp" },
    { title: "PORTRAIT", imageUrl: "/art/3.webp" },
    { title: "LOVE IN A PANDEMIC", imageUrl: "/art/4.gif" },
    { title: "INVOCATION", imageUrl: "/art/5.webp" },
    { title: "SYNESTHESIA (SELF PORTRAIT)", imageUrl: "/art/6.webp" },
    { title: "EXIT (STILL LIFE)", imageUrl: "/art/7.webp" },
    { title: "SUN", imageUrl: "/art/8.webp" },
    { title: "ANTITHESIS (SELF PORTRAIT)", imageUrl: "/art/9.webp" },
    { title: "IN TANDEM (STILL LIFE)", imageUrl: "/art/10.webp" },
    { title: "FIGURE SERIES", imageUrl: "/art/11.webp" },
    { title: "TOO TOUGH TO DROWN", imageUrl: "/art/12.webp" },
    { title: "SELF PORTRAIT AT 19", imageUrl: "/art/13.webp" },
    { title: "SAUDADE", imageUrl: "/art/14.webp" },
    { title: "WHAT MORE DO YOU WANT", imageUrl: "/art/15.webp" },
    { title: "INTROVERSION", imageUrl: "/art/16.webp" },
    { title: "IT COMES AND GOES", imageUrl: "/art/17.webp" },
    { title: "SEE THROUGH", imageUrl: "/art/19.webp" },
    { title: "SHADE", imageUrl: "/art/20.webp" },
    { title: "PORTRAIT", imageUrl: "/art/21.webp" },
    { title: "RECOGNIZE", imageUrl: "/art/22.webp" },
    { title: "PORTRAIT", imageUrl: "/art/23.webp" },
    { title: "RED-EYED", imageUrl: "/art/25.webp" },
    { title: "BRAIDS 1", imageUrl: "/art/27.webp" },
    { title: "BRAIDS 2", imageUrl: "/art/24.webp" },
    { title: "PORTRAIT", imageUrl: "/art/26.webp" },
    { title: "IT'S TULIP SEASON", imageUrl: "/art/28.webp" },
    { title: "PLAIN", imageUrl: "/art/29.webp" },
    { title: "I BELONG IN THE SUN", imageUrl: "/art/30.webp" },
    { title: "ART AT PENN: FINAL EXHIBITION POSTER", imageUrl: "/art/31.webp" },
];

export default function FineArt() {
    const [smoother, setSmoother] = useState<ScrollSmoother | null>(null);

    useEffect(() => {
        // Create ScrollSmoother instance once
        const smootherInstance = ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            smooth: 1, // Smoothing factor for scroll
            effects: true, // Enable lag/scroll-based effects
            normalizeScroll: true, // Prevents mobile address bar resizing, disables overscroll bounce
        });

        // Use requestAnimationFrame to defer state update
        requestAnimationFrame(() => {
            setSmoother(smootherInstance);
        });

        return () => {
            if (smootherInstance) {
                smootherInstance.kill();
            }
        };
    }, []);

    return (
        <div id="smooth-wrapper">
            <main id="smooth-content" className="min-h-screen pt-24">
                <div className="px-6 mb-12">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-4xl font-light tracking-wide text-neutral-900 mb-2">
                            Fine Art
                        </h1>
                        <p className="text-sm text-neutral-600">
                            2015 - PRESENT
                        </p>
                    </div>
                </div>
                <div className="w-full">
                    <ElasticGrid items={ART_PIECES} smoother={smoother} />
                </div>
                <Footer />
            </main>
        </div>
    );
}
