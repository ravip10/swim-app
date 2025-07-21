import { pgTable, text, timestamp, integer, decimal, boolean, uuid, jsonb } from 'drizzle-orm/pg-core';

// Swimmers table
export const swimmers = pgTable('swimmers', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  club: text('club').notNull(),
  region: text('region').notNull(), // Zone (Northeast, Southeast, etc.)
  lsc: text('lsc'), // Local Swimming Committee
  age: integer('age').notNull(),
  gender: text('gender').notNull(), // M or F
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

// Meets table
export const meets = pgTable('meets', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  location: text('location'),
  date: timestamp('date').notNull(),
  season: text('season'),
  level: text('level'), // Local, Regional, State, National
  created_at: timestamp('created_at').defaultNow(),
});

// Events table (different swimming events)
export const events = pgTable('events', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(), // e.g., "50 Free", "100 Breast"
  distance: integer('distance').notNull(), // in meters
  stroke: text('stroke').notNull(), // Free, Back, Breast, Fly, IM
  gender: text('gender'), // M, F, or null for mixed
  age_group: text('age_group'), // e.g., "13-14", "15-16"
  course: text('course').notNull().default('SCY'), // SCY, LCM, SCM
});

// Times table (actual swim times)
export const times = pgTable('times', {
  id: uuid('id').primaryKey().defaultRandom(),
  swimmer_id: uuid('swimmer_id').references(() => swimmers.id).notNull(),
  meet_id: uuid('meet_id').references(() => meets.id).notNull(),
  event_id: uuid('event_id').references(() => events.id).notNull(),
  time_seconds: decimal('time_seconds', { precision: 10, scale: 3 }).notNull(),
  time_formatted: text('time_formatted').notNull(), // e.g., "1:23.45"
  is_personal_best: boolean('is_personal_best').default(false),
  created_at: timestamp('created_at').defaultNow(),
});

// Rankings Cache Table (for persistent storage)
export const rankingsCache = pgTable('rankings_cache', {
  id: uuid('id').primaryKey().defaultRandom(),
  swimmer_id: uuid('swimmer_id').references(() => swimmers.id).notNull(),
  event_id: uuid('event_id').references(() => events.id).notNull(),
  time_id: uuid('time_id').references(() => times.id).notNull(),
  rank: integer('rank').notNull(),
  total_swimmers: integer('total_swimmers').notNull(),
  
  // Filter Context (what makes this ranking unique)
  stroke: text('stroke').notNull(),
  distance: integer('distance').notNull(),
  course: text('course').notNull(), // SCY, LCM, SCM
  gender: text('gender').notNull(), // M, F
  age_group: text('age_group').notNull(), // 8-under, 11-12, 13-14, etc.
  region: text('region'), // Eastern, Southern, etc.
  lsc: text('lsc'), // Local Swimming Committee
  season: text('season').notNull(), // 2024, 2025, etc.
  
  // Metadata
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

// Rankings Scraping Jobs Table
export const rankingsJobs = pgTable('rankings_jobs', {
  id: uuid('id').primaryKey().defaultRandom(),
  status: text('status').notNull(), // pending, running, completed, failed
  filters: jsonb('filters').notNull(), // the filters used for scraping
  total_records: integer('total_records'),
  created_at: timestamp('created_at').defaultNow(),
  completed_at: timestamp('completed_at'),
  error_message: text('error_message'),
});

// Rankings table (legacy - keep for backward compatibility)
export const rankings = pgTable('rankings', {
  id: uuid('id').primaryKey().defaultRandom(),
  swimmer_id: uuid('swimmer_id').references(() => swimmers.id).notNull(),
  event_id: uuid('event_id').references(() => events.id).notNull(),
  time_id: uuid('time_id').references(() => times.id).notNull(),
  rank: integer('rank').notNull(),
  total_swimmers: integer('total_swimmers').notNull(),
  season: text('season').notNull(),
  created_at: timestamp('created_at').defaultNow(),
});

// Standards table (qualifying times)
export const standards = pgTable('standards', {
  id: uuid('id').primaryKey().defaultRandom(),
  event_id: uuid('event_id').references(() => events.id).notNull(),
  level: text('level').notNull(), // A, AA, AAA, AAAA, etc.
  gender: text('gender').notNull(),
  age_group: text('age_group').notNull(),
  time_seconds: decimal('time_seconds', { precision: 10, scale: 3 }).notNull(),
  season: text('season').notNull(),
});

export type Swimmer = typeof swimmers.$inferSelect;
export type NewSwimmer = typeof swimmers.$inferInsert;
export type Meet = typeof meets.$inferSelect;
export type NewMeet = typeof meets.$inferInsert;
export type Event = typeof events.$inferSelect;
export type NewEvent = typeof events.$inferInsert;
export type Time = typeof times.$inferSelect;
export type NewTime = typeof times.$inferInsert;
export type Ranking = typeof rankings.$inferSelect;
export type NewRanking = typeof rankings.$inferInsert;
export type RankingCache = typeof rankingsCache.$inferSelect;
export type NewRankingCache = typeof rankingsCache.$inferInsert;
export type RankingJob = typeof rankingsJobs.$inferSelect;
export type NewRankingJob = typeof rankingsJobs.$inferInsert;
export type Standard = typeof standards.$inferSelect;
export type NewStandard = typeof standards.$inferInsert; 