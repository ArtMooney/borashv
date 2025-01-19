import { corsHeaders, handleCors } from "./middleware/cors.js";
import { checkLogin } from "./middleware/check-login.js";
import { updateRow } from "./baserow/update-row.js";
import { uploadFile } from "./baserow/upload-file.js";

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

  for (const field of body.schema) {
    if (body.item[field.name]) {
      if (
        field.type === "file" &&
        body.item[field.name].length > 0 &&
        !body.item[field.name][0].url
      ) {
        const file = await uploadFile(
          env.BASEROW_BACKEND_TOKEN,
          body.item[field.name][0].name,
          body.item[field.name][0].file,
        );

        body.item[field.name] = [file];
      }
    }
  }

  const saveItem = await updateRow(
    env.BASEROW_BACKEND_TOKEN,
    body.schema.find((item) => item.table_id)?.table_id,
    body.item.id,
    body.item,
  );

  return new Response(JSON.stringify(saveItem), {
    headers: corsHeaders,
  });
};
