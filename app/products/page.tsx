import { Suspense } from "react";
import ProductsSkeleton from "./ProductsSkeleton";
import ProductsList from "./ProductsList";
import ProductsFilters from "./ProductsFilters";

export default async function ProductsPage({ searchParams }: { searchParams?: Promise<{ page?: string }> | { page?: string } }) {
    const sp = await searchParams;
    const page = Math.max(1, Number(sp?.page || 1));
    const pageSize = 9;

    return (
        <div className="mx-auto flex flex-col md:flex-row w-full max-w-6xl gap-6 p-4 sm:p-6 text-neutral-900 dark:text-neutral-100">
            <aside className="w-full md:w-56 space-y-4">
                <div className="text-center text-sm text-neutral-500 dark:text-neutral-400">Products</div>

                {/* Desktop filters */}
                <div className="hidden md:block">
                    <ProductsFilters />
                </div>

                {/* Mobile filters */}
                <div className="block md:hidden">
                    <details className="group">
                        <summary className="flex items-center justify-between w-full rounded-md bg-neutral-50 p-3 text-xs text-neutral-600 dark:bg-neutral-900/60 dark:text-neutral-400">
                            <span>Filters</span>
                            <span className="transition-transform group-open:rotate-180">▾</span>
                        </summary>
                        <ProductsFilters wrapperClass="space-y-3 rounded-md bg-neutral-50 p-4 mt-2 dark:bg-neutral-900/60" />
                    </details>
                </div>
            </aside>

            <section className="flex-1">
                <div>
                    <div className="mb-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <input
                            type="search"
                            placeholder="Search products"
                            className="flex-1 rounded-md bg-neutral-50 p-2 text-sm placeholder:text-neutral-400 dark:bg-neutral-900/60 dark:text-neutral-200"
                        />
                        <select className="rounded-md bg-neutral-50 p-2 text-xs text-neutral-500 dark:bg-neutral-900/60 dark:text-neutral-300 w-full sm:w-auto">
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