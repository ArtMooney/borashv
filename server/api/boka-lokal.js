import { createRow } from "~~/server/db/baserow/create-row.js";
import { messageBookingRequest } from "~~/server/content/message-booking-request.js";

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

  const toOwner = await sendEmail(
    config.emailFrom,
    config.emailTo,
    "Jag önskar boka en lokal...",
    await messageBookingRequest(formDataJson),
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
