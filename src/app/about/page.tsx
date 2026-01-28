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
    const journalismRef = useRef<HTMLDivElement>(null);
    const artRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Only enable ScrollSmoother on desktop (768px and above)
        let smootherInstance: ScrollSmoother | null = null;
        let isCurrentlyDesktop = typeof window !== "undefined" && window.innerWidth >= 768;
        
        if (isCurrentlyDesktop) {
            smootherInstance = ScrollSmoother.create({
                wrapper: "#smooth-wrapper",
                content: "#smooth-content",
                smooth: 1, // Smoothing factor for scroll
                effects: true, // Enable lag/scroll-based effects
                normalizeScroll: true, // Prevents mobile address bar resizing, disables overscroll bounce
            });
        }

        const handleResize = () => {
            const nowDesktop = window.innerWidth >= 768;
            if (!isCurrentlyDesktop && nowDesktop && !smootherInstance) {
                // Window resized from mobile to desktop
                isCurrentlyDesktop = true;
                smootherInstance = ScrollSmoother.create({
                    wrapper: "#smooth-wrapper",
                    content: "#smooth-content",
                    smooth: 1,
                    effects: true,
                    normalizeScroll: true,
                });
            } else if (isCurrentlyDesktop && !nowDesktop && smootherInstance) {
                // Window resized from desktop to mobile
                isCurrentlyDesktop = false;
                smootherInstance.kill();
                smootherInstance = null;
            }
        };

        window.addEventListener("resize", handleResize);

        // Create fade animations
        const elements = [
            { ref: titleRef, delay: 0 },
            { ref: introRef, delay: 0.1 },
            { ref: journalismRef, delay: 0.2 },
            { ref: artRef, delay: 0.3 },
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
            window.removeEventListener("resize", handleResize);
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
                        <div ref={introRef}>
                            <p className="text-lg leading-8 mb-4">
                                My name is Pia. I&apos;m a Markets Reporter at CNBC.com based in New York City, where I report on global financial markets and cover investing trends tied to the future of our world. I specialize in researching and writing about innovative technologies. I&apos;m also an experienced fine artist and storyteller.
                            </p>
                            <p className="text-lg leading-8">
                                I have a Bachelor&apos;s degree in Communication from the Annenberg School for Communication of the University of Pennsylvania, with minors in Political Science and Creative Writing from the School of Arts & Sciences.
                            </p>
                        </div>

                        <div ref={journalismRef} className="pt-6">
                            <h2 className="text-xl font-medium text-neutral-900 mb-4 tracking-wide">
                                JOURNALISM & DIGITAL STRATEGY
                            </h2>
                            <div className="space-y-4 text-base leading-7 text-neutral-700">
                                <p>
                                    I&apos;ve reported on toxic workplace environments and alleged corruption at a multimillion-dollar biotech operation housed in an Ivy League university; AI-enabled military technology; crypto&apos;s true believers; long-term investing trends across health care and energy industries; the history of racial injustice in Philadelphia; the deaths of college peers; local voter turnout and live election polling; a renewed labor movement driven by local unions; as well as the lingering emotional and financial toll of the Covid-19 pandemic.
                                </p>
                                <p>
                                    Simply put, I&apos;m fascinated by stories that explore the webs of money and institutional power, and those that humanize the people affected by these systems.
                                </p>
                                <p>
                                    Previously, I&apos;ve interned with The Wall Street Journal&apos;s Markets Bureau and CNBC.com&apos;s Markets and Embeds desks. I&apos;ve also worked with Philadelphia Magazine&apos;s creative services team and with several Philadelphia-based educational and service-focused nonprofits.
                                </p>
                                <p>
                                    During my time at Penn, I was the Executive Editor of The Daily Pennsylvanian, Inc., where I managed 250+ student managers and professional staff members of the company and oversaw the digital and print editorial coverage of the company&apos;s 3 publications: The Daily Pennsylvanian, 34th Street Magazine, and Under the Button. I led the newsroom through a vital period of digital and internal transformation with an eye towards sustaining its daily operations, maintaining and repurposing its extensive budget, focusing on diversity, inclusion and retention efforts, as well as transforming the company&apos;s long-term content production, product innovation, and financial initiatives. I was also on the board of Penn&apos;s premier fashion and culture publication, The WALK Magazine, as its lead videographer and team director.
                                </p>
                            </div>
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
