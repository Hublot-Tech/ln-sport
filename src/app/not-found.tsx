import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-950 via-slate-900 to-gray-900 px-4 text-white">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold tracking-tight sm:text-7xl">
          404
        </h1>
        <p className="mt-4 text-xl sm:text-2xl">Page introuvable</p>
        <p className="mt-2 text-base text-gray-300">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#F3653D] px-5 py-2 font-semibold text-white transition hover:bg-[#f3653d]/90"
        >
          <ArrowLeft size={18} />
          Retour à l&apos;accueil
        </Link>
      </div>
    </main>
  );
}
