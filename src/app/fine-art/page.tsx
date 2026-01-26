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
    { title: "YOUR FULLNESS, TOO, WILL COME IF YOU DARE TO BE EMPTY" },
    { title: "LOVE IN A PANDEMIC" },
    { title: "SUN" },
    { title: "SELF PORTRAIT AT 19" },
    { title: "WHAT MORE DO YOU WANT" },
    { title: "INTROVERSION" },
    { title: "IT COMES AND GOES" },
    { title: "SAUDADE" },
    { title: "LIFE CYCLE (ONE LOOP)" },
    { title: "SEE THROUGH" },
    { title: "ART AT PENN: FINAL EXHIBITION POSTER" },
    { title: "SELF PORTRAIT IN MEHNDI" },
    { title: "INVOCATION" },
    { title: "EXIT (STILL LIFE)" },
    { title: "TOO TOUGH TO DROWN" },
    { title: "SHADE" },
    { title: "PORTRAIT" },
    { title: "RED-EYED" },
    { title: "BRAIDS 1" },
    { title: "PLAIN" },
    { title: "PORTRAIT" },
    { title: "SYNESTHESIA (SELF PORTRAIT)" },
    { title: "ANTITHESIS (SELF PORTRAIT)" },
    { title: "IN TANDEM (STILL LIFE)" },
    { title: "I BELONG IN THE SUN" },
    { title: "STOLEN" },
    { title: "IT'S TULIP SEASON" },
    { title: "RECOGNIZE" },
    { title: "PORTRAIT" },
    { title: "BRAIDS 2" },
    { title: "PORTRAIT IN FLUX" },
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
                            2015-PRESENT
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
