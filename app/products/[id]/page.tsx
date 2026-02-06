import productsData from "../../lib/products.json";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const sp = await params;
    const id = sp.id;
    const products = productsData as Array<any>;
    const product = products.find((p) => String(p.id) === id);

    if (!product) {
        return (
            <div className="mx-auto max-w-3xl p-6 text-neutral-900 dark:text-neutral-100">
                <div className="rounded-md bg-neutral-50 p-6 text-center dark:bg-neutral-900/60">
                    <h2 className="text-lg font-semibold">Product not found</h2>
                    <p className="mt-2 text-sm text-neutral-500">The product you requested could not be located.</p>
                    <div className="mt-4">
                        <a href="/products" className="text-sm underline">Back to products</a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto w-full max-w-6xl p-4 sm:p-6 text-neutral-900 dark:text-neutral-100">
            <div className="flex flex-col gap-6 md:flex-row">
                <div className="md:w-1/2">
                    <div className="aspect-square w-full overflow-hidden rounded-md bg-neutral-100 dark:bg-neutral-800">
                        <img src={product.image} alt={product.title} className="h-full w-full object-cover" />
                    </div>
                </div>

                <div className="flex flex-col gap-4 md:w-1/2">
                    <div>
                        <div className="text-xs text-neutral-400 dark:text-neutral-500">{product.category}</div>
                        <h1 className="mt-1 text-2xl font-semibold">{product.title}</h1>
                        <div className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{product.name}</div>
                    </div>

                    <div className="mt-2">
                        <div className="text-2xl font-bold">${product.price.toFixed(2)}</div>
                        <div className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{product.availability}</div>
                    </div>

                    <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                        <button className="w-full rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-neutral-900 sm:w-auto">Add to cart</button>
                        <a href="/products" className="w-full rounded-md border border-neutral-200 px-4 py-2 text-center text-sm dark:border-neutral-800 sm:w-auto">Back to products</a>
                    </div>

                    <div className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
                        <p>{product.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}