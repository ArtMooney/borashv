export async function listTable(tableid, orderBy, order) {
  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
    Authorization: "Token " + `${import.meta.env.VITE_BASEROW_CLIENT_TOKEN}`,
  };

  let response = await fetch(
    `https://api.baserow.io/api/database/rows/table/${tableid}/?size=200&user_field_names=true&order_by=${order ? "-" : ""}${orderBy ? orderBy : "index"}`,
    {
      method: "GET",
      headers: headersList,
    },
  );

  if (!response.ok) {
    return { error: `HTTP error! status: ${response.status}` };
  }

  return await response.json();
}
