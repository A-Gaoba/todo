const express = require("express")
const router = express.Router()

const {registerUser, logInUser, getMe} = require("../controller/userController")

router.post("/", registerUser)
router.post("/login", logInUser)
router.get("/me", getMe)


module.exports = router