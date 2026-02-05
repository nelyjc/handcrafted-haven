import productsData from "../lib/products.json";
import Pagination from "./Pagination";

async function wait(ms: number) {
    return new Promise((res) => setTimeout(res, ms));
}

export default async function ProductsList({ page = 1, pageSize = 9 }: { page?: number; pageSize?: number }) {
    // simulate a small load to demonstrate Suspense
    await wait(250);

    const products = productsData as Array<any>;
    const total = products.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const start = (page - 1) * pageSize;
    const pageProducts = products.slice(start, start + pageSize);

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {pageProducts.map((product) => (
                    <div key={product.id} className="flex flex-col gap-3 rounded-md bg-neutral-50 p-3 dark:bg-neutral-900/60">
                        <div className="flex aspect-square items-center justify-center overflow-hidden rounded-md bg-neutral-100 dark:bg-neutral-800">
                            <img src={product.image} alt={product.title} className="h-full w-full object-cover" />
                        </div>
                        <div className="space-y-1">
                            <span className="text-xs text-neutral-400 dark:text-neutral-500">{product.name}</span>
                            <br />
                            <span className="text-sm font-semibold">{product.title}</span>
                        </div>
                        <div className="mt-auto flex items-center justify-between gap-2 text-xs">
                            <div className="text-sm font-medium">${product.price.toFixed(2)}</div>
                            <div className="flex gap-2">
                                <button className="rounded-md bg-neutral-100 p-2 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200">Add to cart</button>
                                <a href={`/products/${product.slug}`} className="rounded-md bg-neutral-900 p-2 text-white dark:bg-white dark:text-neutral-900">View</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div>
                <Pagination page={page} totalPages={totalPages} base="/products" />
            </div>
        </>
    );
}
