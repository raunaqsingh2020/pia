"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Navigation = () => {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const links = [
        { name: "Home", href: "/" },
        { name: "Journalism", href: "/journalism" },
        { name: "Fine Art", href: "/fine-art" },
        { name: "Recognition", href: "/recognition" },
        { name: "About", href: "/about" },
    ];

    return (
        <>
            {/* Desktop Home Link - Top Left */}
            {pathname !== "/" && (
                <Link
                    href="/"
                    className="fixed top-6 left-6 z-50 text-sm font-light tracking-wide text-neutral-50 hover:text-neutral-200 transition-colors hover:border-neutral-200 pb-0.5 cursor-pointer mix-blend-difference"
                >
                    HOME
                </Link>
            )}

            {/* Menu Button - Visible on Mobile and Tablet */}
            <button
                onClick={() => setIsMenuOpen(true)}
                className="fixed top-6 right-6 z-50 text-sm font-light tracking-wide text-neutral-50 hover:text-neutral-200 transition-colors border-b border-neutral-50 hover:border-neutral-200 cursor-pointer mix-blend-difference md:hidden"
            >
                MENU
            </button>

            {/* Desktop Navigation Links - Visible at Medium Breakpoint and Above */}
            <nav className="hidden md:block fixed top-6 right-6 z-50 mix-blend-difference">
                <ul className="flex gap-8">
                    {links.filter(link => link.href !== "/").map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={`text-sm font-light uppercase tracking-wide transition-colors border-b pb-0.5 ${pathname === link.href
                                    ? "text-neutral-50 border-neutral-50"
                                    : "text-neutral-200 border-transparent hover:text-neutral-50 hover:border-neutral-50"
                                    }
                                `}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Full-Screen Overlay Menu */}
            <div
                className={`fixed inset-0 z-100 bg-white transition-opacity duration-300 ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            >
                <div className="h-full flex flex-col justify-center items-center px-6">
                    {/* Close Button */}
                    <button
                        onClick={() => setIsMenuOpen(false)}
                        className="absolute top-6 right-6 text-sm font-light tracking-wide text-neutral-50 hover:text-neutral-200 transition-colors border-b border-neutral-50 hover:border-neutral-200 cursor-pointer mix-blend-difference"
                    >
                        CLOSE
                    </button>

                    {/* Navigation Links */}
                    <nav className="flex flex-col items-center space-y-6">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => {
                                    // Delay closing the menu to prevent flash of current page
                                    setTimeout(() => setIsMenuOpen(false), 150);
                                }}
                                className={`block text-5xl md:text-7xl font-light tracking-tight transition-all border-b-2 pb-1 text-neutral-900 border-transparent hover:border-neutral-900 cursor-pointer`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </>
    );
};

export default Navigation;
