import express from "express"
import {
  reportIssue,
  fetchAllIssues,
  fetchMyIssues
} from "../controllers/issueController.js"
import authMiddleware from "../middleware/authMiddleware.js"
import upload from "../utils/upload.js"

const router = express.Router()

router.post("/report", authMiddleware,upload.single("image"), reportIssue)

router.get("/", fetchAllIssues)

router.get("/my", authMiddleware, fetchMyIssues)

export default router