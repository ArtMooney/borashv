import { checkLogin } from "../utils/check-login.js";
import { listRows } from "../db/baserow/list-rows.js";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const headers = getHeaders(event);

  if (!(await checkLogin(headers, config.userName, config.userPass))) {
    throw createError({
      statusCode: 401,
      statusMessage: "Login failed",
    });
  }

  try {
    const newsData = await listRows(
      config.baserowToken,
      "218351",
      true,
      "index",
    );

    return newsData.results;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: encodeURIComponent(
        "Något gick fel när nyheterna skulle hämtas",
      ),
    });
  }
});
