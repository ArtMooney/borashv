export async function uploadImages(requestData) {
  for (const field of requestData.fields) {
    if (requestData.item[field.name]) {
      if (
        field.type === "file" &&
        requestData.item[field.name].length > 0 &&
        !requestData.item[field.name][0].url
      ) {
        const file = await uploadFile(
          requestData.item[field.name][0].name,
          requestData.item[field.name][0].file,
        );
        requestData.item[field.name] = [file];
      }
    }
  }

  return requestData;
}
