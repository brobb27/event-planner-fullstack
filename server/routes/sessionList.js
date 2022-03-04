// import dependencies
const express = require('express')
const sessionListRouter = express.Router()
const Session = require(`../models/sessionModel`)

// Crud routes

// get all
sessionListRouter.get('/', (req, res, next) => {
    Session.find((err, sessionList) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(sessionList)
    })
})

// get by id
sessionListRouter.get(`/:sessionId`, (req, res, next) => {
    Session.findOne({_id: req.params.sessionId}, (err, sessionFound) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(sessionFound)
    })
})

// post request
sessionListRouter.post(`/`, (req, res, next) => {
    const newSession = new Session(req.body)
    newSession.save((err, savedSession) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedSession)
    })
})

// put request
sessionListRouter.put(`/:sessionId`, (req, res, next) => {
    Session.findOneAndUpdate(
        {_id: req.params.sessionId}, // finds session by id
        req.body, // info to update the database with
        {new: true}, // sends back the updated session
        (err, updatedSession) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedSession)
        }
    )
})

// delete request
sessionListRouter.delete(`/:sessionId`, (req, res, next) => {
    Session.findOneAndDelete({_id: req.params.sessionId}, (err, deletedSession) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`You have successfully removed ${deletedSession.title} from the database.`)
    })
})

module.exports = sessionListRouter