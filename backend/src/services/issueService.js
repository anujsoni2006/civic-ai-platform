import Issue from "../models/Issue.js"

export const createIssue = async (data, userId) => {

  const issue = new Issue({
    title: data.title,
    description: data.description,
    imageUrl: data.imageUrl,
    location: {
      lat: data.lat,
      lng: data.lng
    },
    reportedBy: userId
  })

  return await issue.save()
}
export const getAllIssues = async () => {
  return await Issue.find()
    .populate("reportedBy", "name email")
    .sort({ createdAt: -1 })
}

export const getUserIssues = async (userId) => {
  return await Issue.find({ reportedBy: userId })
    .sort({ createdAt: -1 })
}