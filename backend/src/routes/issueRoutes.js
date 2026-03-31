import express from "express"
import {
  reportIssue,
  fetchAllIssues,
  fetchMyIssues,
  fetchNearbyIssues
} from "../controllers/issueController.js"
import authMiddleware from "../middleware/authMiddleware.js"
import upload from "../utils/upload.js"
import { updateIssueStatusController,fetchIssueStats,fetchMapIssues } from "../controllers/issueController.js"

const router = express.Router()

router.post("/report", authMiddleware,upload.single("image"), reportIssue )

router.get("/", fetchAllIssues)

router.get("/my", authMiddleware, fetchMyIssues)

router.get("/nearby", fetchNearbyIssues)

router.get("/map", fetchMapIssues)

router.get("/stats", fetchIssueStats)

router.patch("/status/:id", updateIssueStatusController)

export default router