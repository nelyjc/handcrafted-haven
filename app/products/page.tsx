import Link from "next/link";
import { Suspense } from "react";
import ProductsSkeleton from "./ProductsSkeleton";
import ProductsList from "./ProductsList";

export default async function ProductsPage({ searchParams }: { searchParams?: Promise<{ page?: string }> | { page?: string } }) {
    const sp = await searchParams;
    const page = Math.max(1, Number(sp?.page || 1));
    const pageSize = 9;

    return (
        <div className="mx-auto flex w-full max-w-6xl gap-6 p-6 text-neutral-900 dark:text-neutral-100">
            <aside className="w-56 space-y-4">
                <div className="text-center text-sm text-neutral-500 dark:text-neutral-400">Products</div>
                <div className="space-y-3 rounded-md bg-neutral-50 p-4 dark:bg-neutral-900/60">
                    <div className="text-xs text-neutral-600 dark:text-neutral-400">Filters</div>
                    <div className="space-y-2">
                        <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-200">Category</span>
                        <div className="space-y-1 text-xs text-neutral-500 dark:text-neutral-400">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" />
                                <span>Ceramics</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" />
                                <span>Textiles</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" />
                                <span>Woodwork</span>
                            </label>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-200">Price</span>
                        <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                            <div className="h-2 w-full rounded-full bg-neutral-200 dark:bg-neutral-700">
                                <div className="h-2 w-2/3 rounded-full bg-neutral-400 dark:bg-neutral-300" />
                            </div>
                            <span>$</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-200">Availability</span>
                        <div className="space-y-1 text-xs text-neutral-500 dark:text-neutral-400">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" />
                                <span>Ready to ship</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" />
                                <span>Custom order</span>
                            </label>
                        </div>
                    </div>
                </div>
            </aside>

            <section className="flex-1">
                <div>
                    <div className="mb-4 flex items-center gap-3">
                        <input
                            type="search"
                            placeholder="Search products"
                            className="flex-1 rounded-md bg-neutral-50 p-2 text-sm placeholder:text-neutral-400 dark:bg-neutral-900/60 dark:text-neutral-200"
                        />
                        <select className="rounded-md bg-neutral-50 p-2 text-xs text-neutral-500 dark:bg-neutral-900/60 dark:text-neutral-300">
                            <option>Sort</option>
                            <option>Newest</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                        </select>
                    </div>

                    <Suspense fallback={<ProductsSkeleton pageSize={pageSize} />}>
                        <ProductsList page={page} pageSize={pageSize} />
                    </Suspense>
                </div>
            </section>
        </div>
    );
}