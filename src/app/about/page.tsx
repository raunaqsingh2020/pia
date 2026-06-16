"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import Footer from "@/components/Footer";

// Register GSAP plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

export default function About() {
    const titleRef = useRef<HTMLDivElement>(null);
    const introRef = useRef<HTMLDivElement>(null);
    const artRef = useRef<HTMLDivElement>(null);

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

        // Create fade animations
        const elements = [
            { ref: titleRef, delay: 0 },
            { ref: introRef, delay: 0.1 },
            { ref: artRef, delay: 0.2 },
        ];

        const animations = elements.map(({ ref, delay }) => {
            if (ref.current) {
                return gsap.fromTo(
                    ref.current,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        delay,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: ref.current,
                            start: "top 80%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            }
            return null;
        });

        return () => {
            animations.forEach((anim) => anim?.kill());
            if (smootherInstance) {
                smootherInstance.kill();
            }
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <div id="smooth-wrapper">
            <main id="smooth-content" className="min-h-screen pt-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div ref={titleRef} className="flex flex-col gap-3 mb-12">
                        <h1 className="text-4xl font-light tracking-wide text-neutral-900">
                            Hello!
                        </h1>
                    </div>

                    <div className="space-y-8 text-neutral-900">
                        <div ref={introRef} className="text-lg leading-8">
                            <p className="mb-4">
                                My name is Pia, and I&apos;m based in New York City. I work at the intersection of big ideas, editorial judgement, and high stakes.
                            </p>
                            <p className="mb-4">
                                I currently work at Genpact (NYSE: G) in the Office of the CEO, where I lead external and internal executive communications, narrative strategy and multi-modal transformation storytelling as the company makes an aggressive pivot to an AI-first operating model.
                            </p>
                            <p className="mb-4">
                                Before that, I was a markets and investing reporter at CNBC covering global financial markets, emerging technology, and the kinds of stories that move money and reshape industries. I have covered some of the world&apos;s biggest stories, including futuristic technologies like humanoid robots and orbital data centers; the rise of ChatGPT and the ensuing AI &ldquo;arms race;&rdquo; the impact of agentic systems on a variety of sectors; two major global wars and one historic presidential election; high-energy Fed days and &lsquo;Mag 7&rsquo; earnings reports, and the wackiest swings in U.S. and global equities. I&apos;ve also reported for The Wall Street Journal&apos;s Markets Bureau, where I published a front-page story and dozens of other features and articles.
                            </p>
                            <p className="mb-4">
                                I studied Communication at the University of Pennsylvania&apos;s Annenberg School, with minors in Political Science and Creative Writing. At Penn, I ran The Daily Pennsylvanian as its Executive Editor and managed a staff of 250+ across three publications.
                            </p>
                            <p>
                                I was trained to find the story, and I&apos;m built to tell yours.
                            </p>
                        </div>

                        <div ref={artRef} className="pt-6">
                            <h2 className="text-xl font-medium text-neutral-900 mb-4 tracking-wide">
                                ART & FILM
                            </h2>
                            <div className="space-y-4 text-base leading-7 text-neutral-700">
                                <p>
                                    I have over a decade of experience in working with traditional and digital creative mediums, with an internationally recognized and published body of film and visual art work. I explore identity through a multimedia process, seeking to illustrate the beauty of human subconscious and physicality through undertones of culture, power, and romance.
                                </p>
                                <p>
                                    Creating is how I perpetually seek to understand and inform the human experience.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </main>
        </div>
    );
}
