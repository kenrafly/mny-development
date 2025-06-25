import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in"); // ⛔ Not signed in
  }

  const email = user.primaryEmailAddress?.emailAddress;

  if (email === "donghuamny@gmail.com") {
    redirect("/admin/movies"); // ✅ Authorized
  }

  // 🚫 If email is not allowed
  redirect("/not-authorized"); // You can create this page to show a message
}
