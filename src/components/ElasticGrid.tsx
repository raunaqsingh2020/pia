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

const NUM_COLUMNS = 3;
const BASE_LAG = 0.5; // Lag applied to the center column
const LAG_SCALE = 0.1; // How much additional lag is applied per column away from center

export default function ElasticGrid({ items, smoother }: ElasticGridProps) {
    const [columns, setColumns] = useState<ArtPiece[][]>([]);
    const gridRef = useRef<HTMLDivElement>(null);
    const columnRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Distribute items into columns
    useEffect(() => {
        const cols: ArtPiece[][] = Array.from({ length: NUM_COLUMNS }, () => []);
        items.forEach((item, index) => {
            cols[index % NUM_COLUMNS].push(item);
        });
        setColumns(cols);
    }, [items]);

    // Apply lag effects to each column
    useEffect(() => {
        if (!smoother || columns.length === 0) return;

        const applyLagEffects = () => {
            const mid = (NUM_COLUMNS - 1) / 2; // Center index

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
    }, [columns, smoother]);

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
                        // so global index = itemIndex * NUM_COLUMNS + colIndex
                        const globalIndex = itemIndex * NUM_COLUMNS + colIndex;
                        return (
                            <div key={`${colIndex}-${itemIndex}`} className="grid-item">
                                <div className="art-item">
                                    <Image
                                        src={item.imageUrl!}
                                        alt={item.title}
                                        width={600}
                                        height={800}
                                        className="art-image"
                                    />
                                    <div className="art-title">{`${String(globalIndex + 1).padStart(2, '0')}. ${item.title}`}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}
