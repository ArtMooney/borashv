export async function messageBookingRequest(formData) {
  return `${formData.name} vill boka en lokal
					
					
Företag: ${formData.company}
Kontaktperson: ${formData.name}
Telefon: ${formData.phone}
Email: ${formData.email}
Typ av verksamhet: ${formData.eventType}
Avser lokal: ${formData.venue}
Tid från: ${formData.dateRange.split(",")[0]}
Tid till: ${formData.dateRange.split(",")[1]}
					
					
Klicka här för att acceptera bokningen:
${formData.pageuri}?validation=${formData.bookingValidation}

Klicka här för att neka bokningen:
${formData.pageuri}?validation=${formData.bookingValidation}&action=reject
`;
}
