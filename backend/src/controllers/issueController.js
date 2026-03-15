import { createIssue, getAllIssues, getUserIssues } from "../services/issueService.js"
import { validateIssue } from "../validators/issueValidator.js"

export const reportIssue = async (req, res) => {
  try {

    // validate input
    const validationError = validateIssue(req.body)

    if (validationError) {
      return res.status(400).json({
        message: validationError
      })
    }

    const { title, description, lat, lng } = req.body

    // image handling
    const imageUrl = req.file ? req.file.path : null

    // create issue using service
    const issue = await createIssue(
      {
        title,
        description,
        lat,
        lng,
        imageUrl
      },
      req.user._id
    )

    res.status(201).json({
      success: true,
      message: "Issue reported successfully",
      issue
    })

  } catch (error) {

    console.error(error)

    res.status(500).json({
      success: false,
      message: "Server error"
    })

  }
}

export const fetchAllIssues = async (req, res) => {
  try {

    const issues = await getAllIssues()

    res.json({
      success: true,
      issues
    })

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server error"
    })

  }
}

export const fetchMyIssues = async (req, res) => {
  try {

    const issues = await getUserIssues(req.user._id)

    res.json({
      success: true,
      issues
    })

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server error"
    })

  }
}