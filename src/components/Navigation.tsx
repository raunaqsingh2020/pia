"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigation = () => {
    const pathname = usePathname();

    const links = [
        { name: "Journalism", href: "/journalism" },
        { name: "Fine Art", href: "/fine-art" },
        { name: "Recognition", href: "/recognition" },
        { name: "About", href: "/about" },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-neutral-200">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="text-xl font-light tracking-wide text-neutral-900 hover:text-neutral-600 transition-colors">
                        Pia Singh
                    </Link>
                    <ul className="flex gap-8">
                        {links.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={`text-sm font-light tracking-wide transition-colors ${pathname === link.href
                                            ? "text-neutral-900"
                                            : "text-neutral-500 hover:text-neutral-900"
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
