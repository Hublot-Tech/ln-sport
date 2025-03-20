import React from "react";
import Link from "next/link";

const Header: React.FC = () => {
  return (
      <header className="navbar relative z-10 flex justify-center">
      <div className="flex bg-blue-900/30 items-center justify-between w-full lg:w-2/3">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center p-4">
            <img src="/ln-icon.png" alt="Football News" />
            <Link href="/" className="btn btn-ghost text-xl">LN FOOT</Link>
          </div>
          <div className="dropdown w-full flex justify-end">
            <ul className="menu menu-sm dropdown-content bg-blue-900/50 z-1 mt-3 w-52 p-2 shadow">
              <li>
                <Link href="#" className="hover:text-orange-500">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-orange-500">
                  Actualités
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-orange-500">
                  Scores
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-orange-500">
                  Contact
                </Link>
              </li>
            </ul>
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/" className="hover:text-orange-500">
                Accueil
              </Link>
            </li>
            <li>
              <Link href="/actualites" className="hover:text-orange-500">
                Actualités
              </Link>
            </li>
            <li>
              <Link href="/scores" className="hover:text-orange-500">
                Scores
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-orange-500">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
