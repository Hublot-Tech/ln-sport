import { auth } from "@ln-foot/server/auth";
import { redirect } from "next/navigation";

async function DashboardPage() {
  const session = await auth();
  if (!session) {
    redirect("/auth/login");
  }
  
  return <div>Dashboard</div>;
}

export default DashboardPage;
