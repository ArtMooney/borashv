import { createRow } from "~~/server/db/baserow/create-row.js";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const headers = getHeaders(event);

  if (!(await checkLogin(headers, config.userName, config.userPass))) {
    throw createError({
      statusCode: 401,
      statusMessage: "Login failed",
    });
  }

  const formData = await readFormData(event);
  const formDataJson = Object.fromEntries(formData);

  if (Object.keys(formDataJson).length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "No form data provided",
    });
  }

  formDataJson["booking-validation"] = crypto.randomUUID();

  const booking = await createRow(config.baserowToken, "687942", formDataJson);

  formDataJson.from = formDataJson["date-range"].split(",")[0];
  formDataJson.to = formDataJson["date-range"].split(",")[1];
  delete formDataJson["date-range"];

  const toOwner = await sendEmail(
    config.emailFrom,
    config.emailTo,
    "Jag önskar boka en lokal...",
    JSON.stringify(formDataJson, null, 2),
    config.mailgunApiKey,
  );

  if (!toOwner.id) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to send email to owner",
    });
  }

  return {
    success: true,
    data: {
      message: "Booking request sent successfully",
    },
  };
});
