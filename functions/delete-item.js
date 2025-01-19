import { corsHeaders, handleCors } from "./middleware/cors.js";
import { checkLogin } from "./middleware/check-login.js";
import { deleteRow } from "./baserow/delete-row.js";

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

  const deleteItem = await deleteRow(
    env.BASEROW_BACKEND_TOKEN,
    body.table_id,
    body.row_id,
  );

  return new Response(JSON.stringify(deleteItem), {
    headers: corsHeaders,
  });
};
