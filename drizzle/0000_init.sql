CREATE TABLE IF NOT EXISTS "ln-foot_accounts" (
	"user_id" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"provider" varchar(255) NOT NULL,
	"provider_account_id" varchar(255) NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" varchar(255),
	"scope" varchar(255),
	"id_token" text,
	"session_state" varchar(255),
	CONSTRAINT "ln-foot_accounts_provider_provider_account_id_pk" PRIMARY KEY("provider","provider_account_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ln-foot_ecommerce_articles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"content" text,
	"summary" text,
	"price" numeric(10, 2),
	"image_url" varchar(255),
	"source_url" varchar(255),
	"ecommerce_id" varchar(255),
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ln-foot_highlights" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"match_id" uuid,
	"title" text,
	"description" text,
	"video_url" varchar(255),
	"thumbnail_url" varchar(255),
	"published_at" timestamp with time zone,
	"api_source" varchar(50),
	"api_highlight_id" varchar(255),
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ln-foot_leagues" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"sport_id" uuid,
	"league_name" varchar(255) NOT NULL,
	"country" varchar(100) NOT NULL,
	"tier" integer,
	"api_source" varchar(50),
	"api_league_id" varchar(255),
	"logo_url" varchar(255),
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ln-foot_matches" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"league_id" uuid,
	"team1_id" uuid,
	"team2_id" uuid,
	"match_datetime" timestamp with time zone,
	"api_source" varchar(50),
	"api_match_id" varchar(255),
	"status" varchar(50),
	"score1" integer,
	"score2" integer,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ln-foot_news_articles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"content" text,
	"summary" text,
	"image_url" varchar(255),
	"source_url" varchar(255),
	"published_at" timestamp with time zone,
	"api_source" varchar(50),
	"api_article_id" varchar(255),
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ln-foot_odds" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"match_id" uuid,
	"bookmaker" varchar(100),
	"market" varchar(100),
	"selection" varchar(255),
	"odds" numeric(10, 2),
	"api_source" varchar(50),
	"api_odds_id" varchar(255),
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ln-foot_sessions" (
	"session_token" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"expires" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ln-foot_sport" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"sport_name" varchar(100) NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone,
	CONSTRAINT "ln-foot_sport_sport_name_unique" UNIQUE("sport_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ln-foot_teams" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"league_id" uuid,
	"team_name" varchar(255) NOT NULL,
	"api_source" varchar(50),
	"api_team_id" varchar(255),
	"logo_url" varchar(255),
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ln-foot_user_favorites" (
	"user_id" varchar(255) NOT NULL,
	"match_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "ln-foot_user_favorites_user_id_match_id_pk" PRIMARY KEY("user_id","match_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ln-foot_users" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"email_verified" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"image" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ln-foot_verification_token" (
	"identifier" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires" timestamp with time zone NOT NULL,
	CONSTRAINT "ln-foot_verification_token_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ln-foot_accounts" ADD CONSTRAINT "ln-foot_accounts_user_id_ln-foot_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."ln-foot_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ln-foot_highlights" ADD CONSTRAINT "ln-foot_highlights_match_id_ln-foot_matches_id_fk" FOREIGN KEY ("match_id") REFERENCES "public"."ln-foot_matches"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ln-foot_leagues" ADD CONSTRAINT "ln-foot_leagues_sport_id_ln-foot_sport_id_fk" FOREIGN KEY ("sport_id") REFERENCES "public"."ln-foot_sport"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ln-foot_matches" ADD CONSTRAINT "ln-foot_matches_league_id_ln-foot_leagues_id_fk" FOREIGN KEY ("league_id") REFERENCES "public"."ln-foot_leagues"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ln-foot_matches" ADD CONSTRAINT "ln-foot_matches_team1_id_ln-foot_teams_id_fk" FOREIGN KEY ("team1_id") REFERENCES "public"."ln-foot_teams"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ln-foot_matches" ADD CONSTRAINT "ln-foot_matches_team2_id_ln-foot_teams_id_fk" FOREIGN KEY ("team2_id") REFERENCES "public"."ln-foot_teams"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ln-foot_odds" ADD CONSTRAINT "ln-foot_odds_match_id_ln-foot_matches_id_fk" FOREIGN KEY ("match_id") REFERENCES "public"."ln-foot_matches"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ln-foot_sessions" ADD CONSTRAINT "ln-foot_sessions_user_id_ln-foot_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."ln-foot_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ln-foot_teams" ADD CONSTRAINT "ln-foot_teams_league_id_ln-foot_leagues_id_fk" FOREIGN KEY ("league_id") REFERENCES "public"."ln-foot_leagues"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ln-foot_user_favorites" ADD CONSTRAINT "ln-foot_user_favorites_user_id_ln-foot_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."ln-foot_users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ln-foot_user_favorites" ADD CONSTRAINT "ln-foot_user_favorites_match_id_ln-foot_matches_id_fk" FOREIGN KEY ("match_id") REFERENCES "public"."ln-foot_matches"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "account_user_id_idx" ON "ln-foot_accounts" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "session_user_id_idx" ON "ln-foot_sessions" USING btree ("user_id");