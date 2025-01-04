export async function updateRows(requestData) {
  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
    Authorization: "Token " + baserowBackendToken,
  };

  let bodyContent = JSON.stringify({ items: requestData.items });

  let response = await fetch(
    `https://api.baserow.io/api/database/rows/table/${requestData.tableid}/batch/?user_field_names=true`,
    {
      method: "PATCH",
      body: bodyContent,
      headers: headersList,
    },
  );

  return await response.json();
}
