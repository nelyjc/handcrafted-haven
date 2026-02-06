/* ------------------------
   SELLERS
------------------------ */
export const sellers = [
  {
    id: "9d3c9d2a-4f9f-4c8b-9a91-3c6d1b8b1a01",
    firstName: "Emily",
    lastName: "Johnson",
    username: "emilys",
    email: "emily.johnson@x.dummyjson.com",
    password: "emilys123!",
    story:
      "I started making leather goods as a way to slow down and work with my hands. Every piece is cut, stitched, and finished at my kitchen table using traditional methods.",
    image: "/sellers/emily-johnson.png",
  },
  {
    id: "b2e4a6f3-1a9c-4e88-8a34-91a9d12f8c02",
    firstName: "Michael",
    lastName: "Williams",
    username: "michaelw",
    email: "michael.williams@x.dummyjson.com",
    password: "michaelw123!",
    story:
      "I throw ceramics in small batches inspired by quiet mornings, good coffee, and well-lived kitchens. I believe everyday objects should feel warm and personal.",
    image: "/sellers/michael-williams.png",
  },
  {
    id: "e7c2f5b9-8a3a-4e4f-bf8d-6e5c2a9d3f03",
    firstName: "Sophia",
    lastName: "Brown",
    username: "sophiab",
    email: "sophia.brown@x.dummyjson.com",
    password: "sophiab123!",
    story:
      "My work blends metal and leather with natural forms I find while hiking and foraging. Each piece is made slowly, allowing small imperfections to remain.",
    image: "/sellers/sophia-brown.png",
  },
];

