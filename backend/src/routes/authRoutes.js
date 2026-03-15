import express from "express"
import { registerUser } from "../controllers/authController.js"
import { loginUser } from "../controllers/authController.js"
import authMiddleware from "../middleware/authMiddleware.js"


const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)

router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route",
    user: req.user
  })
})

export default router