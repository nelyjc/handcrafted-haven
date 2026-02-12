import { Suspense } from "react";
import ProductsSkeleton from "./ProductsSkeleton";
import ProductsList from "./ProductsList";
import ProductsFilters from "./ProductsFilters";
import SearchSort from "./SearchSort";
import { getAllProducts, getAllProductsPaginated } from "../lib/products";

type SearchParams = Record<string, string | string[] | undefined> | Promise<Record<string, string | string[] | undefined>>;

export default async function ProductsPage({ searchParams }: { searchParams?: SearchParams }) {
    const sp = await searchParams;
    const page = Math.max(1, Number(sp?.page || 1));
    const pageSize = 9;

    // extract category and search filters from search params
    const categories = sp?.category ? (Array.isArray(sp.category) ? sp.category : [sp.category]) : undefined;
    const search = sp?.search ? String(sp.search) : undefined;
    const minPrice = sp?.price_min ? Number(sp.price_min) : undefined;
    const maxPrice = sp?.price_max ? Number(sp.price_max) : undefined;
    const sort = sp?.sort ? String(sp.sort) : "newest";

    const { products, totalCount, totalPages, pagesLeft } = await getAllProductsPaginated(page, pageSize, {
        categories,
        search,
        minPrice,
        maxPrice,
        sort,
    });

    // console.log(products, totalCount, totalProductsOnPage, totalPages, pagesLeft);

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
                    <SearchSort />

                    <Suspense key={`${page}-${search}-${categories?.join(",")}-${sort}-${minPrice}-${maxPrice}`} fallback={<ProductsSkeleton pageSize={pageSize} />}>
                        <ProductsList
                            page={page}
                            pageSize={pageSize}
                            products={products}
                            totalCount={totalCount}
                            totalPages={totalPages}
                            pagesLeft={pagesLeft}
                        />
                    </Suspense>
                </div>
            </section>
        </div>
    );
}