import Issue from "../models/Issue.js"
import axios from "axios"
import FormData from "form-data"
import fs from "fs"

export const createIssue = async (data, userId) => {

  const issue = new Issue({
    title: data.title,
    description: data.description,
    imageUrl: data.imageUrl,
    location: {
      type: "Point",
      coordinates: [data.lng, data.lat] 
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
export const getNearbyIssues = async (lat, lng, radius) => {

  const radiusInMeters = radius * 1000

  return await Issue.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [lng, lat]
        },
        $maxDistance: radiusInMeters
      }
    }
  })
}

export const detectIssueAI = async (imagePath) => {
  try {

    const formData = new FormData()

    const fileBuffer = fs.readFileSync(imagePath)

    formData.append("file", fileBuffer, {
      filename: "image.jpg",
      contentType: "image/jpeg"
    })

    const response = await axios.post(
      "http://127.0.0.1:8000/detect",
      formData,
      {
        headers: formData.getHeaders(),
        maxBodyLength: Infinity
      }
    )

    return response.data

  } catch (error) {

    console.error("AI SERVICE ERROR:")
    console.error(error.message)

    if (error.response) {
      console.error(error.response.data)
    }

    throw error
  }
}
export const updateIssueStatus = async (issueId, status) => {

  const issue = await Issue.findByIdAndUpdate(
    issueId,
    { status },
    { new: true }
  )

  return issue
}

export const getIssueStats = async () => {

  const total = await Issue.countDocuments()

  const reported = await Issue.countDocuments({ status: "reported" })

  const inProgress = await Issue.countDocuments({ status: "in_progress" })

  const resolved = await Issue.countDocuments({ status: "resolved" })

  const highPriority = await Issue.countDocuments({ priority: "high" })

  const mediumPriority = await Issue.countDocuments({ priority: "medium" })

  const lowPriority = await Issue.countDocuments({ priority: "low" })

  return {
    total,
    reported,
    inProgress,
    resolved,
    highPriority,
    mediumPriority,
    lowPriority
  }
}

export const getMapIssues = async () => {

  const issues = await Issue.find(
    {},
    {
      location: 1,
      category: 1,
      priority: 1,
      status: 1
    }
  )

  return issues
}