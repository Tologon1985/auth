const News = require ("../models/newsModel")
const User = require("../models/authModel")

const getAllNews = async (req, res) => {
try{
    const news = await News.find({}).populate("user", "-password")
    res.json(news)
}catch (e) {
    res.status(400).json({message:" Ошибка получения"})
}
}

const getNews = async (req, res) => {
    try{
        const news = await News.findById(req.params.id).populate("comments").populate({
            path:"comments",
            populate:"user"
        })
        res.json(news)
    }catch (e) {
        res.status(400).json({message:" Ошибка получения"})
    }
}

const createPost = async (req, res) => {
   try {
       const newPost = new News(req.body)
       const savedPost = await newPost.save()
       await User.findByIdAndUpdate(req.body.user, {$push: {news: savedPost._id}})
       res.json(savedPost)
   }catch (e) {
        res.status(400).json({message: "Ошибка сохранения"})
   }
}

module.exports={createPost, getAllNews,getNews}