export default function ProductsFilters({ wrapperClass = "space-y-3 rounded-md bg-neutral-50 p-4 dark:bg-neutral-900/60" }: { wrapperClass?: string }) {
    return (
        <div className={wrapperClass}>
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
    );
}
