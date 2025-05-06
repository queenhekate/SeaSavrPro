import { pgTable, text, serial, integer, boolean, real, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Pollution reports table
export const pollutionReports = pgTable("pollution_reports", {
  id: serial("id").primaryKey(),
  // Location data
  latitude: real("latitude").notNull(),
  longitude: real("longitude").notNull(),
  // Report data
  pollutionType: text("pollution_type").notNull(),
  severity: text("severity").notNull(),
  description: text("description").notNull(),
  dateObserved: text("date_observed").notNull(),
  timeObserved: text("time_observed"),
  // Reporter info (optional)
  name: text("name"),
  email: text("email"),
  // Metadata
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Basic validation for the pollution report form
export const pollutionReportSchema = createInsertSchema(pollutionReports)
  .extend({
    // Add custom validation
    latitude: z.number()
      .min(-90, "Latitude must be between -90 and 90")
      .max(90, "Latitude must be between -90 and 90"),
    longitude: z.number()
      .min(-180, "Longitude must be between -180 and 180")
      .max(180, "Longitude must be between -180 and 180"),
    pollutionType: z.enum(["plastic", "oil", "sewage", "abandoned", "other"], {
      required_error: "Please select a pollution type",
    }),
    severity: z.enum(["low", "moderate", "high", "critical"], {
      required_error: "Please select a severity level",
    }),
    description: z.string()
      .min(10, "Description must be at least 10 characters")
      .max(1000, "Description must be less than 1000 characters"),
    dateObserved: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
    email: z.string().email("Invalid email address").optional().or(z.literal("")),
  });

export type PollutionReport = z.infer<typeof pollutionReportSchema>;
export type InsertPollutionReport = typeof pollutionReports.$inferInsert;
