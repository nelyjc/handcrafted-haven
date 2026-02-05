
export default async function ProfilePage() {

  return (
    <main>
      <div className="grid grid-cols-2 items-center gap-2 m-4">
        <img className="rounded-full" src="/seller.png" alt="Profile Picture" width={150} height={150} />
        <h1 className="text-2xl text-cyan-900 font-bold">Welcome Artisan</h1>
      </div>
      <div>
        <h2 className="text-xl text-cyan-900 font-semibold m-3">Story</h2>
        <p>No story yet.</p>
      </div>
      <div>
        <h2 className="text-xl text-cyan-900 font-semibold m-3">Products</h2>
        <p>No products yet.</p>
      </div>
    </main>
      
  );
}
