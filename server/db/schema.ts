import { sqliteTable, integer, text, real } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`)
    .notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  resetId: text("reset_id"),
});

export const bokningar = sqliteTable("bokningar", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  venue: text("venue"),
  company: text("company"),
  name: text("name"),
  phone: text("phone"),
  email: text("email"),
  time: text("time"),
  date: text("date"),
  sortOrder: integer("sort_order"),
  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const booking_requests = sqliteTable("booking_requests", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  bookingValidation: text("booking_validation").notNull(),
  venue: text("venue"),
  company: text("company"),
  name: text("name"),
  phone: text("phone"),
  email: text("email"),
  eventType: text("event_type"),
  dateRange: text("date_range"),
  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const nyheter = sqliteTable("nyheter", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  info: text("info"),
  datum: text("datum"),
  kontaktaOss: integer("kontakta_oss", { mode: "boolean" }).default(false),
  bild: text("bild"),
  sortOrder: integer("sort_order"),
  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const styrelsen = sqliteTable("styrelsen", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  title: text("title"),
  email: text("email"),
  phone: text("phone"),
  sortOrder: integer("sort_order"),
  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const dokument = sqliteTable("dokument", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  file: text("file"),
  thumbnail: text("thumbnail"),
  sortOrder: integer("sort_order"),
  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const cmsTables = [
  { id: "bokningar", name: "Bokningar" },
  { id: "nyheter", name: "Nyheter" },
  { id: "styrelsen", name: "Styrelsen" },
  { id: "dokument", name: "Dokument" },
];

export const fieldTypes = {
  bokningar: {
    id: { value: "integer" },
    title: { value: "text" },
    venue: { value: "text" },
    company: { value: "text" },
    name: { value: "text" },
    phone: { value: "text" },
    email: { value: "text" },
    time: { value: "text" },
    date: { value: "date" },
    sortOrder: { value: "integer" },
    createdAt: { value: "date" },
    updatedAt: { value: "date" },
  },

  booking_requests: {
    id: { value: "integer" },
    bookingValidation: { value: "text" },
    venue: { value: "text" },
    company: { value: "text" },
    name: { value: "text" },
    phone: { value: "text" },
    email: { value: "text" },
    eventType: { value: "text" },
    dateRange: { value: "dateRange" },
    createdAt: { value: "date" },
    updatedAt: { value: "date" },
  },

  nyheter: {
    id: { value: "integer" },
    title: { value: "text" },
    info: { value: "text" },
    datum: { value: "date" },
    kontaktaOss: { value: "checkbox" },
    bild: { value: "fileImg" },
    sortOrder: { value: "integer" },
    createdAt: { value: "date" },
    updatedAt: { value: "date" },
  },

  styrelsen: {
    id: { value: "integer" },
    name: { value: "text" },
    title: { value: "text" },
    email: { value: "text" },
    phone: { value: "text" },
    sortOrder: { value: "integer" },
    createdAt: { value: "date" },
    updatedAt: { value: "date" },
  },

  dokument: {
    id: { value: "integer" },
    name: { value: "text" },
    file: { value: "file" },
    thumbnail: { value: "fileImg" },
    sortOrder: { value: "integer" },
    createdAt: { value: "date" },
    updatedAt: { value: "date" },
  },
};
