import Link from "next/link";
import React from "react";

const navbarItems = [
  { name: "Accueil", path: "/" },
  { name: "Actualités", path: "/news" },
  { name: "Scores", path: "/live-scores" },
  { name: "Contact", path: "/contact" },
];
const Header: React.FC = () => {
  return (
    <header className="navbar relative z-10 flex justify-center">
      <div className="flex w-full items-center justify-between rounded-lg bg-blue-950 lg:w-2/3">
        <div className="flex w-full items-center justify-between p-4">
          <div className="flex items-center">
            <img
              className="h-10 animate-bounce"
              src="/ln-icon.png"
              alt="Football News"
            />
            <Link
              href="/"
              className="btn btn-ghost text-2xl font-semibold text-white transition duration-300 hover:text-orange-500"
            >
              LN FOOT
            </Link>
          </div>
          <div className="dropdown flex items-center">
            <ul className="menu dropdown-content menu-sm z-10 mt-3 rounded-lg bg-blue-900/80 p-2 shadow-lg">
              {navbarItems.map(({ name, path }) => (
                <li key={name}>
                  <Link
                    href={path}
                    className="transition duration-300 hover:text-orange-500"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost ml-2 lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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
        <div className="navbar-end hidden lg:flex w-full">
          <ul className="menu menu-horizontal px-1">
            {navbarItems.map(({ name, path }) => (
              <li key={name}>
                <Link
                  href={path}
                  className="transition duration-300 hover:text-orange-500"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
