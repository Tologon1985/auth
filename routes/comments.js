const express = require("express")
const {addComments} = require("../controllers/comments");
const router = express.Router()


router.post("/", addComments)


module.exports = router