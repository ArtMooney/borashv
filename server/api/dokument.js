import { checkLogin } from "../utils/check-login.js";
import { useDrizzle } from "~~/server/db/client.ts";
import { dokument } from "~~/server/db/schema.ts";
import { asc } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const headers = getHeaders(event);

  if (!(await checkLogin(headers, config.userName, config.userPass))) {
    throw createError({
      statusCode: 401,
      statusMessage: "Login failed",
    });
  }

  const db = useDrizzle(event.context.cloudflare.env.DB);
  return db.select().from(dokument).orderBy(asc(dokument.sortOrder)).all();
});
