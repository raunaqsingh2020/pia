"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ScrollSmoother } from "gsap/ScrollSmoother";

type ArtPiece = {
    title: string;
    imageUrl?: string;
};

type ElasticGridProps = {
    items: ArtPiece[];
    smoother?: ScrollSmoother | null;
};

const BASE_LAG = 0.5; // Lag applied to the center column
const LAG_SCALE = 0.1; // How much additional lag is applied per column away from center

const getNumColumns = () => {
    if (typeof window === 'undefined') return 3;
    return window.innerWidth <= 768 ? 2 : 3;
};

export default function ElasticGrid({ items, smoother }: ElasticGridProps) {
    const [columns, setColumns] = useState<ArtPiece[][]>([]);
    const [numColumns, setNumColumns] = useState(() => getNumColumns());
    const gridRef = useRef<HTMLDivElement>(null);
    const columnRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Handle window resize to update number of columns
    useEffect(() => {
        const handleResize = () => {
            setNumColumns(getNumColumns());
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Distribute items into columns
    useEffect(() => {
        const cols: ArtPiece[][] = Array.from({ length: numColumns }, () => []);
        items.forEach((item, index) => {
            cols[index % numColumns].push(item);
        });
        setColumns(cols);
    }, [items, numColumns]);

    // Apply lag effects to each column
    useEffect(() => {
        if (!smoother || columns.length === 0) return;

        const applyLagEffects = () => {
            const mid = (numColumns - 1) / 2; // Center index

            columnRefs.current.forEach((column, i) => {
                if (!column) return;

                const distance = Math.abs(i - mid); // Distance from center column
                const lag = BASE_LAG + distance * LAG_SCALE; // Lag based on distance from center

                // Apply lag effect to this column
                smoother.effects(column, { speed: 1, lag });
            });
        };

        // Wait for DOM to be ready
        const timeoutId = setTimeout(() => {
            applyLagEffects();
        }, 100);

        // Handle resize - reapply effects
        const handleResize = () => {
            applyLagEffects();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener("resize", handleResize);
        };
    }, [columns, smoother, numColumns]);

    return (
        <div ref={gridRef} className="grid-container">
            {columns.map((columnItems, colIndex) => (
                <div
                    key={colIndex}
                    ref={(el) => {
                        columnRefs.current[colIndex] = el;
                    }}
                    className="grid-column"
                >
                    {columnItems.map((item, itemIndex) => {
                        // Calculate global index: items are distributed round-robin,
                        // so global index = itemIndex * numColumns + colIndex
                        const globalIndex = itemIndex * numColumns + colIndex;
                        return (
                            <div key={`${colIndex}-${itemIndex}`} className="mb-8 break-inside-avoid w-full md:mb-4 lg:mb-16">
                                <div className="flex flex-col gap-3">
                                    <Image
                                        src={item.imageUrl!}
                                        alt={item.title}
                                        width={600}
                                        height={800}
                                        className="w-full h-auto object-cover block"
                                    />
                                    <div className="text-[0.65rem] font-light text-[#171717] leading-6 tracking-[0.01em] uppercase md:text-[0.9375rem] lg:text-base">{`${String(globalIndex + 1).padStart(2, '0')}. ${item.title}`}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}
