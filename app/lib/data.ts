

export default function getSellerId() {
  const sellerId = process.env.SELLER_ID;
  if (!sellerId) {
    throw new Error('Seller ID is not defined in environment variables');
  }
  return sellerId;
}