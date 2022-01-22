const Users = require("../models/authModel")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose");
const {OAuth2Client} = require("google-auth-library");

const signUp  = (req,res)=> {
    const {email} = req.body
    Users.findOne({email}).exec((error, user) => {
        if (user) {
            return res.status(400).json({message:"Такой пользователь уже сущестует"})
        }
        const newUser =  new Users(req.body)
        newUser.save((error) => {
            if (error){
                return res.status(400).json({message:"Ошибка сохранения"})
            }
            return res.json({message: "Пользователь успешно зарегистрирован, Войдите."})
        })
    })
}
const signIn = (req,res)=> {
    const {email, password} = req.body
    Users.findOne({email}).exec(async (error,user)=> {
        if (!user) {
            return res.status(400).json({message:"Такого пользователя не сущестует"})
        }
        if(!await user.authenticate(password)){
           return  res.status(401).json({message:"Неверный пароль"})
        }
        const token = jwt.sign({_id:user._id},process.env.SECRET_KEY,{expiresIn: "1d"})
       return res.json({
           token,
           user:{_id:user._id,email:user.email, name:user.name,role:user.role}
       })
    })
}
const isAuthenticate = async (req,res) => {
    const token = req.header("auth-token")
    try {
        if (!token) {
            return res.status(401).json({message: "Token not found"})
        }
        const payload = jwt.verify(token, process.env.SECRET_KEY)
        const user = await Users.findOne({_id: payload._id})
        res.json({
            token,
            user: {
                _id: user._id, email: user.email, name: user.name, role: user.role
            }
        })
    } catch (e) {
        return res.status(401).json({message: "Invalid token"})
    }
}
    const getUserInfo = async (req, res) => {
        try {
            const user = await Users.findById(req.params.id).populate("news")
            res.json( {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    news:user.news
                })
        } catch (e) {
            return res.status(401).json({message: "Не удалось загрузить пользователя"})
        }
    }
// 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 client secret
    const client = new OAuth2Client("463557839196-o81b6dlv8mr6f00nf4t9d1kl1m0stb85.apps.googleusercontent.com")
    const googleLogin = async (req, res) => {
    const { idToken } = req.body
    client.verifyIdToken({idToken, audience: "463557839196-o81b6dlv8mr6f00nf4t9d1kl1m0stb85.apps.googleusercontent.com"})
        .then(response => {
            const  {email_verified, name, email} = response.payload;
            if (email_verified) {
                Users.findOne({email}).exec((err, user) => {
                    if (user) {
                        const token  = jwt.sign({ _id: user._id}, process.env.SECRET_KEY, {expiresIn: '7d'})
                        const { _id, email,name, role} = user
                        return res.json({
                            token,
                            user: {_id, email, name, role}
                        })
                    } else {
                        let password  = email + process.env.SECRET_KEY;
                        user = new Users({_id: new mongoose.Types.ObjectId(), name, email, password})
                        user.save((err,data) => {
                         if (err) {
                             console.log('ERROR GOOGGLE LOGIN ON USER SAVE', err)
                             return res.status(400).json({
                                 error: " GoogleAuth signup failed with google"
                             })
                         }
                         const token = jwt.sign({_id: data._id}, process.env.SECRET_KEY, {expiresIn: '7d'})
                            const { _id, email,name, role} = data
                            return res.json({
                                token,
                                user: {_id, email, name, role}
                            })
                        })
                    }
                })
            }
        })
}

module.exports = {signUp, signIn, isAuthenticate, getUserInfo, googleLogin}