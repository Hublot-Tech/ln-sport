import { relations, sql } from "drizzle-orm";
import {
  decimal,
  index,
  integer,
  PgColumn,
  pgTableCreator,
  PgTableWithColumns,
  primaryKey,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `ln-foot_${name}`);

export const users = createTable("users", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("email_verified", {
    mode: "date",
    withTimezone: true,
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar("image", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));

export const accounts = createTable(
  "accounts",
  {
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("provider_account_id", {
      length: 255,
    }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_user_id_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "sessions",
  {
    sessionToken: varchar("session_token", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_user_id_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verification_token",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);

// New Sports Table
export const sports = createTable("sport", {
  id: uuid("id").primaryKey().defaultRandom(),
  sportName: varchar("sport_name", { length: 100 }).unique().notNull(),
  // Add any other sport-specific details
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

// New Leagues Table
export const leagues = createTable("leagues", {
  id: uuid("id").primaryKey().defaultRandom(),
  sportId: uuid("sport_id").references(() => sports.id, {
    onDelete: "cascade",
  }),
  leagueName: varchar("league_name", { length: 255 }).notNull(),
  country: varchar("country", { length: 100 }).notNull(), // Country: e.g., "Cameroun", "France", etc.
  tier: integer("tier"), // Optional tier value (e.g., 1 for top-level, 2 for second-tier)
  apiSource: varchar("api_source", { length: 50 }), // e.g., "BetsAPI", "Highlightly", "Flashscore"
  apiLeagueId: varchar("api_league_id", { length: 255 }), // The API league identifier
  logoUrl: varchar("logo_url", { length: 255 }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

// New Teams Table
export const teams = createTable("teams", {
  id: uuid("id").primaryKey().defaultRandom(),
  leagueId: uuid("league_id").references(() => leagues.id, {
    onDelete: "cascade",
  }),
  teamName: varchar("team_name", { length: 255 }).notNull(),
  apiSource: varchar("api_source", { length: 50 }), // e.g., 'BetsAPI', 'Highlightly', 'Flashscore'
  apiTeamId: varchar("api_team_id", { length: 255 }), // The ID used by the API
  logoUrl: varchar("logo_url", { length: 255 }),
  // Add other team-specific details
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

// New Matches/Events Table
export const matches = createTable("matches", {
  id: uuid("id").primaryKey().defaultRandom(),
  leagueId: uuid("league_id").references(() => leagues.id, {
    onDelete: "cascade",
  }),
  team1Id: uuid("team1_id").references(() => teams.id, {
    onDelete: "cascade",
  }),
  team2Id: uuid("team2_id").references(() => teams.id, {
    onDelete: "cascade",
  }),
  matchDatetime: timestamp("match_datetime", { withTimezone: true }),
  apiSource: varchar("api_source", { length: 50 }), // e.g., 'BetsAPI', 'Highlightly', 'Flashscore'
  apiMatchId: varchar("api_match_id", { length: 255 }), // The ID used by the API
  status: varchar("status", { length: 50 }), // e.g., 'scheduled', 'live', 'finished', 'postponed'
  score1: integer("score1"), // Score for team1
  score2: integer("score2"), // Score for team2
  // Additional match details (e.g., venue, referee)
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

// New Odds Table
export const odds = createTable("odds", {
  id: uuid("id").primaryKey().defaultRandom(),
  matchId: uuid("match_id").references(() => matches.id, {
    onDelete: "cascade",
  }),
  bookmaker: varchar("bookmaker", { length: 100 }), // e.g., 'Bet365', 'William Hill'
  market: varchar("market", { length: 100 }), // e.g., '1x2', 'Over/Under', 'Handicap'
  selection: varchar("selection", { length: 255 }), // e.g., 'Team1 Win', 'Over 2.5 Goals'
  odds: decimal("odds", { precision: 10, scale: 2 }),
  apiSource: varchar("api_source", { length: 50 }),
  apiOddsId: varchar("api_odds_id", { length: 255 }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

// New Highlights Table
export const highlights = createTable("highlights", {
  id: uuid("id").primaryKey().defaultRandom(),
  matchId: uuid("match_id").references(() => matches.id, {
    onDelete: "cascade",
  }), // Link to the match
  title: text("title"),
  description: text("description"),
  videoUrl: varchar("video_url", { length: 255 }),
  thumbnailUrl: varchar("thumbnail_url", { length: 255 }),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  apiSource: varchar("api_source", { length: 50 }),
  apiHighlightId: varchar("api_highlight_id", { length: 255 }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

// New News/Articles Table
export const newsArticles = createTable("news_articles", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  content: text("content"),
  summary: text("summary"),
  imageUrl: varchar("image_url", { length: 255 }),
  sourceUrl: varchar("source_url", { length: 255 }), // Link to the original article
  publishedAt: timestamp("published_at", { withTimezone: true }),
  apiSource: varchar("api_source", { length: 50 }),
  apiArticleId: varchar("api_article_id", { length: 255 }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

// New User Favorites Table (Relationship)
export const userFavorites = createTable(
  "user_favorites",
  {
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    matchId: uuid("match_id")
      .notNull()
      .references(() => matches.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    // Add other favorite-related fields as needed
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.userId, table.matchId] }),
    };
  },
);

export const ecommerceArticles = createTable("ecommerce_articles", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  content: text("content"),
  summary: text("summary"),
  price: decimal("price", { precision: 10, scale: 2 }),
  imageUrl: varchar("image_url", { length: 255 }),
  sourceUrl: varchar("source_url", { length: 255 }),
  ecommerceId: varchar("ecommerce_id", { length: 255 }), // Platform-specific article ID
  publishedAt: timestamp("published_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});