/* ------------------------
   PRODUCTS
------------------------ */
export const products = [
  {
    id: "3c2e5a4d-9f1a-4e0b-8c91-1b5d9a2f1001",
    sellerId: "9d3c9d2a-4f9f-4c8b-9a91-3c6d1b8b1a01",
    name: "Willow Creek Leather Wallet",
    price: 6800,
    category: "leather",
    image: "/products/willow-creek-leather-wallet.png",
    shortDescription:
      "A slim, hand-stitched leather wallet made to age beautifully with everyday use.",
    longDescription:
      "Crafted from full-grain vegetable-tanned leather, this wallet develops a rich patina over time. Each stitch is done by hand, giving every piece subtle character and strength. Designed to be minimal without sacrificing durability, it’s made to last for years.",
  },
  {
    id: "5a8d9f2c-1b34-4bfa-8e3a-8f2c1a0b1002",
    sellerId: "9d3c9d2a-4f9f-4c8b-9a91-3c6d1b8b1a01",
    name: "Trailhead Leather Key Loop",
    price: 2400,
    category: "leather",
    image: "/products/trailhead-leather-key-loop.png",
    shortDescription:
      "A sturdy leather key loop built for everyday carry and easy grip.",
    longDescription:
      "Cut from thick leather scraps to reduce waste, this key loop is both practical and sustainable. The brass rivet adds strength and a subtle vintage look. Perfect for tossing in a bag or hooking onto a belt loop.",
  },
  {
    id: "a1c9f7e4-2d6b-4c7e-9f21-4a5b6c710003",
    sellerId: "9d3c9d2a-4f9f-4c8b-9a91-3c6d1b8b1a01",
    name: "Hammered Copper Cuff",
    price: 5400,
    category: "metal",
    image: "/products/hammered-copper-cuff.png",
    shortDescription:
      "A warm copper cuff bracelet with a hand-hammered texture that catches the light.",
    longDescription:
      "This cuff is shaped and hammered by hand, making each one slightly different. The raw copper finish naturally darkens and softens with wear, telling the story of its owner. It’s sturdy enough for daily use but elegant enough to dress up.",
  },
  {
    id: "f3a5c2b1-7e4a-4f82-9d51-3b2a9f8c1004",
    sellerId: "b2e4a6f3-1a9c-4e88-8a34-91a9d12f8c02",
    name: "Meadow Glaze Ceramic Vase",
    price: 7200,
    category: "ceramic",
    image: "/products/meadow-glaze-ceramic-vase.png",
    shortDescription:
      "A softly curved ceramic vase finished in a natural, earthy glaze.",
    longDescription:
      "Thrown on the wheel in small batches, no two vases are exactly alike. The glaze is inspired by wild grasses and morning fog, giving it gentle color variation. It works just as well holding flowers as it does standing on its own.",
  },
  {
    id: "9b1e2c3f-8a7d-4f9a-b3e2-5c6a7d810005",
    sellerId: "b2e4a6f3-1a9c-4e88-8a34-91a9d12f8c02",
    name: "Stoneware Coffee Mug",
    price: 3800,
    category: "ceramic",
    image: "/products/stoneware-coffee-mug.png",
    shortDescription:
      "A hefty ceramic mug designed to keep your coffee warm and your hands cozy.",
    longDescription:
      "Each mug is wheel-thrown and fired at high temperatures for durability. The thick walls help retain heat, making it perfect for slow mornings. Subtle fingerprints and glaze drips are left intentionally as a reminder it’s handmade.",
  },
  {
    id: "7d9a1c2e-4b3f-4e8d-9c5a-1f2e3b410006",
    sellerId: "e7c2f5b9-8a3a-4e4f-bf8d-6e5c2a9d3f03",
    name: "Fern Leaf Copper Earrings",
    price: 4200,
    category: "metal",
    image: "/products/fern-leaf-copper-earrings.png",
    shortDescription:
      "Delicate copper earrings shaped like unfurling fern leaves.",
    longDescription:
      "Each pair is cut, textured, and polished by hand. The lightweight design makes them comfortable for all-day wear. Over time, the copper develops a warm, natural patina.",
  },
  {
    id: "4f8c1a2d-6b7e-4a9f-b5d2-9c3e2f710007",
    sellerId: "e7c2f5b9-8a3a-4e4f-bf8d-6e5c2a9d3f03",
    name: "Hand-Poured Brass Ring Dish",
    price: 3600,
    category: "metal",
    image: "/products/hand-poured-brass-ring-dish.png",
    shortDescription:
      "A small brass dish perfect for holding rings, coins, or tiny keepsakes.",
    longDescription:
      "Poured and finished in small batches, this dish has an organic, slightly uneven edge. The brass surface reflects light softly, adding warmth to any space. Ideal for bedside tables or entryway catch-alls.",
  },
  {
    id: "c5b9e3f1-2a6d-4e7b-8f9a-1d2c3b410008",
    sellerId: "e7c2f5b9-8a3a-4e4f-bf8d-6e5c2a9d3f03",
    name: "Leather & Copper Bookmark",
    price: 2200,
    category: "mixed",
    image: "/products/leather-copper-bookmark.png",
    shortDescription:
      "A minimalist bookmark combining natural leather and a copper accent.",
    longDescription:
      "The leather strip is cut and burnished by hand for a smooth finish. A small copper detail adds weight and visual interest. It’s a simple, thoughtful gift for book lovers.",
  },
];

/* ------------------------
   REVIEWS
------------------------ */
export const reviews = [
  {
    id: "d1a2b3c4-1111-4e1a-9a1a-aaaa00000001",
    productId: "3c2e5a4d-9f1a-4e0b-8c91-1b5d9a2f1001",
    authorName: "Alex M.",
    rating: 5,
    comment:
      "Beautiful craftsmanship. The leather feels substantial and I can already see it aging nicely.",
  },
  {
    id: "d1a2b3c4-2222-4e1a-9a1a-aaaa00000002",
    productId: "3c2e5a4d-9f1a-4e0b-8c91-1b5d9a2f1001",
    authorName: "Jordan P.",
    rating: 4,
    comment:
      "Slim profile and great stitching. Fits everything I need without being bulky.",
  },
  {
    id: "d1a2b3c4-3333-4e1a-9a1a-aaaa00000003",
    productId: "f3a5c2b1-7e4a-4f82-9d51-3b2a9f8c1004",
    authorName: "Sam R.",
    rating: 5,
    comment:
      "This vase looks even better in person. The glaze has so much depth.",
  },
  {
    id: "d1a2b3c4-4444-4e1a-9a1a-aaaa00000004",
    productId: "9b1e2c3f-8a7d-4f9a-b3e2-5c6a7d810005",
    authorName: "Taylor L.",
    rating: 4,
    comment: "Perfect size mug and keeps my coffee warm longer than expected.",
  },
];
