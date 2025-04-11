import { api } from "@ln-foot/trpc/server";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { username, password } = (await request.json()) as {
    username: string;
    password: string;
  };

  const user = await api.users.login({ username, password });

  if (!user) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 },
    );
  }

  return NextResponse.json({ message: "Hello, world!" });
}
