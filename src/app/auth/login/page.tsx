'use client';

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#161b22]">
      {session ? (
        <div className="text-center space-y-4">
          <p className="text-gray-100 text-xl">Welcome {session.user?.name}</p>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="bg-red-600 text-white px-6 py-2 rounded shadow"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <button
          onClick={() => signIn("keycloak")}
          className="bg-[#0d1117] text-white px-6 py-2 rounded shadow"
        >
          Sign in with Keycloak
        </button>
      )}
    </div>
  );
}
