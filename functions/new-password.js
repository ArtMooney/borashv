import { corsHeaders, handleCors } from "./middleware/cors.js";
import { checkLogin } from "./middleware/check-login.js";
import { listTables } from "./baserow/list-tables.js";
import { listRows } from "./baserow/list-rows.js";
import { updateRow } from "./baserow/update-row.js";
import { sendEmail } from "./mailgun/send-email.js";
import { messageNewPassword } from "./content/message-new-password.js";

export const onRequestPost = async ({ request, env, ctx }) => {
  const corsResponse = await handleCors(request, env);
  if (corsResponse) return corsResponse;

  const url = new URL(request.url);

  if (!(await checkLogin(request.headers, env.USERNAME, env.USERPASS)))
    return new Response(JSON.stringify({ error: "Login failed" }), {
      headers: corsHeaders,
    });

  const body = await request.json();

  if (!body.password || !body.validation) {
    return new Response(JSON.stringify({ error: "no input data" }), {
      headers: corsHeaders,
    });
  }

  const schema = await listTables(
    env.BASEROW_USERNAME,
    env.BASEROW_PASSWORD,
    env.BASEROW_DB_ID,
  );

  const usersId = schema.find((table) => table.name === "CMS users")?.id;

  if (!usersId) {
    return new Response(JSON.stringify({ error: "error" }), {
      headers: corsHeaders,
    });
  }

  const user = await listRows(
    env.BASEROW_BACKEND_TOKEN,
    usersId,
    body.validation,
  );

  if (!user || user.results.length === 0) {
    return new Response(JSON.stringify({ error: "error validating account" }), {
      headers: corsHeaders,
    });
  }

  user.results[0].password = body.password;
  user.results[0]["reset-id"] = "";
  const savePassword = await updateRow(
    env.BASEROW_BACKEND_TOKEN,
    usersId,
    user.results[0].id,
    user.results[0],
  );

  if (savePassword.error) {
    return new Response(JSON.stringify({ error: "error saving password" }), {
      headers: corsHeaders,
    });
  }

  const sendToEmail = await sendEmail(
    env.EMAIL_FROM,
    savePassword.email,
    "Your password to log into Simple CMS was changed",
    await messageNewPassword(),
    env.MAILGUN_API_KEY,
  );

  return new Response(JSON.stringify("ok"), { headers: corsHeaders });
};
