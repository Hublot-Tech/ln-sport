import { LiveScore } from "@components/sections/live-scores";
import { apiClient } from "@ln-foot/api/api-client";
import Link from "next/link";
import { Fragment } from "react";


export default async function LiveScoresPage() {
  const leagues = await apiClient.leagues.findAll();

  if (!leagues) {
    return <div>Failed to load live scores.</div>;
  }

  const competitions = leagues.map((league) => ({
    id: league.id,
    name: league.leagueName,
    logoUrl: league.logoUrl ?? "",
    scores: league.fixtures,
  }));

  return (
    <section className="flex items-center justify-center">
      <div className="grid w-full gap-4 p-6 lg:w-1/2">
        <div>
          <div className="breadcrumbs text-sm">
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>Score en direct </li>
            </ul>
          </div>
          <h2 className="header-2">Score en Direct</h2>
        </div>
        <div className="m-2 h-12 w-full">
          <label className="input flex items-center gap-1 border-gray-300">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input type="search" required placeholder="Search" />
          </label>
        </div>
        <div className="tabs-border hidden md:tabs">
          {competitions.map(({ name, scores }, i) => (
            <Fragment key={i}>
              <input
                type="radio"
                name="competition"
                className="tab"
                aria-label={name}
                defaultChecked={i === 0}
              />
              <div className="tab-content border-t-base-300 bg-base-100 p-10">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {scores.map((match, index) => (
                    <LiveScore key={index} match={match} />
                  ))}
                </div>
              </div>
            </Fragment>
          ))}
        </div>
        <div className="bg-base-10 join join-vertical block w-full md:hidden">
          {competitions.map(({ name, logoUrl, scores }, i) => (
            <div
              className="collapse join-item collapse-arrow border-base-300"
              key={i}
            >
              <input
                type="radio"
                name="competition"
                aria-label={name}
                defaultChecked={i == 0}
              />
              <div className="collapse-title font-semibold">
                <img src={logoUrl} alt={name} className="h-4 w-4" />
                {name}
              </div>
              <div className="collapse-content">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {scores.map((match, index) => (
                    <LiveScore key={index} match={match} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
