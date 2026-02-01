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
  date: text("date", { mode: "json" }),
  sortOrder: integer("sort_order"),
  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const statistics = sqliteTable("statistics", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  venue: text("venue"),
  company: text("company"),
  name: text("name"),
  phone: text("phone"),
  email: text("email"),
  date: text("date", { mode: "json" }),
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

export const static_content = sqliteTable("static_content", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  content: text("content", { mode: "json" }),
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
  { id: "nyheter", name: "Nyheter", viewMode: "list", backupRef: null },
  { id: "dokument", name: "Dokument", viewMode: "list", backupRef: null },
  { id: "styrelsen", name: "Styrelsen", viewMode: "list", backupRef: null },
  { id: "bokningar", name: "Bokningar", viewMode: "list", backupRef: null },
  {
    id: "statistics",
    name: "Statistics",
    viewMode: "graph",
    backupRef: "bokningar",
  },
  {
    id: "static_content",
    name: "Static Content",
    viewMode: "list",
    backupRef: null,
  },
];

export const fieldsConfig = {
  bokningar: {
    id: { type: "integer", label: "", required: true, hidden: true },
    title: { type: "text", label: "Title", required: true, hidden: false },
    venue: { type: "text", label: "Venue", required: true, hidden: false },
    company: { type: "text", label: "Company", required: false, hidden: false },
    name: { type: "text", label: "Name", required: false, hidden: false },
    phone: { type: "text", label: "Phone", required: false, hidden: false },
    email: { type: "text", label: "Email", required: false, hidden: false },
    time: { type: "text", label: "Time", required: false, hidden: false },
    date: { type: "dateRange", label: "Date", required: true, hidden: false },
    sortOrder: { type: "integer", label: "", required: true, hidden: true },
    createdAt: { type: "date", label: "", required: true, hidden: true },
    updatedAt: { type: "date", label: "", required: true, hidden: true },
  },

  get statistics() {
    return this.bokningar;
  },

  nyheter: {
    id: { type: "integer", label: "", required: true, hidden: true },
    title: { type: "text", label: "Title", required: true, hidden: false },
    info: { type: "textarea", label: "Info", required: false, hidden: false },
    datum: { type: "date", label: "Datum", required: false, hidden: false },
    kontaktaOss: {
      type: "checkbox",
      label: "Kontakta Oss",
      required: false,
      hidden: false,
    },
    bild: { type: "fileImg", label: "Bild", required: false, hidden: false },
    sortOrder: { type: "integer", label: "", required: true, hidden: true },
    createdAt: { type: "date", label: "", required: true, hidden: true },
    updatedAt: { type: "date", label: "", required: true, hidden: true },
  },

  styrelsen: {
    id: { type: "integer", label: "", required: true, hidden: true },
    name: { type: "text", label: "Name", required: true, hidden: false },
    title: { type: "text", label: "Title", required: false, hidden: false },
    email: { type: "text", label: "Email", required: false, hidden: false },
    phone: { type: "text", label: "Phone", required: false, hidden: false },
    sortOrder: { type: "integer", label: "", required: true, hidden: true },
    createdAt: { type: "date", label: "", required: true, hidden: true },
    updatedAt: { type: "date", label: "", required: true, hidden: true },
  },

  dokument: {
    id: { type: "integer", label: "", required: true, hidden: true },
    name: { type: "text", label: "Name", required: true, hidden: false },
    file: { type: "file", label: "File", required: false, hidden: false },
    thumbnail: {
      type: "fileImg",
      label: "Thumbnail",
      required: false,
      hidden: false,
    },
    sortOrder: { type: "integer", label: "", required: true, hidden: true },
    createdAt: { type: "date", label: "", required: true, hidden: true },
    updatedAt: { type: "date", label: "", required: true, hidden: true },
  },

  static_content: {
    id: { type: "integer", label: "", required: true, hidden: true },
    title: { type: "text", label: "Title", required: true, hidden: false },
    content: {
      type: "json",
      label: "Content",
      required: false,
      hidden: false,
    },
    sortOrder: { type: "integer", label: "", required: true, hidden: true },
    createdAt: { type: "date", label: "", required: true, hidden: true },
    updatedAt: { type: "date", label: "", required: true, hidden: true },
  },
};

export const graphConfig = {
  statistics: [
    {
      type: "selectors",
      dateField: "date",
    },
    {
      type: "bar",
      labelField: "venue",
      dateField: "date",
      datasets: [
        {
          dataField: "venue",
          label: "Bookings per venue",
          backgroundColor: "#f87979",
          borderColor: "#f87979",
        },
      ],
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            ticks: {
              stepSize: 1,
            },
          },
        },
      },
    },
    {
      type: "pie",
      labelField: "company",
      dateField: "date",
      showPercentage: true,
      datasets: [
        {
          dataField: "venue",
          label: "Bookings per company",
        },
      ],
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    },
  ],
};

