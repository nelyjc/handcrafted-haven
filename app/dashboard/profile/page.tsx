import { requireSeller } from "@/app/lib/authz";
import { getProductsBySeller } from "@/app/lib/products";


export default async function ProfilePage() {
  const seller = await requireSeller();
  const products = await getProductsBySeller(seller.id);

  return (
    <main>
      <header className="bg-cyan-900 text-white p-4">
        <div className="grid grid-cols-2 items-center gap-2 m-4">
          <img className="rounded-full" src={seller.image} alt="Profile Picture" width={150} height={150} />
          <h1 className="text-2xl text-stone-300 font-bold">{seller?.username ? `Welcome, ${seller.username}` : "Welcome, Artisan"}</h1>
        </div>
      </header>
      <div>
        <h2 className="text-xl text-cyan-900 font-semibold m-3">Your Story</h2>
        <p>{seller.story || "No story yet."}</p>
      </div>
      <div>
        <h2 className="text-xl text-cyan-900 font-semibold m-3">Your Products</h2>
        {products.length === 0 ? (
          <p>You have no products yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <div key={product.id} className="flex flex-col gap-3 rounded-md bg-neutral-50 p-3 dark:bg-neutral-900/60">
                <div className="aspect-square overflow-hidden rounded-md bg-neutral-100 dark:bg-neutral-800">
                  <img src={product.image} alt={product.short_description} className="h-full w-full object-cover" />
                </div>
                <div className="space-y-1">
                  <span className="text-sm font-semibold">{product.name}</span>
                  <br />
                  <span className="text-xs text-neutral-400 dark:text-neutral-500">{product.short_description}</span>
                </div>
                <div className="mt-auto flex items-center justify-between gap-2 text-xs">
                  <div className="text-sm font-medium">${product.price.toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>

  );
}
