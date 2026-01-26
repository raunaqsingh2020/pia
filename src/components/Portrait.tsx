"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Portrait() {
    const [scrollY, setScrollY] = useState(0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Calculate parallax offset
    // Moving slower than scroll for parallax effect (usually factor < 1)
    // Or user wants it to "smoothly move as page is expanded or scrolled"
    // Let's make it move upwards slightly as we scroll down to give it a "lifting" feel or standard parallax.
    const translateY = scrollY * 0.2;

    return (
        <div
            className={`absolute top-0 right-0 z-0 pointer-events-none transition-opacity duration-1000 ease-out"
                }`}
            style={{
                // Combine the entry transition (handled by class) with the scroll parallax
                transform: `translate3d(0, ${translateY}px, 0)`,
                // We override the class transform for the parallax, but the opacity transition still handles the entry fade
            }}
        >
            <div
                className="relative w-[30vw] min-w-[150px] max-w-[300px] aspect-[3/4] mr-[30vw] mt-[5vh]"
            >
                <Image
                    src="/portrait.png"
                    alt="Portrait of Singh"
                    fill
                    className="object-cover object-center"
                    priority
                    sizes="(max-width: 768px) 100vw, 33vw"
                />
            </div>
        </div>
    );
}