const getSeoSchema = () => ({
  title: "text",
  description: "textarea",
  ogTitle: "text",
  ogDescription: "textarea",
  ogImage: "fileImg",
  twitterTitle: "text",
  twitterDescription: "textarea",
  twitterImage: "fileImg",
});

export const staticContentTypes = {
  "page - Index": {
    header: {
      title: "text",
      buttonTextOne: "text",
    },
  },
  "page - Bokningar": {
    header: {
      buttonTextOne: "text",
      buttonTextTwo: "text",
    },
    text_bokningar: {
      title: "text",
      text: "textarea",
    },
    text_regler: {
      title: "text",
      text: "textarea",
    },
  },
  "page - Om Oss": {
    textBlock: {
      title: "text",
      text: "textarea",
      buttonText: "text",
    },
  },
  "page - Styrelsen": {
    header: {
      title: "text",
    },
  },
  "page - Dokument": {
    header: {
      title: "text",
      text: "textarea",
    },
  },
  "page - Hemvarnsgarden": {
    header: {
      title: "text",
      buttonTextOne: "text",
    },
    textBlock: {
      textTodayOne: "textarea",
      textTodayTwo: "textarea",
      textThenOne: "textarea",
      textThenTwo: "textarea",
    },
  },
  "page - Bli Medlem": {
    textBlock: {
      title: "text",
      text: "textarea",
    },
  },
  "page - Kontakta Oss": {
    textBlock: {
      title: "text",
      text: "textarea",
    },
  },
  "component - News": {
    headings: {
      title: "text",
    },
  },
  "component - BookingsCalendar": {
    headings: {
      title: "text",
      titleComing: "text",
    },
  },
  "component - ContactBlock": {
    contact: {
      mobileLabel: "text",
      mobile: "text",
      emailLabel: "text",
      email: "text",
      addressLabel: "text",
      address: "text",
    },
  },
  "component - Contact": {
    contact: {
      title: "text",
      text: "text",
      button: "text",
    },
  },
  "component - Navbar": {
    buttons: {
      button1: "text",
      button2: "text",
      button3: "text",
      button4: "text",
      button5: "text",
      button6: "text",
      button7: "text",
      button8: "text",
      button9: "text",
    },
  },
  "component - Footer": {
    buttons: {
      button1: "text",
      button2: "text",
      button3: "text",
      button4: "text",
      button5: "text",
      button6: "text",
      button7: "text",
    },
  },
  "SEO page - Index": getSeoSchema(),
  "SEO page - Bli Medlem": getSeoSchema(),
  "SEO page - Bokningar": getSeoSchema(),
  "SEO page - Dokument": getSeoSchema(),
  "SEO page - Hemvarnsgarden": getSeoSchema(),
  "SEO page - Kontakta Oss": getSeoSchema(),
  "SEO page - Om Oss": getSeoSchema(),
  "SEO page - Styrelsen": getSeoSchema(),
};
