"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function ConditionalFooter() {
    const pathname = usePathname();
    
    // Don't show footer in layout for fine-art page (it's included in the page itself)
    if (pathname === "/fine-art") {
        return null;
    }
    
    return <Footer />;
}

