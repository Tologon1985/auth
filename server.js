const express = require("express")
const cors = require("cors")
const mongoose= require("mongoose")
const authRouter = require("./routes/auth")
const newsRouter = require("./routes/news")
const commentsRouter = require("./routes/comments")
const chalk = require("chalk")
require ("dotenv").config()

const server = express()
server.use(cors())
server.use(express.json())
mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log(chalk.blue("DB is connected")))
    .catch(()=>console.log(chalk.red("DB is not connected")))

server.use("/api/v1", authRouter)
server.use("/api/v1/news", newsRouter)
server.use("/api/v1/comments", commentsRouter)



const port = 8080
server.listen(process.env.PORT || port, ()=> {
    console.log(chalk.magenta(`Server is running on the port  ${port}`))
})