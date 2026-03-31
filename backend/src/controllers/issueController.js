import { createIssue, getAllIssues, getUserIssues, getNearbyIssues, detectIssueAI,updateIssueStatus,getIssueStats ,getMapIssues} from "../services/issueService.js"
import { validateIssue } from "../validators/issueValidator.js"
import { mapDetectionToIssue } from "../utils/aiMapper.js"

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

    const latitude = parseFloat(lat)
    const longitude = parseFloat(lng)

    if (!latitude || !longitude) {
      return res.status(400).json({
        message: "Latitude and Longitude are required"
      })
    }

    // image handling
    const imageUrl = req.file ? req.file.path : null
    
   
    let aiDetection = null
    let category = "general issue"
    let priority = "low"

    if (imageUrl) {

      const aiResponse = await detectIssueAI(imageUrl)

      if (aiResponse?.detections?.length > 0) {
        aiDetection = aiResponse.detections[0]

        const mappedIssue = mapDetectionToIssue(aiResponse.detections)

        category = mappedIssue.category
        priority = mappedIssue.priority
      }
    }
    // create issue using service
    const issue = await createIssue(
      {
        title,
        description,
        lat:latitude,
        lng:longitude,
        imageUrl,
        aiDetection,
        category,
        priority
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

export const fetchNearbyIssues = async (req, res) => {
  try {

    const { lat, lng, radius } = req.query

    if (!lat || !lng) {
      return res.status(400).json({
        message: "Latitude and longitude required"
      })
    }

    const issues = await getNearbyIssues(
      parseFloat(lat),
      parseFloat(lng),
      parseFloat(radius || 5)
    )

    res.json({
      success: true,
      issues
    })

  } catch (error) {

    console.error(error)

    res.status(500).json({
      success: false,
      message: "Server error"
    })

  }
}

export const updateIssueStatusController = async (req, res) => {
  try {

    const { id } = req.params
    const { status } = req.body

    const updatedIssue = await updateIssueStatus(id, status)

    res.json({
      success: true,
      message: "Issue status updated",
      issue: updatedIssue
    })

  } catch (error) {

    console.error(error)

    res.status(500).json({
      success: false,
      message: "Server error"
    })

  }
}

export const fetchIssueStats = async (req, res) => {
  try {

    const stats = await getIssueStats()

    res.json({
      success: true,
      stats
    })

  } catch (error) {

    console.error(error)

    res.status(500).json({
      success: false,
      message: "Server error"
    })

  }
}

export const fetchMapIssues = async (req, res) => {
  try {

    const issues = await getMapIssues()

    res.json({
      success: true,
      issues
    })

  } catch (error) {

    console.error(error)

    res.status(500).json({
      success: false,
      message: "Server error"
    })

  }
}
