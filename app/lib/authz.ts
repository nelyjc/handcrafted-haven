import { redirect } from "next/navigation";
import { auth } from "@/app/api/auth/[...nextauth]/route";
import { getSellerByEmail } from "@/app/lib/sellers";

export async function requireSeller() {
  const session = await auth();
    const email = session?.user?.email;

  if (!session?.user?.email) redirect("/api/auth/signin?callbackUrl=/seller");

  const seller = await getSellerByEmail(session.user.email);

  if (!seller) {
    redirect("/register");
  }

  return seller;
}
