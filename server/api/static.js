import { checkLogin } from "../utils/check-login.js";
import { useDrizzle } from "~~/server/db/client.ts";
import { static_content } from "~~/server/db/schema.ts";
import { eq } from "drizzle-orm";

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
  const query = getQuery(event);

  if (!query.title) {
    throw createError({
      statusCode: 400,
      statusMessage: "Title parameter is required",
    });
  }

  try {
    const result = await db
      .select()
      .from(static_content)
      .where(eq(static_content.title, query.title))
      .get();

    if (!result) {
      throw createError({
        statusCode: 404,
        statusMessage: "Content not found",
      });
    }

    return result;
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch content",
    });
  }
});
