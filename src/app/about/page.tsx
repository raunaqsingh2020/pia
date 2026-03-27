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
                                My name is Pia. I’m 25 years old and live in New York City.
                            </p>
                            <p className="mb-4">
                                I currently work in the Office of the CEO at Genpact (NYSE:G), where I help lead executive communications and media strategy to inform the company’s pivot towards agentic AI and advanced technology solutions.
                            </p>
                            <p className="mb-4">
                                Previously, I was a markets and investing reporter for CNBC, where I reported on global financial markets and futuristic technology trends. I got a chance to cover the world’s biggest stories in recent time, including nascent technologies like humanoid robots and orbital data centers; the rise of ChatGPT and the ensuing AI “arms race;” the impact of agentic systems on a variety of sectors; two major global wars and one historic presidential election; high-energy Fed days and ‘Mag 7’ earnings reports; the wackiest swings in U.S. and global equities and so much more.
                            </p>
                            <p className="mb-4">
                                I have a Bachelor's degree in Communication from the Annenberg School for Communication of the University of Pennsylvania, with minors in Political Science and Creative Writing from the School of Arts & Sciences. During my time at Penn, I was the Executive Editor of The Daily Pennsylvanian, Inc., where I managed 250+ student managers and professional staff members of the company and oversaw the digital and print editorial coverage of the company's 3 publications: The Daily Pennsylvanian, 34th Street Magazine, and Under the Button.
                            </p>
                            <p>
                                Previously, I've interned with The Wall Street Journal's Markets Bureau as a reporter, where I published a front-page print story. I've also worked with Philadelphia Magazine's creative services team and with several Philadelphia-based educational and service-focused nonprofits.
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
