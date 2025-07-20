import { pgTable, text, timestamp, integer, decimal, boolean, uuid } from 'drizzle-orm/pg-core';

// Swimmers table
export const swimmers = pgTable('swimmers', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email'),
  club: text('club'),
  region: text('region'),
  age: integer('age'),
  gender: text('gender'),
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

// Rankings table
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
export type Standard = typeof standards.$inferSelect;
export type NewStandard = typeof standards.$inferInsert; 