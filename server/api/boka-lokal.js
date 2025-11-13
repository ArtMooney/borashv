import { messageBookingRequest } from "~~/server/content/message-booking-request.js";
import { useDrizzle } from "~~/server/db/client.ts";
import { booking_requests } from "~~/server/db/schema.ts";

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

  formDataJson.bookingValidation = crypto.randomUUID();

  const db = useDrizzle(event.context.cloudflare.env.DB);

  try {
    const booking = await db
      .insert(booking_requests)
      .values(formDataJson)
      .returning();
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: "Failed to insert item",
    });
  }

  const toOwner = await sendEmail(
    config.emailFrom,
    config.bookingTo,
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
