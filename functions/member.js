import { corsHeaders, handleCors } from "./middleware/cors.js";
import { checkLogin } from "./middleware/check-login.js";
import { messageMember } from "./content/message-member.js";
import { sendEmail } from "./mailgun/send-email.js";

export const onRequestPost = async ({ request, env, ctx }) => {
  const corsResponse = await handleCors(request, env);
  if (corsResponse) return corsResponse;

  const url = new URL(request.url);

  if (!(await checkLogin(request.headers, env.USERNAME, env.USERPASS)))
    return new Response(JSON.stringify({ error: "Login failed" }), {
      headers: corsHeaders,
    });

  // const body = await request.json(); // when using only a json body
  const formData = await request.formData(); // when using formdata instead of json body
  const formDataJson = {};
  formData.forEach((value, key) => {
    formDataJson[key] = value;
  });

  if ([...formData.entries()].length === 0) {
    return new Response(JSON.stringify("error"), { headers: corsHeaders });
  }

  const toOwner = await sendEmail(
    env.EMAIL_FROM,
    env.EMAIL_TO,
    "Kontakt som vill bli medlem i Borås Hemvärnsförening!",
    JSON.stringify(formDataJson, null, 2),
    env.MAILGUN_API_KEY,
  );

  if (!toOwner.id) {
    return new Response(JSON.stringify("error"), { headers: corsHeaders });
  }

  const toContact = await sendEmail(
    env.EMAIL_TO,
    formDataJson.email,
    "Tack för att ni kontaktat Borås Hemvärnsförening!",
    await messageMember(formDataJson.firstname),
    env.MAILGUN_API_KEY,
  );

  if (!toContact.id) {
    return new Response(JSON.stringify("error"), { headers: corsHeaders });
  }

  return new Response(JSON.stringify("ok"), { headers: corsHeaders });
};
