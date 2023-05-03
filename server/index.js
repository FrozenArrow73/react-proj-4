require("dotenv").config()
const express = require("express")
const cors = require("cors")

const {PORT} = process.env
const {register, login} = require("./controllers/auth")
const {getAllPosts, getCurrentUserPosts, addPost, editPost, deletePost} = require("./controllers/posts")
const {isAuthenticated} = require("./middleware/isAuthenticated")
const {sequelize} = require("./util/database")
const {post} = require("./models/post")
const {user} = require("./models/user")

user.hasMany(post)
post.belongsTo(user)

const app = express()
app.use(express.json())
app.use(cors())

app.post("/register", register)
app.post("/login", login)
app.get("/posts", getAllPosts)
app.get("/userposts/:userId", getCurrentUserPosts)

app.post("/posts", isAuthenticated, addPost)
app.put("/posts/:id", isAuthenticated, editPost)
app.delete("/posts/id", isAuthenticated, deletePost)



sequelize.sync().then(() => {

    app.listen(PORT, () => {
        console.log("running on port " + PORT)
    })

}).catch((err) => {
    console.log(err)
})

