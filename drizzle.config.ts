import { type Config } from "drizzle-kit";

import { env } from "@ln-foot/env";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: ["ln-foot_*"],
  out: './drizzle'
} satisfies Config;
