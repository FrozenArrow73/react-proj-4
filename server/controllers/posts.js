const {user} = require("../models/user")
const {post} = require("../models/post")

module.exports = {
        getAllPosts: async (req, res) => {
            try {
                const posts = await post.findAll({
                    where: {privateStatus: false},
                    include: [{
                        model: user,
                        required: true,
                        attributes: [`username`]
                    }]
                })
                res.status(200).send(posts)
            } catch (error) {
                console.log('ERROR IN getAllPosts')
                console.log(error)
                res.sendStatus(400)
            }
        },

        getCurrentUserPosts: async (req, res) => {
            try {
                const {userId} = req.params
                const posts = await post.findAll({
                    where: {userId: userId},
                    include: [{
                        model: user,
                        required: true,
                        attributes: [`username`]
                    }]})
                res.status(200).send(posts)
            } catch (err) {
                console.log('ERROR IN getCurrentUserPosts')
                console.log(err)
                res.sendStatus(400)
            }
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

        editPost: async (req, res) => {
            try {
                const {id} = req.params
                const {status} = req.body
                await post.update({privateStatus: status}, {
                    where: {id: +id}
                })
                res.sendStatus(200)
            } catch (err) {
                console.log('ERROR IN editPost')
                console.log(err)
                res.sendStatus(400)
            }
        },

        deletePost: (req, res) => {
            console.log("deletePost")
        }
}