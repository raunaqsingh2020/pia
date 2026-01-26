"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import Footer from "@/components/Footer";

// Register GSAP plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

type Story = {
    title: string;
    href: string;
};

type OrgSection = {
    name: string;
    logoSrc: string;
    logoAlt: string;
    logoUrl: string;
    groups?: Array<{ title: string; stories: Story[] }>;
    stories?: Story[];
};

function StoriesGrid({ stories }: { stories: Story[] }) {
    return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {stories.map((s) => (
                <Link
                    key={s.title}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                    className="group rounded-2xl border border-neutral-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-sm"
                >
                    <div className="text-[15px] leading-6 text-neutral-900 group-hover:text-neutral-950">
                        {s.title}
                    </div>
                    <div className="mt-3 text-xs tracking-wide text-neutral-500">
                        Read →
                    </div>
                </Link>
            ))}
        </div>
    );
}

const SECTIONS: OrgSection[] = [
    {
        name: "CNBC.com",
        logoSrc: "/logos/cnbc2.svg",
        logoAlt: "CNBC",
        logoUrl: "https://www.cnbc.com/pia-singh/",
        groups: [
            {
                title: "Deep Dives",
                stories: [
                    {
                        title:
                            "AI breakthroughs are speeding up the development of humanoid robots, but investors are still skeptical",
                        href:
                            "https://www.cnbc.com/2024/12/21/ai-speeding-development-of-humanoid-robots-but-investors-skeptical.html",
                    },
                    {
                        title:
                            "AI is unlocking new uses for military drones, boosting demand for these companies",
                        href:
                            "https://www.cnbc.com/2024/08/18/ai-is-unlocking-new-uses-for-military-drones-boosting-demand-for-these-companies.html",
                    },
                    {
                        title:
                            "Tending to AI’s power needs is a booming business. These stocks are in the sweet spot",
                        href:
                            "https://www.cnbc.com/2024/01/23/these-stocks-are-poised-to-benefit-from-power-hungry-ai-.html",
                    },
                    {
                        title:
                            "Can you hack your brain? These companies are driving innovation in the field of brain stimulation",
                        href:
                            "https://www.cnbc.com/2023/11/21/can-you-hack-your-brain-companies-drive-innovation-in-brain-stimulation.html",
                    },
                    {
                        title:
                            "We’re in the era of heat pumps — a market that experts say is ‘set to skyrocket’",
                        href:
                            "https://www.cnbc.com/2024/05/21/were-in-the-era-of-heat-pumps-a-market-that-experts-say-is-set-to-skyrocket.html",
                    },
                ],
            },
            {
                title: "Markets & Financial News",
                stories: [
                    {
                        title:
                            "Tesla could have a tough time living up to the hype around its robotaxi event",
                        href:
                            "https://www.cnbc.com/2024/09/28/tesla-could-have-a-tough-time-living-up-to-the-hype-around-its-robotaxi-event.html",
                    },
                    {
                        title:
                            "Marketwrap: Dow closes down 600 points, Nasdaq enters correction after weak jobs report: Live updates",
                        href: "https://www.cnbc.com/2024/08/01/stock-market-today-live-updates.html",
                    },
                    {
                        title:
                            "What Wall Street can expect from key Biden-Xi meeting as U.S.-China relations remain tense",
                        href:
                            "https://www.cnbc.com/2023/11/14/what-wall-street-can-expect-from-key-biden-xi-meeting-as-us-china-relations-remain-tense.html",
                    },
                    {
                        title:
                            "The divide between retail’s winners and losers will be stark this back-to-school season",
                        href:
                            "https://www.cnbc.com/2023/09/01/divide-between-retail-winners-and-losers-is-stark-this-school-season.html",
                    },
                    {
                        title:
                            "The Fitch analyst behind the U.S. downgrade breaks down the decision—and how the country can regain the top rating",
                        href:
                            "https://www.cnbc.com/2023/08/02/the-fitch-analyst-behind-the-us-downgrade-breaks-down-the-decision.html",
                    },
                    {
                        title:
                            "Small caps are on a tear this year. Here’s how investors are playing the rally.",
                        href:
                            "https://www.cnbc.com/2023/02/16/small-caps-are-on-a-tear-this-year-heres-how-to-play-the-rally.html",
                    },
                    {
                        title:
                            "In Chinatowns across the U.S., tradition and history collide with luxury development",
                        href: "https://www.cnbc.com/2023/05/14/chinatown-rapid-luxury-development.html",
                    },
                ],
            },
        ],
    },
    {
        name: "The Wall Street Journal",
        logoSrc: "/logos/wsj2.svg",
        logoAlt: "The Wall Street Journal",
        logoUrl: "https://www.wsj.com/news/author/pia-singh",
        groups: [
            {
                title: "Articles",
                stories: [
                    {
                        title: "Crypto prices crashed, but true believers are holding on",
                        href: "https://www.wsj.com/finance/currencies/crypto-prices-crashed-but-true-believersare-holding-on-11659143571?mod=markets_lead_pos1",
                    },
                    {
                        title: "Earnings season off to slow start, clouding the outlook for stocks (A1)",
                        href: "https://www.wsj.com/finance/stocks/earnings-season-off-to-slow-start-clouding-the-outlook-for-stocks-11658050381?mod=panda_wsj_author_alert",
                    },
                    {
                        title: "Consumer-staples stocks are bright spot in bleak market",
                        href: "https://www.wsj.com/finance/stocks/consumer-staples-stocks-are-bright-spot-in-bleak-market-11656276800?mod=hp_lead_pos6",
                    },
                    {
                        title: "Tech stocks are back in the market’s driver’s seat",
                        href: "https://www.wsj.com/finance/stocks/tech-stocks-are-back-in-the-markets-drivers-seat-11660123878?mod=markets_lead_pos3",
                    },
                    {
                        title: "Stocks end mostly higher with retail earnings in focus",
                        href: "https://www.wsj.com/finance/stocks/global-stocks-markets-dow-update-08-16-2022-11660645000?mod=markets_major_pos10",
                    },
                ],
            },
            {
                title: "Live Blogging",
                stories: [
                    {
                        title: "Small-cap earnings suggest the economy might be in decent shape",
                        href: "https://www.wsj.com/livecoverage/federal-reserve-meeting-interest-rates-july-2022/card/small-cap-earnings-suggest-the-economy-might-be-in-decent-shape-ocvgBk9KdfKztMHh3bKV",
                    },
                    {
                        title:
                            "Can consumer spending balance out potential cracks in the labor market?",
                        href: "https://www.wsj.com/livecoverage/stock-market-news-today-08-11-2022/card/can-consumer-spending-balance-out-potential-cracks-in-the-labor-market--LOiilF8G6GgKgl4VO9Ld",
                    },
                    {
                        title:
                            "Bed Bath & Beyond stock soars as individual investors grab the meme stock",
                        href: "https://www.wsj.com/livecoverage/stock-market-news-today-08-17-2022/card/bed-bath-beyond-soars-premarket-as-individual-investors-keep-piling-in-xbxyKpamXsYwhbuhBgKd",
                    },
                    {
                        title: 'Jeremy Siegel: "It\'s likely we\'ve seen the bottom"',
                        href: "https://www.wsj.com/livecoverage/stock-market-news-today-08-03-2022/card/jeremy-siegel-we-ve-likely-seen-the-bottom--50NfkzlklUZBHi3BEAiP",
                    },
                    {
                        title: "Stocks close Monday higher, continuing last week’s rally",
                        href: "https://www.wsj.com/livecoverage/stock-market-news-today-08-15-2022/card/stocks-close-monday-higher-continuing-last-week-s-rally-AOqpITgEVM54BHYtKQq7",
                    },
                ],
            },
        ],
    },
    {
        name: "The Daily Pennsylvanian",
        logoSrc: "/logos/dp2.svg",
        logoAlt: "The Daily Pennsylvanian",
        logoUrl: "https://www.thedp.com/staff/pia-singh",
        groups: [
            {
                title: "Articles",
                stories: [
                    {
                        title:
                            "Leaked reports allege that Penn officials led ‘shameless cover-up’ to protect Gene Therapy Program",
                        href: "https://www.thedp.com/article/2022/04/upenn-gene-therapy-program-jim-wilson-corrupt-investigation-toxic-workplace",
                    },
                    {
                        title:
                            "Penn employees allege ‘dysfunctional, toxic workplace’ in Gene Therapy Program",
                        href: "https://www.thedp.com/article/2021/11/penn-gene-therapy-program-toxic-workplace-jim-wilson-accusations-abuse",
                    },
                    {
                        title:
                            "Starbucks stores on Penn’s campus unionize, adding fuel to a nationwide labor movement",
                        href: "https://www.thedp.com/article/2022/05/starbucks-vote-to-unionize-philadelphia-penn-med-walnut-socialist-labor-movement",
                    },
                    {
                        title:
                            "From civil rights to Black Lives Matter: Inside the fight for racial justice at Penn",
                        href: "https://www.thedp.com/article/2020/09/civil-rights-penn-philadelphia-alumni-black-lives-matter",
                    },
                    {
                        title:
                            "‘I would like my normal lungs back’: Students recount physical and emotional toll of COVID-19",
                        href: "https://www.thedp.com/article/2021/01/penn-students-covid-symptoms-pandemic",
                    },
                    {
                        title:
                            "Former ICE director Thomas Homan returned to speak at Penn. Protesters returned too.",
                        href: "https://www.thedp.com/article/2020/01/ice-thomas-homan-protest-immigration-director-penn-border-wall",
                    },
                ],
            },
        ]
    },
];

