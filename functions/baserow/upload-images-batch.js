export async function uploadImagesBatch(requestData) {
  for (const field of requestData.fields) {
    if (requestData.items[field.name]) {
      if (
        field.type === "file" &&
        requestData.items[field.name].length > 0 &&
        !requestData.items[field.name][0].url
      ) {
        const file = await sendFile(
          requestData.items[field.name][0].name,
          requestData.items[field.name][0].file,
        );
        requestData.items[field.name] = [file];
      }
    }
  }

  return requestData;
}
