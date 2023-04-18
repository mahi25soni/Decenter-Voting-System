const express = require("express")
const router = express.Router()
const { voterPage, addVoter, candidatePage, addCandidate, votePage, homePage, finalStep } = require("../controllers/voterControl")

router.get("/", homePage)

router.get("/voter", voterPage)
router.post("/voter", addVoter)

router.get("/candidate", candidatePage)
router.post("/candidate", addCandidate)

router.get("/election", votePage)
router.post("/added", finalStep)

module.exports = router


