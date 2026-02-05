"use client";
import { createProduct } from '@/app/lib/actions';


export function Form() {
  return (
<div>
      <h1 className="text-2xl font-bold">Add Product</h1>
      <form
        action={createProduct}
        className="space-y-4 rounded-lg border p-6 slate-100 shadow-md"
      >
        <div>
          <label className="mb-1 block text-sm font-medium">Title</label>
          <input type="text" name="title" placeholder="Title" required className="w-full rounded-md border px-3 py-2" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Description</label>
          <textarea name="description" placeholder="Description" required className="w-full rounded-md border px-3 py-2" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Price</label>
          <input type="number" name="price" placeholder="Price" required className="w-full rounded-md border px-3 py-2" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Image URL</label>
          <input type="text" name="imageUrl" placeholder="Image URL" className="w-full rounded-md border px-3 py-2" />
        </div>
        <button type="submit" className="rounded-md bg-slate-600 text-white p-2 hover:opacity-90">Create Product</button>
      </form>
    </div>
  );
}