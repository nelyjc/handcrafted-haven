export default function ProductsSkeleton({ pageSize = 9 }: { pageSize?: number }) {
    return (
        <div>
            <div className="grid grid-cols-3 gap-4">
                {Array.from({ length: pageSize }).map((_, i) => (
                    <div key={i} className="flex flex-col gap-3 rounded-md bg-neutral-50 p-3 dark:bg-neutral-900/60">
                        <div className="flex aspect-square items-center justify-center overflow-hidden rounded-md bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
                        <div className="space-y-2">
                            <div className="h-3 w-1/2 rounded bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
                            <div className="h-4 w-3/4 rounded bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
                        </div>
                        <div className="mt-auto flex items-center justify-between gap-2 text-xs">
                            <div className="h-4 w-12 rounded bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
                            <div className="flex gap-2">
                                <div className="h-8 w-20 rounded bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
                                <div className="h-8 w-20 rounded bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
