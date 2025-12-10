import { useEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface ScrollSection {
    ref: RefObject<HTMLElement | null>;
    slideFrom?: "left" | "right" | "top" | "bottom";
    pin?: boolean;
    pinSpacing?: boolean;
    scrub?: number | boolean;
    start?: string;
    end?: string;
}

interface UseGSAPScrollOptions {
    sections: ScrollSection[];
    enabled?: boolean;
}

export const useGSAPScroll = ({ sections, enabled = true }: UseGSAPScrollOptions) => {
    useEffect(() => {
        if (!enabled) return;

        // Filter out sections that don't have a current ref
        const validSections = sections.filter((section) => section.ref.current);
        if (validSections.length === 0) return;

        const triggers: ScrollTrigger[] = [];
        const animations: gsap.core.Tween[] = [];

        validSections.forEach((section, index) => {
            const {
                ref,
                slideFrom,
                pin = false,
                pinSpacing = false,
                scrub = 1,
                start = "top top",
                end = "+=100%",
            } = section;

            if (!ref.current) return;

            // Create pinning effect if enabled
            if (pin) {
                const pinTrigger = ScrollTrigger.create({
                    trigger: ref.current,
                    start,
                    end,
                    pin: true,
                    pinSpacing,
                    scrub,
                });
                triggers.push(pinTrigger);
            }

            // Create slide-in animation if specified
            if (slideFrom && index > 0) {
                const previousSection = validSections[index - 1];

                // Determine initial position based on slide direction
                const initialPosition = getInitialPosition(slideFrom);

                const animation = gsap.fromTo(
                    ref.current,
                    initialPosition,
                    {
                        x: "0%",
                        y: "0%",
                        ease: "none",
                        scrollTrigger: {
                            trigger: previousSection.ref.current,
                            start: previousSection.start || "top top",
                            end: previousSection.end || "+=100%",
                            scrub: previousSection.scrub || 1,
                        },
                    }
                );
                animations.push(animation);
            }
        });

        // Refresh ScrollTrigger to ensure positions are correct
        ScrollTrigger.refresh();

        // Cleanup function
        return () => {
            triggers.forEach((trigger) => trigger.kill());
            animations.forEach((animation) => animation.kill());
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, [sections, enabled]);
};


const getInitialPosition = (
    direction: "left" | "right" | "top" | "bottom"
): { x?: string; y?: string } => {
    switch (direction) {
        case "left":
            return { x: "-100%" };
        case "right":
            return { x: "100%" };
        case "top":
            return { y: "-100%" };
        case "bottom":
            return { y: "100%" };
        default:
            return {};
    }
};

export default useGSAPScroll;
