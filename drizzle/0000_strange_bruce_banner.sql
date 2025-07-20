CREATE TABLE "events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"distance" integer NOT NULL,
	"stroke" text NOT NULL,
	"gender" text,
	"age_group" text
);
--> statement-breakpoint
CREATE TABLE "meets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"location" text,
	"date" timestamp NOT NULL,
	"season" text,
	"level" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "rankings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"swimmer_id" uuid NOT NULL,
	"event_id" uuid NOT NULL,
	"time_id" uuid NOT NULL,
	"rank" integer NOT NULL,
	"total_swimmers" integer NOT NULL,
	"season" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "standards" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"event_id" uuid NOT NULL,
	"level" text NOT NULL,
	"gender" text NOT NULL,
	"age_group" text NOT NULL,
	"time_seconds" numeric(10, 3) NOT NULL,
	"season" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "swimmers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text,
	"club" text,
	"region" text,
	"age" integer,
	"gender" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "times" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"swimmer_id" uuid NOT NULL,
	"meet_id" uuid NOT NULL,
	"event_id" uuid NOT NULL,
	"time_seconds" numeric(10, 3) NOT NULL,
	"time_formatted" text NOT NULL,
	"is_personal_best" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "rankings" ADD CONSTRAINT "rankings_swimmer_id_swimmers_id_fk" FOREIGN KEY ("swimmer_id") REFERENCES "public"."swimmers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rankings" ADD CONSTRAINT "rankings_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rankings" ADD CONSTRAINT "rankings_time_id_times_id_fk" FOREIGN KEY ("time_id") REFERENCES "public"."times"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "standards" ADD CONSTRAINT "standards_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "times" ADD CONSTRAINT "times_swimmer_id_swimmers_id_fk" FOREIGN KEY ("swimmer_id") REFERENCES "public"."swimmers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "times" ADD CONSTRAINT "times_meet_id_meets_id_fk" FOREIGN KEY ("meet_id") REFERENCES "public"."meets"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "times" ADD CONSTRAINT "times_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE no action ON UPDATE no action;