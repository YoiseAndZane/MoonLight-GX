import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
});

export const quickAccessSites = pgTable("quick_access_sites", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  url: text("url").notNull(),
  icon: text("icon").notNull(),
  position: integer("position").notNull(),
});

export const userSettings = pgTable("user_settings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id).unique(),
  proxyEnabled: boolean("proxy_enabled").notNull().default(false),
  audioEnabled: boolean("audio_enabled").notNull().default(true),
  darkThemeEnabled: boolean("dark_theme_enabled").notNull().default(true),
  effectsEnabled: boolean("effects_enabled").notNull().default(true),
});

export const assistantMessages = pgTable("assistant_messages", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  content: text("content").notNull(),
  sender: text("sender").notNull(), // 'user' or 'ai'
  timestamp: integer("timestamp").notNull(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  name: true,
});

export const insertQuickAccessSiteSchema = createInsertSchema(quickAccessSites).pick({
  userId: true,
  name: true,
  url: true,
  icon: true,
  position: true,
});

export const insertUserSettingsSchema = createInsertSchema(userSettings).pick({
  userId: true,
  proxyEnabled: true,
  audioEnabled: true,
  darkThemeEnabled: true,
  effectsEnabled: true,
});

export const insertAssistantMessageSchema = createInsertSchema(assistantMessages).pick({
  userId: true,
  content: true,
  sender: true,
  timestamp: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertQuickAccessSite = z.infer<typeof insertQuickAccessSiteSchema>;
export type QuickAccessSite = typeof quickAccessSites.$inferSelect;

export type InsertUserSettings = z.infer<typeof insertUserSettingsSchema>;
export type UserSettings = typeof userSettings.$inferSelect;

export type InsertAssistantMessage = z.infer<typeof insertAssistantMessageSchema>;
export type AssistantMessage = typeof assistantMessages.$inferSelect;
