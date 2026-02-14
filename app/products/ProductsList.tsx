import { Product } from "../lib/products";
import AddToCartButton from "./[id]/AddToCartButton";
import Pagination from "./Pagination";
import { StarRating } from "./ProductRating";




async function wait(ms: number) {
    return new Promise((res) => setTimeout(res, ms));
}

export default async function ProductsList({
    page = 1,
    pageSize = 9,
    products = [],
    totalCount = 0,
    totalPages = 1,
    pagesLeft = 0
}: {
    page?: number;
    pageSize?: number;
    products?: Product[] | any[];
    totalCount?: number;
    totalPages?: number;
    pagesLeft?: number
}) {
    await wait(500);
    return (
        <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                    <div key={product.id} className="flex flex-col gap-3 rounded-md bg-neutral-50 p-3 dark:bg-neutral-900/60">
                        <div className="aspect-square overflow-hidden rounded-md bg-neutral-100 dark:bg-neutral-800">
                            <img src={product.image} alt={product.title} className="h-full w-full object-cover" />
                        </div>
                        <div className="mt-1">
                            {/* rating is ALWAYS a number */}
                            <StarRating rating={product.rating ?? 0} count={product.review_count ?? undefined} />

                        </div>

                        <div className="space-y-1">
                            <span className="text-sm font-semibold">{product.name}</span>
                            <br />
                            <span className="text-xs text-neutral-400 dark:text-neutral-500">{product.short_description}</span>
                        </div>
                        <div className="mt-auto flex items-center justify-between gap-2 text-xs">
                            <div className="text-sm font-medium">${product.price.toFixed(2)}</div>
                            <div className="flex gap-2">
                                <AddToCartButton
                                    product={{
                                        id: product.id,
                                        name: product.name,
                                        price: Number(product.price),
                                        image: product.image,
                                    }}
                                />
                                <a href={`/products/${product.id}`} className="rounded-md bg-neutral-900 p-2 text-white dark:bg-white dark:text-neutral-900">View</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div>
                <Pagination
                    page={page}
                    totalPages={totalPages}
                    base="/products"
                    totalCount={totalCount}
                    pagesLeft={pagesLeft}
                />
            </div>
        </>
    );
}
