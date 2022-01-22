const express = require("express")
const {createPost, getAllNews,getNews} = require("../controllers/news");
const verify = require("../middleware/authVerify")
const router = express.Router()


router.get("/", verify, getAllNews)
router.get("/:id", getNews)
router.post("/", createPost)


module.exports = router