"use client";
import { useFormState } from "react-dom";
import { createDashboardProduct, type ActionState } from "@/app/lib/actions";

const initialState: ActionState = { ok : false, message: "" };


export function Form() {
  const [state, formAction] = useFormState(createDashboardProduct, initialState);
  console.error(state);

  return (
<div>
      <h1 className="text-2xl font-bold">Add Product</h1>
      {(!state.ok && state.message) ? <p className="text-red-500">{state.message}</p> : null}
      <form
        action={formAction}
        className="space-y-4 rounded-lg border p-6 slate-100 shadow-md"
      >
        <div>
          <label className="mb-1 block text-sm font-medium">Title</label>
          <input type="text" name="name" placeholder="Product Title" required className="w-full rounded-md border px-3 py-2" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Price</label>
          <input type="number" name="price" placeholder="Price" required className="w-full rounded-md border px-3 py-2" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Category</label>
          <input type="text" name="category" placeholder="Category" required className="w-full rounded-md border px-3 py-2" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Short Description</label>
          <textarea name="shortDescription" placeholder="Short Description" required className="w-full rounded-md border px-3 py-2" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Long Description</label>
          <textarea name="longDescription" placeholder="Long Description" required className="w-full rounded-md border px-3 py-2" />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Image URL</label>
          <input type="text" name="image" placeholder="Image URL" className="w-full rounded-md border px-3 py-2" />
        </div>
        <button type="submit" className="rounded-md bg-slate-600 text-white p-2 hover:opacity-90">Create Product</button>
      </form>
    </div>
  );
}