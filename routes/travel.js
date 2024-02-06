const express = require('express')
const router = express.Router()
const travelController = require('../controllers/travel')

router.delete("/:id",  travelController.deleteTravel)

router.get("/:id", travelController.singleTravel)

router.get("/", travelController.allTravel)
router.post('/comments/:travelId', travelController.addComment);
router.get('/comments/:travelId', travelController.allComments);
router.delete('/comments/:commentId', travelController.deleteComments)
module.exports = router