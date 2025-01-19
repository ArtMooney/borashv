import { corsHeaders, handleCors } from "./middleware/cors.js";
import { checkLogin } from "./middleware/check-login.js";
import { updateRows } from "./baserow/update-rows.js";

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

  const saveAllItems = await updateRows(
    env.BASEROW_BACKEND_TOKEN,
    body.schema.find((item) => item.table_id)?.table_id,
    body.items,
  );

  return new Response(JSON.stringify(saveAllItems), {
    headers: corsHeaders,
  });
};
