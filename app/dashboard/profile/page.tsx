import getSellerId from "@/app/lib/data";
import { getSellerById } from "@/app/lib/sellers";
import { getProductsBySeller } from "@/app/lib/products";


export default async function ProfilePage() {
  const sellerId = getSellerId();
  const seller = await getSellerById(sellerId);
  const products = await getProductsBySeller(sellerId);

  return (
    <main>
      <div className="grid grid-cols-2 items-center gap-2 m-4">
        <img className="rounded-full" src="/seller.png" alt="Profile Picture" width={150} height={150} />
        <h1 className="text-2xl text-cyan-900 font-bold">W{seller?.username ? `Welcome, ${seller.username}` : "Welcome, Artisan"}</h1>
      </div>
      <div>
        <h2 className="text-xl text-cyan-900 font-semibold m-3">Your Story</h2>
        <p>{seller.story || "No story yet."}</p>
      </div>
      <div>
        <h2 className="text-xl text-cyan-900 font-semibold m-3">Your Products</h2>
        {products.length === 0 ? (
          <p>You have no products yet.</p>
        ) : (
          <ul>
            {products.map((p) => (
              <li key={p.id}>{p.name}</li>
            ))}
          </ul>
        )}
      </div>
    </main>
      
  );
}
