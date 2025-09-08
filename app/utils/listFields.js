export async function listFields(tableid) {
  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
    Authorization: "Token " + `${import.meta.env.VITE_BASEROW_CLIENT_TOKEN}`,
  };

  let response = await fetch(
    `https://api.baserow.io/api/database/fields/table/${tableid}/?user_field_names=true`,
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
