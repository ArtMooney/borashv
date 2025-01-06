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
    return new Response(JSON.stringify({ error: "error logging in" }), {
      headers: corsHeaders,
    });
  }

  const schema = await listTables(
    env.BASEROW_USERNAME,
    env.BASEROW_PASSWORD,
    env.BASEROW_DB_ID,
  );

  const users = schema.find((table) => table.name === "CMS users")?.id;

  if (!users) {
    return new Response(JSON.stringify({ error: "no users id found" }), {
      headers: corsHeaders,
    });
  }

  const tables = schema.filter((table) => table.name !== "CMS users");

  if (tables.length === 0) {
    return new Response(JSON.stringify({ error: "no tables found" }), {
      headers: corsHeaders,
    });
  }

  const user = await listRows(env.BASEROW_BACKEND_TOKEN, users, body.email);

  if (user.results.length === 0 || user.results[0].password !== body.password) {
    return new Response(JSON.stringify({ error: "credentials are wrong" }), {
      headers: corsHeaders,
    });
  }

  return new Response(JSON.stringify(tables), { headers: corsHeaders });
};
