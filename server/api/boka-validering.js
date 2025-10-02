import { listRows } from "~~/server/db/baserow/list-rows.js";
import { createRow } from "~~/server/db/baserow/create-row.js";
import { deleteRow } from "~~/server/db/baserow/delete-row.js";
import { messageBookingGranted } from "~~/server/content/message-booking-granted.js";
import { messageBookingRejected } from "~~/server/content/message-booking-rejected.js";

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

  const validation = await listRows(
    config.baserowToken,
    "687942",
    null,
    null,
    body["booking-validation"],
  );

  if (!validation || validation.results.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: "Invalid validation code",
    });
  }

  if (!body.action) {
    const saveBooking = await createRow(config.baserowToken, "691918", {
      title: validation.results[0]["event-type"],
      venue: validation.results[0].venue,
      company: validation.results[0].company,
      name: validation.results[0].name,
      phone: validation.results[0].phone,
      email: validation.results[0].email,
      "date|to-from": JSON.stringify(
        validation.results[0]["date-range"]
          .split(",")
          .map((d) => new Date(d.trim()).toISOString()),
      ),
    });

    const deleteValidation = await deleteRow(
      config.baserowToken,
      "687942",
      validation.results[0].id,
    );

    const sendToEmail = await sendEmail(
      config.emailFrom,
      validation.results[0].email,
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
    const deleteValidation = await deleteRow(
      config.baserowToken,
      "687942",
      validation.results[0].id,
    );

    const sendToEmail = await sendEmail(
      config.emailFrom,
      validation.results[0].email,
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
