export async function createRow(requestData) {
  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
    Authorization: "Token " + baserowBackendToken,
  };

  let bodyContent = JSON.stringify(requestData.item);

  let response = await fetch(
    `https://api.baserow.io/api/database/rows/table/${requestData.tableid}/?user_field_names=true`,
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    },
  );

  return await response.json();
}
