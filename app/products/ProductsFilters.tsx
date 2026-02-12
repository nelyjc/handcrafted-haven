"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const CATEGORY_OPTIONS = [
    { label: "Ceramic", value: "ceramic" },
    { label: "Metal", value: "metal" },
    { label: "Leather", value: "leather" },
    { label: "Mixed", value: "mixed" },
];

export default function ProductsFilters({ wrapperClass = "space-y-3 rounded-md bg-neutral-50 p-4 dark:bg-neutral-900/60" }: { wrapperClass?: string }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [selected, setSelected] = useState<string[]>([]);
    const [min, setMin] = useState<string>("");
    const [max, setMax] = useState<string>("");

    useEffect(() => {
        const params = Array.from(searchParams.entries());
        const cats = params.filter(([k]) => k === "category").map(([, v]) => v);
        setSelected(cats.length ? cats : []);
        const pmin = params.find(([k]) => k === "price_min")?.[1];
        const pmax = params.find(([k]) => k === "price_max")?.[1];
        setMin(pmin ?? "");
        setMax(pmax ?? "");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams.toString()]);

    function toggle(value: string) {
        const next = selected.includes(value) ? selected.filter((s) => s !== value) : [...selected, value];
        setSelected(next);

        const params = new URLSearchParams(Array.from(searchParams.entries()));
        params.delete("category");
        next.forEach((c) => params.append("category", c));
        params.set("page", "1");

        router.push(`/products?${params.toString()}`);
    }

    const debouncedUpdatePrice = useDebouncedCallback((nextMin: string, nextMax: string) => {
        const params = new URLSearchParams(Array.from(searchParams.entries()));
        params.delete("price_min");
        params.delete("price_max");
        if (nextMin !== "") params.set("price_min", nextMin);
        if (nextMax !== "") params.set("price_max", nextMax);
        params.set("page", "1");

        router.push(params.toString() ? `/products?${params.toString()}` : `/products`);
    }, 700);

    function updatePrice(nextMin: string, nextMax: string) {
        setMin(nextMin);
        setMax(nextMax);
        debouncedUpdatePrice(nextMin, nextMax);
    }

    function clear() {
        const params = new URLSearchParams(Array.from(searchParams.entries()));
        params.delete("category");
        params.delete("price_min");
        params.delete("price_max");
        params.delete("search");
        // reset page to 1
        params.set("page", "1");

        // reset local state
        setSelected([]);
        setMin("");
        setMax("");

        const qs = params.toString();
        router.push(qs ? `/products?${qs}` : `/products`);
    }

    return (
        <div className={wrapperClass}>
            <div className="flex items-center justify-between">
                <div className="text-xs text-neutral-600 dark:text-neutral-400">Filters</div>
                <button onClick={clear} className="text-xs text-neutral-500 hover:underline">Clear</button>
            </div>
            <div className="space-y-2">
                <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-200">Category</span>
                <div className="space-y-1 text-xs text-neutral-500 dark:text-neutral-400">
                    {CATEGORY_OPTIONS.map((opt) => (
                        <label key={opt.value} className="flex items-center gap-2">
                            <input type="checkbox" checked={selected.includes(opt.value)} onChange={() => toggle(opt.value)} />
                            <span>{opt.label}</span>
                        </label>
                    ))}
                </div>
            </div>
            <div className="space-y-2">
                <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-200">Price</span>
                <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                    <input
                        type="number"
                        placeholder="min"
                        value={min}
                        onChange={(e) => updatePrice(e.target.value, max)}
                        className="w-24 rounded-md bg-neutral-50 p-2 text-xs dark:bg-neutral-900/60"
                    />
                    <span>-</span>
                    <input
                        type="number"
                        placeholder="max"
                        value={max}
                        onChange={(e) => updatePrice(min, e.target.value)}
                        className="w-24 rounded-md bg-neutral-50 p-2 text-xs dark:bg-neutral-900/60"
                    />
                </div>
            </div>
        </div>
    );
}
