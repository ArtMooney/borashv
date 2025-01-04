export async function listRows(tableid, search) {
  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
    Authorization: "Token " + baserowBackendToken,
  };

  let response = await fetch(
    `https://api.baserow.io/api/database/rows/table/${tableid}/?user_field_names=true` +
      (search ? "&search=" + search : ""),
    {
      method: "GET",
      headers: headersList,
    },
  );

  return await response.json();
}
