const {user} = require("../models/user")
const {post} = require("../models/post")

module.exports = {
        getAllPosts: (req, res) => {
            console.log("getAllPosts")
        },

        getCurrentUserPosts: (req, res) => {
            console.log("getCurrentUserPosts")
        },

        addPost: async (req, res) => {
            try {
                const {title, content, status, userId} = req.body
                await post.create({
                    title,
                    content,
                    privateStatus: status,
                    userId
                })
                req.sendStatus(200)
            } catch (err) {
                console.log('ERROR IN addPost')
                console.log(err)
                res.sendStatus(400)
            }
        },

        editPost: (req, res) => {
            console.log("editPost")
        },

        deletePost: (req, res) => {
            console.log("deletePost")
        }
}