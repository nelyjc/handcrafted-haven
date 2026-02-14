import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getSellerByEmail } from "@/app/lib/sellers";

export async function requireSeller() {
  const session = await auth();
    const email = session?.user?.email;

  if (!session?.user?.email) redirect("/auth/login");

  const seller = await getSellerByEmail(session.user.email);

  if (!seller) {
    redirect("/auth/register");
  }

  return seller;
}
