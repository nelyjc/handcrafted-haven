"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function Pagination({
    page,
    totalPages,
    base = "/products",
    totalCount,
    pagesLeft
}: {
    page: number;
    totalPages: number;
    base?: string;
    totalCount?: number;
    pagesLeft?: number;
}) {
    const router = useRouter();
    const searchParams = useSearchParams();

    function goTo(nextPage: number) {
        const params = new URLSearchParams(Array.from(searchParams.entries()));
        params.set("page", String(nextPage));
        router.push(`${base}?${params.toString()}`);
    }

    return (
        <div className="mt-6 flex items-center justify-center gap-3 text-sm">
            {totalCount !== undefined && (
                <div className="text-xs text-neutral-500 dark:text-neutral-400">{totalCount} items</div>
            )}
            <button onClick={() => goTo(Math.max(1, page - 1))} className={`rounded-md px-3 py-1 ${page === 1 ? 'opacity-50 pointer-events-none' : 'bg-neutral-100 dark:bg-neutral-800'}`}>
                Prev
            </button>
            <div className="px-2">Page {page} of {totalPages}</div>
            <button
                onClick={() => goTo(Math.min(totalPages, page + 1))}
                className={`rounded-md px-3 py-1 ${page === totalPages ? 'opacity-50 pointer-events-none' : 'bg-neutral-100 dark:bg-neutral-800'}`}
            >
                Next
            </button>
        </div>
    );
}
