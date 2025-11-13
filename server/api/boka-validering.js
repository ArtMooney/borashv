import { messageBookingGranted } from "~~/server/content/message-booking-granted.js";
import { messageBookingRejected } from "~~/server/content/message-booking-rejected.js";
import { useDrizzle } from "~~/server/db/client.ts";
import { eq } from "drizzle-orm";
import { bokningar, booking_requests } from "~~/server/db/schema.ts";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const headers = getHeaders(event);
  const body = await readBody(event);

  if (!(await checkLogin(headers, config.userName, config.userPass))) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  if (!body["booking-validation"]) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing a validation code",
    });
  }

  const db = useDrizzle(event.context.cloudflare.env.DB);

  const validation = await db
    .select()
    .from(booking_requests)
    .where(eq(booking_requests.bookingValidation, body["booking-validation"]))
    .limit(1)
    .then((rows) => rows[0] ?? null);

  if (!validation || validation.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: "Invalid validation code",
    });
  }

  if (!body.action) {
    const saveBooking = await db
      .insert(bokningar)
      .values({
        title: validation.eventType,
        venue: validation.venue,
        company: validation.company,
        name: validation.name,
        phone: validation.phone,
        email: validation.email,
        date: JSON.stringify(
          validation.dateRange
            .split(",")
            .map((d) => new Date(d.trim()).toISOString()),
        ),
      })
      .returning();

    try {
      const deleteValidation = await db
        .delete(booking_requests)
        .where(eq(booking_requests.id, validation.id));
    } catch (error) {
      throw createError({
        statusCode: 400,
        statusMessage: "Failed to delete item",
      });
    }

    const sendToEmail = await sendEmail(
      config.emailFrom,
      validation.email,
      "Er bokning har blivit godkänd",
      await messageBookingGranted(),
      config.mailgunApiKey,
    );

    if (!sendToEmail.id) {
      throw createError({
        statusCode: 500,
        statusMessage: "Failed to send email to user",
      });
    }
  } else {
    try {
      const deleteValidation = await db
        .delete(booking_requests)
        .where(eq(booking_requests.id, validation.id));
    } catch (error) {
      throw createError({
        statusCode: 400,
        statusMessage: "Failed to delete item",
      });
    }

    const sendToEmail = await sendEmail(
      config.emailFrom,
      validation.email,
      "Er bokning har blivit nekad",
      await messageBookingRejected(),
      config.mailgunApiKey,
    );

    if (!sendToEmail.id) {
      throw createError({
        statusCode: 500,
        statusMessage: "Failed to send email to user",
      });
    }
  }

  return "ok";
});
