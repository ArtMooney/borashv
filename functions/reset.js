import { corsHeaders, handleCors } from "./middleware/cors.js";
import { checkLogin } from "./middleware/check-login.js";
import { listTables } from "./baserow/list-tables.js";
import { listRows } from "./baserow/list-rows.js";
import { updateRow } from "./baserow/update-row.js";
import { sendEmail } from "./mailgun/send-email.js";
import { messageEmailReset } from "./content/message-email-reset.js";
import { generateUserId } from "./helpers/generate-user-id.js";

export const onRequestPost = async ({ request, env, ctx }) => {
  const corsResponse = await handleCors(request, env);
  if (corsResponse) return corsResponse;

  const url = new URL(request.url);

  if (!(await checkLogin(request.headers, env.USERNAME, env.USERPASS)))
    return new Response(JSON.stringify({ error: "Login failed" }), {
      headers: corsHeaders,
    });

  const body = await request.json();

  if (!body.email || !body.pageuri) {
    return new Response(JSON.stringify("error"), { headers: corsHeaders });
  }

  const schemas = await listTables(
    env.BASEROW_USERNAME,
    env.BASEROW_PASSWORD,
    env.BASEROW_DB_ID,
  );

  const usersTableId = schemas.find(
    (schema) => schema.name === "CMS users",
  )?.id;

  if (!usersTableId) {
    return new Response(JSON.stringify("error"), { headers: corsHeaders });
  }

  const users = await listRows(env.BASEROW_BACKEND_TOKEN, usersTableId); // needed to compare id's
  const user = users.results.find((user) => user.email === body.email);

  if (!user) {
    return new Response(JSON.stringify("error"), { headers: corsHeaders });
  }

  user["reset-id"] = generateUserId(users);
  const saveUser = await updateRow(
    env.BASEROW_BACKEND_TOKEN,
    usersTableId,
    user.id,
    user,
  );

  if (saveUser.error) {
    return new Response(JSON.stringify("error"), { headers: corsHeaders });
  }

  const sendToEmail = await sendEmail(
    env.EMAIL_FROM,
    body.email,
    "Change password for your account on Simple CMS",
    await messageEmailReset(body.pageuri, user["reset-id"]),
    env.MAILGUN_API_KEY,
  );

  return new Response(JSON.stringify("ok"), { headers: corsHeaders });
};
