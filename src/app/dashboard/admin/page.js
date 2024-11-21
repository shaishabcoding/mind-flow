import { redirect } from "next/navigation";

export default function AdminDashboard() {
  // ToDo: if here is a page then remove redirect
  redirect("/dashboard/admin/products");
}
