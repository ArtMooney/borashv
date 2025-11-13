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
    id: { value: "integer", name: "id" },
    title: { value: "text", name: "Title" },
    venue: { value: "text", name: "Venue" },
    company: { value: "text", name: "Company" },
    name: { value: "text", name: "Name" },
    phone: { value: "text", name: "Phone" },
    email: { value: "text", name: "Email" },
    time: { value: "text", name: "Time" },
    date: { value: "dateRange", name: "Date" },
    sortOrder: { value: "integer", name: "Sort Order" },
    createdAt: { value: "date", name: "Created At" },
    updatedAt: { value: "date", name: "Updated At" },
  },

  nyheter: {
    id: { value: "integer", name: "id" },
    title: { value: "text", name: "Title" },
    info: { value: "textarea", name: "Info" },
    datum: { value: "date", name: "Datum" },
    kontaktaOss: { value: "checkbox", name: "Kontakta Oss" },
    bild: { value: "fileImg", name: "Bild" },
    sortOrder: { value: "integer", name: "Sort Order" },
    createdAt: { value: "date", name: "Created At" },
    updatedAt: { value: "date", name: "Updated At" },
  },

  styrelsen: {
    id: { value: "integer", name: "id" },
    name: { value: "text", name: "Name" },
    title: { value: "text", name: "Title" },
    email: { value: "text", name: "Email" },
    phone: { value: "text", name: "Phone" },
    sortOrder: { value: "integer", name: "Sort Order" },
    createdAt: { value: "date", name: "Created At" },
    updatedAt: { value: "date", name: "Updated At" },
  },

  dokument: {
    id: { value: "integer", name: "id" },
    name: { value: "text", name: "Name" },
    file: { value: "file", name: "File" },
    thumbnail: { value: "fileImg", name: "Thumbnail" },
    sortOrder: { value: "integer", name: "Sort Order" },
    createdAt: { value: "date", name: "Created At" },
    updatedAt: { value: "date", name: "Updated At" },
  },
};
