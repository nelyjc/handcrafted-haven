"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function SearchSort() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [search, setSearch] = useState<string>("");
    const [sort, setSort] = useState<string>("newest");

    useEffect(() => {
        // Initialize from URL params
        const s = searchParams.get("search") || "";
        const so = searchParams.get("sort") || "newest";
        setSearch(s);
        setSort(so);
    }, [searchParams]);

    const debouncedSearch = useDebouncedCallback((value: string) => {
        const params = new URLSearchParams(Array.from(searchParams.entries()));
        if (value !== "") params.set("search", value);
        else params.delete("search");
        params.set("page", "1");

        const qs = params.toString();
        router.push(qs ? `/products?${qs}` : `/products`);
    }, 500);

    function handleSearchChange(value: string) {
        setSearch(value);
        debouncedSearch(value);
    }

    function handleSortChange(value: string) {
        setSort(value);
        const params = new URLSearchParams(Array.from(searchParams.entries()));
        if (value !== "newest") params.set("sort", value);
        else params.delete("sort");
        params.set("page", "1");

        const qs = params.toString();
        router.push(qs ? `/products?${qs}` : `/products`);
    }

    return (
        <div className="mb-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <input
                type="search"
                placeholder="Search products"
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="flex-1 rounded-md bg-neutral-50 p-2 text-sm placeholder:text-neutral-400 dark:bg-neutral-900/60 dark:text-neutral-200"
            />
            <select
                value={sort}
                onChange={(e) => handleSortChange(e.target.value)}
                className="rounded-md bg-neutral-50 p-2 text-xs text-neutral-500 dark:bg-neutral-900/60 dark:text-neutral-300 w-full sm:w-auto"
            >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
            </select>
        </div>
    );
}
