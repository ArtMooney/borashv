export async function sendFile(fileName, base64Data) {
  var byteCharacters = atob(base64Data);
  var byteNumbers = new Array(byteCharacters.length);
  for (var i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  var byteArray = new Uint8Array(byteNumbers);
  var blob = new Blob([byteArray], { type: "application/octet-stream" });

  let headersList = {
    Accept: "*/*",
    Authorization: "Token " + baserowBackendToken,
  };

  let bodyContent = new FormData();
  bodyContent.append("file", blob, fileName);

  let response = await fetch(
    "https://api.baserow.io/api/user-files/upload-file/",
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    },
  );

  return await response.json();
}
