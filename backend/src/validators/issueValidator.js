export const validateIssue = (data) => {

  if (!data.title || !data.description) {
    return "Title and description are required"
  }

  if (!data.lat || !data.lng) {
    return "Location is required"
  }

  return null
}