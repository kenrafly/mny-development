import { redirect } from "next/navigation";

export default function AdminPage() {
  // Auto-redirect to movies
  redirect("/admin/movies");
}
