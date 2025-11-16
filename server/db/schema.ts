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
  date: text("date", { mode: "json" }).$type<string[]>(),
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
    id: { type: "integer", label: "id", required: true },
    title: { type: "text", label: "Title", required: true },
    venue: { type: "text", label: "Venue", required: false },
    company: { type: "text", label: "Company", required: false },
    name: { type: "text", label: "Name", required: false },
    phone: { type: "text", label: "Phone", required: false },
    email: { type: "text", label: "Email", required: false },
    time: { type: "text", label: "Time", required: false },
    date: { type: "dateRange", label: "Date", required: false },
    sortOrder: { type: "integer", label: "Sort Order", required: true },
    createdAt: { type: "date", label: "Created At", required: true },
    updatedAt: { type: "date", label: "Updated At", required: true },
  },

  nyheter: {
    id: { type: "integer", label: "id", required: true },
    title: { type: "text", label: "Title", required: true },
    info: { type: "textarea", label: "Info", required: false },
    datum: { type: "date", label: "Datum", required: false },
    kontaktaOss: { type: "checkbox", label: "Kontakta Oss", required: false },
    bild: { type: "fileImg", label: "Bild", required: false },
    sortOrder: { type: "integer", label: "Sort Order", required: true },
    createdAt: { type: "date", label: "Created At", required: true },
    updatedAt: { type: "date", label: "Updated At", required: true },
  },

  styrelsen: {
    id: { type: "integer", label: "id", required: true },
    name: { type: "text", label: "Name", required: true },
    title: { type: "text", label: "Title", required: false },
    email: { type: "text", label: "Email", required: false },
    phone: { type: "text", label: "Phone", required: false },
    sortOrder: { type: "integer", label: "Sort Order", required: true },
    createdAt: { type: "date", label: "Created At", required: true },
    updatedAt: { type: "date", label: "Updated At", required: true },
  },

  dokument: {
    id: { type: "integer", label: "id", required: true },
    name: { type: "text", label: "Name", required: true },
    file: { type: "file", label: "File", required: false },
    thumbnail: { type: "fileImg", label: "Thumbnail", required: false },
    sortOrder: { type: "integer", label: "Sort Order", required: true },
    createdAt: { type: "date", label: "Created At", required: true },
    updatedAt: { type: "date", label: "Updated At", required: true },
  },
};
