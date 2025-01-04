import { corsHeaders, handleCors } from "./middleware/cors.js";
import { checkLogin } from "./middleware/check-login.js";
import { listTables } from "./baserow/list-tables.js";
import { listRows } from "./baserow/list-rows.js";

export const onRequestPost = async ({ request, env, ctx }) => {
  const corsResponse = await handleCors(request, env);
  if (corsResponse) return corsResponse;

  const url = new URL(request.url);

  if (!(await checkLogin(request.headers, env.USERNAME, env.USERPASS)))
    return new Response(JSON.stringify({ error: "Login failed" }), {
      headers: corsHeaders,
    });

  const body = await request.json();

  if (!body.email || !body.password) {
    return new Response(JSON.stringify("error"), { headers: corsHeaders });
  }

  const schemas = await listTables(
    env.BASEROW_USERNAME,
    env.BASEROW_PASSWORD,
    env.BASEROW_DB_ID,
  );

  const userId = schemas.find((schema) => schema.name === "CMS users")?.id;

  if (!userId) {
    return new Response(JSON.stringify("error"), { headers: corsHeaders });
  }

  const user = await listRows(env.BASEROW_BACKEND_TOKEN, userId, body.email);

  if (user.results[0].password !== body.password) {
    return new Response(JSON.stringify("error"), { headers: corsHeaders });
  }

  return new Response(JSON.stringify("ok"), { headers: corsHeaders });
};
