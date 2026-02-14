export type SellerProfile = {
  id: string;
  displayName: string;
  story: string;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
};
export type User = {
  id: string;
  email: string;
  name: string;
};

export type DashboardNavLink = {
  name: string;
  href: string;
};