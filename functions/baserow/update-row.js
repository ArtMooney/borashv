export async function updateRow(token, requestData) {
  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
    Authorization: "Token " + token,
  };

  let bodyContent = JSON.stringify(requestData.data);

  let response = await fetch(
    `https://api.baserow.io/api/database/rows/table/${requestData.tableId}/${requestData.rowId}/?user_field_names=true`,
    {
      method: "PATCH",
      body: bodyContent,
      headers: headersList,
    },
  );

  return await response.json();
}