export default function Journalism() {
    const headerRef = useRef<HTMLDivElement>(null);
    const sectionsRef = useRef<(HTMLElement | null)[]>([]);

    useEffect(() => {
        // Create ScrollSmoother instance once
        const smootherInstance = ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            smooth: 1, // Smoothing factor for scroll
            effects: true, // Enable lag/scroll-based effects
            normalizeScroll: true, // Prevents mobile address bar resizing, disables overscroll bounce
        });

        // Create fade animation for header
        const headerAnimation = headerRef.current
            ? gsap.fromTo(
                headerRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: headerRef.current,
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                }
            )
            : null;

        // Create fade animations for each section
        const sectionAnimations = sectionsRef.current
            .filter((ref) => ref !== null)
            .map((ref, index) => {
                return gsap.fromTo(
                    ref,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        delay: index * 0.1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: ref,
                            start: "top 80%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            });

        return () => {
            headerAnimation?.kill();
            sectionAnimations.forEach((anim) => anim.kill());
            if (smootherInstance) {
                smootherInstance.kill();
            }
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <div id="smooth-wrapper">
            <main id="smooth-content" className="min-h-screen pt-24 px-6">
                <div className="mx-auto max-w-7xl">
                    <div ref={headerRef} className="flex flex-col gap-3">
                        <h1 className="text-4xl font-light tracking-wide text-neutral-900">
                            Journalism
                        </h1>
                        <p className="max-w-2xl text-sm leading-6 text-neutral-600">
                            Selected work across business, markets, and campus reporting.
                        </p>
                    </div>

                    <div className="mt-12 space-y-14">
                        {SECTIONS.map((section, index) => (
                            <section
                                key={section.name}
                                ref={(el) => {
                                    if (el) sectionsRef.current[index] = el;
                                }}
                                className="rounded-3xl bg-neutral-50 p-6 sm:p-8"
                            >
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="flex items-center gap-4">
                                        <Link
                                            key={section.name}
                                            href={section.logoUrl}
                                            target={section.logoUrl.startsWith("http") ? "_blank" : undefined}
                                            rel={section.logoUrl.startsWith("http") ? "noreferrer" : undefined}
                                        >
                                            <Image
                                                src={section.logoSrc}
                                                alt={section.logoAlt}
                                                width={520}
                                                height={80}
                                                className="h-7 w-auto text-neutral-900"
                                            />
                                        </Link>
                                        {/* <div>
                                        <h2 className="text-lg font-medium text-neutral-900">
                                            {section.name}
                                        </h2>
                                        <p className="text-xs text-neutral-500">Click a story to read.</p>
                                    </div> */}
                                    </div>
                                </div>

                                <div className="mt-6 space-y-10">
                                    {section.groups?.map((g) => (
                                        <div key={g.title}>
                                            <h3 className="mb-4 text-xs font-semibold tracking-widest text-neutral-700">
                                                {g.title.toUpperCase()}
                                            </h3>
                                            <StoriesGrid stories={g.stories} />
                                        </div>
                                    ))}
                                    {section.stories ? <StoriesGrid stories={section.stories} /> : null}
                                </div>
                            </section>
                        ))}
                    </div>
                </div>
                <Footer />
            </main>
        </div>
    );
}
