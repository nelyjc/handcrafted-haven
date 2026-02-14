import Link from "next/link";
import { requireSeller } from "@/app/lib/authz";
import { getProductsBySeller } from "@/app/lib/products";

export default async function ProductsDashboardPage() {
  const seller = await requireSeller();
  const products = await getProductsBySeller(seller.id);

  return (
    <section className="max-w-4xl space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Added Products</h1>
        <Link
          href="/dashboard/products/add-product"
          className="rounded-md bg-slate-700 px-4 py-2 text-white hover:opacity-90"
        >
          Add product
        </Link>
      </header>

      {products.length === 0 ? (
        <p className="text-slate-600">You have no products yet.</p>
      ) : (
        <div className="grid gap-3">
          {products.map((p: any) => (
            <div key={p.id} className="rounded-lg border p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-semibold">{p.name}</h2>
                  <p className="text-sm text-slate-600">{p.short_description}</p>
                </div>
                <div className="text-sm font-medium">
                  ${(Number(p.price) / 100).toFixed(2)}
                </div>
              </div>

              <p className="mt-2 text-sm">{p.long_description}</p>

              {p.image ? (
                <p className="mt-2 text-xs text-slate-500 break-all">{p.image}</p>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
