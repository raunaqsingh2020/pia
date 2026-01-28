"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Portrait({ children }: { children?: React.ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const counterRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        // Only run on client
        if (typeof window === "undefined" || !containerRef.current || !imageRef.current) return;

        // Register ScrollTrigger if not already registered (safety check)
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // 1. Initial State
            // Image: Centered (-50%, -50%) + User Offset (50, -50)
            // Use clip-path for "blinds" reveal effect (starts hidden from bottom? User said "reveals upwards")
            // inset(100% 0 0 0) -> Clipped from top 100% down. Reveal goes bottom-up.
            gsap.set(imageRef.current, {
                xPercent: -50,
                yPercent: -50,
                x: 50,
                y: -50,
                clipPath: "inset(100% 0 0 0)",
            });

            // Counter: Needs to cancel out the User Offset (50, -50) to stay aligned with page center.
            // So we apply (-50, 50).
            if (counterRef.current) {
                gsap.set(counterRef.current, {
                    x: -50, // Cancel out image x:50
                    y: 50,  // Cancel out image y:-50
                });
            }

            gsap.set(containerRef.current, {
                opacity: 0,
            });

            // 2. Entrance Animation
            const tl = gsap.timeline({ delay: 0.5 });

            tl.to(containerRef.current, {
                opacity: 1,
                duration: 0.5,
            })
                .to(imageRef.current, {
                    clipPath: "inset(0% 0 0 0)",
                    duration: 1.1,
                    ease: "power3.out",
                }, "<");

            // 3. Scroll Parallax Effect
            // We use pixel values for Y movement to make inversion easy.
            const parallaxY = -150; // Move up by 150px over the scroll

            const st = ScrollTrigger.create({
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: true,
                animation: gsap.timeline()
                    .to(imageRef.current, {
                        y: `+=${parallaxY}`, // Relative movement
                        ease: "none",
                    })
                    // Animate the counter-content in the opposite direction
                    .to(counterRef.current, {
                        y: `-=${parallaxY}`,
                        ease: "none"
                    }, "<"),
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={containerRef}
            className="absolute top-0 right-0 h-full w-full pointer-events-none overflow-hidden z-10 opacity-0"
            style={{ isolation: "isolate" }}
        >
            <div
                ref={imageRef}
                className="absolute top-1/2 left-1/2 w-[150px] sm:w-[180px] md:w-[230px] lg:w-[250px] xl:w-[270px] aspect-[3/4]"
            >
                {/* The Portrait Image */}
                <div className="relative w-full h-full">
                    <Image
                        src="/portrait.png"
                        alt="Portrait of Pia Singh"
                        fill
                        className="object-cover object-center transition-all duration-700"
                        sizes="600px"
                        quality={100}
                        priority
                    />
                </div>

                {/* The Masked Overlay Content */}
                {children && (
                    <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
                        {/* 
                   Counter-Ref: 
                   Positioned absolutely 100vw/100vh centered on the parent.
                   This creates a "viewport" that matches the screen, pinned to the center of the image.
                   We then use GSAP translated offsets to align it perfectly with the real screen.
                */}
                        <div
                            ref={counterRef}
                            className="absolute left-1/2 top-1/2 w-[100vw] h-[max(500px,calc(100vh-75px))] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
                        >
                            {/* 
                        Use a wrapper that matches the page's main layout padding/structure 
                        to ensure perfect alignment of the text.
                    */}
                            <div className="w-full h-full flex flex-col justify-between px-6 py-12">
                                <div className="flex-1 flex items-center justify-center">
                                    {children}
                                </div>
                                {/* Spacer for bottom bio to match flex distribution if needed, but text is mainly centered */}
                                <div className="max-w-2xl opacity-0">
                                    <p className="text-md font-light leading-relaxed">
                                        A financial reporter and multi-format creator telling stories that matter.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
