//Importing the required packages
require('dotenv').config()
const jwt = require('jsonwebtoken')
const {SECRET} = process.env

//mosule.exports is used to export the function(s) to be used elsewhere in the server
module.exports = {
    isAuthenticated: (req, res, next) => {
        //req.get searches the header for the listed value and returns a string
        const headerToken = req.get('Authorization')

        //headerToken will either have have a string which is truthy or be undefined which is falsy
        //Thus this if statement will only run if there is no value in headerToken
        //and if ther eis no value in headerToken authorization is denied and a 401 status is sent
        if (!headerToken) {
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)
        }

        //declares token and temporarily sets the value to undefind
        let token

        //attempts to decrept headerToken and set the decripted value to token
        //if it fails it throws and error
        try {
            token = jwt.verify(headerToken, SECRET)
        } catch (err) {
            err.statusCode = 500
            throw err
        }

        //will run if token is not authenticated and will throw and error preventing unauthrorized access to the next function
        if (!token) {
            const error = new Error('Not authenticated.')
            error.statusCode = 401
            throw error
        }

        //runs the next function now that authorization has been granted
        next()
    }
}