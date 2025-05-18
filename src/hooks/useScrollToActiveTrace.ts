import { useEffect, useRef } from "react";

export function useScrollToActiveTrace<T extends HTMLElement>(
    activeIndex: number | null
) {
    const itemRefs = useRef<(T | null)[]>([]);

    useEffect(() => {
        if (activeIndex === null) return;

        const el = itemRefs.current[activeIndex];
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [activeIndex]);

    return itemRefs;
}
