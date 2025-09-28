import { listRows } from "~~/server/db/baserow/list-rows.js";

export async function checkAuthentication(config, email, password) {
  if (!email || !password) return false;

  const user = await listRows(
    config.baserowToken,
    config.baserowCmsBlacklist?.split(",").map(Number)[0],
    null,
    null,
    email,
  );

  return user.results.length > 0 && user.results[0].password === password;
}
