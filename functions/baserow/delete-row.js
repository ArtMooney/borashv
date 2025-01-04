export async function deleteRow(tableid, id) {
  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
    Authorization: "Token " + baserowBackendToken,
  };

  let response = await fetch(
    `https://api.baserow.io/api/database/rows/table/${tableid}/${id}/`,
    {
      method: "DELETE",
      headers: headersList,
    },
  );

  return await response.json();
}
