import { mysqlTable, int, text, timestamp } from "drizzle-orm/mysql-core";
import { users } from "./userSchema.js";
import { properties } from "./propertiesSchema.js";
import { roommate } from "./roommateSchema.js";

export const propertyApplications = mysqlTable("property_applications", {
  id: int("id").autoincrement().primaryKey(),
  propertyId: int("property_id")
    .references(() => properties.id, { onDelete: "cascade" })
    .notNull(),
  applicantId: int("applicant_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const roommateApplications = mysqlTable("roommate_applications", {
  id: int("id").autoincrement().primaryKey(),
  roommateOpeningId: int("roommate_opening_id")
    .references(() => roommate.id, { onDelete: "cascade" })
    .notNull(),
  applicantId: int("applicant_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow(),
});
