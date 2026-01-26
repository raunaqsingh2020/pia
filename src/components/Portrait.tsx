"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Portrait() {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        // Only run on client
        if (typeof window === "undefined" || !containerRef.current || !imageRef.current) return;

        const ctx = gsap.context(() => {
            // 1. Initial State
            // Center the image with CSS top-1/2 left-1/2, then pull back 50% with xPercent/yPercent.
            gsap.set(imageRef.current, {
                xPercent: -50,
                yPercent: -50,
                x: 50,
                y: -50,
                opacity: 0,
                scale: 0.9, // Start slightly smaller for entrance effect
            });

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
                    opacity: 1,
                    scale: 1,
                    duration: 1.5,
                    ease: "power3.out",
                }, "<"); // Run start of this animation with start of previous

            // 3. Scroll Parallax Effect
            // Move from -50% (centered) to -30% (moved down slightly) as we scroll
            // allowing it to move smoothly.
            gsap.to(imageRef.current, {
                yPercent: -30,
                ease: "none",
                scrollTrigger: {
                    trigger: "body",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: true,
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={containerRef}
            className="absolute top-0 right-0 h-full w-full pointer-events-none overflow-hidden mix-blend-multiply opacity-80"
            style={{ isolation: "isolate" }} // Helps with z-index contexts
        >
            <div
                ref={imageRef}
                className="absolute top-1/2 left-1/2 w-[180px] md:w-[230px] lg:w-[250px] xl:w-[270px] aspect-[3/4]"
            >
                <Image
                    src="/portrait.png"
                    alt="Portrait of Pia Singh"
                    fill
                    className="object-cover object-center transition-all duration-700"
                    sizes="(max-width: 768px) 40vw, 30vw"
                    priority
                />
            </div>
        </div>
    );
}
