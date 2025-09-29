export async function messageBookingRequest(formData) {
  return `${formData.name} vill boka en lokal
					
					
Företag: ${formData.company}
Kontaktperson: ${formData.name}
Telefon: ${formData.phone}
Email: ${formData.email}
Typ av verksamhet: ${formData["event-type"]}
Avser lokal: ${formData.venue}
Tid från: ${formData["date-range"].split(",")[0]}
Tid till: ${formData["date-range"].split(",")[1]}
					
					
Klicka här för att acceptera eller neka bokningen:
${formData.pageuri}?validation=${formData["booking-validation"]}
`;
}
