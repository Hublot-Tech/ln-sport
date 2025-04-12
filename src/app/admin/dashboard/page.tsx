import { auth } from "@ln-foot/server/auth";
import { redirect } from "next/navigation";

async function DashboardPage() {
  const session = await auth();
  if (!session) {
    redirect("/api/auth/signin");
  }
  return <div>Dashboard</div>;
}

export default DashboardPage;
