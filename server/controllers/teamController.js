const Team = require('../models/teamModel')

const TeamController = {
    createTeam(req, res, next) {
        const { teamName, slots } = req.body
        Team.create({ teamName, slots })
        .then((data) => {
            res.locals.team = data;
            return next();
        })
        .catch((err) => {
            next({
                log: 'Failed to create new team ' + err,
                message: 'Failed to create new team ' + err
            })
        })
    },

    getAllTeams(req, res, next) {
        Team.find({})
        .then((data) => {
            res.locals.teams = data;
            return next();
        })
        .catch((err) => {
            next({
                log: 'Failed to get all teams ' + err,
                message: 'Failed to get all teams ' + err,
            })
        })
    },

    getTeam(req, res, next) {
        Team.findById(req.params.id)
        .then((data) => {
            res.locals.team = data;
            return next();
        })
        .catch((err) => {
            next({
                log: 'Failed to get team ' + err,
                message: 'Failed to get team ' + err,
            })
        })
    },

    updateTeam(req, res, next) {
        const { slots } = req.body
        Team.findByIdAndUpdate(
            req.params.id,
            { $set: { slots }},
            { new: true }
            )
        .then((data) => {
            res.locals.team = data;
            return next();
        })
        .catch((err) => {
            next({
                log: 'Failed to update team ' + err,
                message: 'Failed to update team ' + err
            })
        })
    },

    deleteTeam(req, res, next) {
        const { teamName, slots } = req.body
        Team.findByIdAndDelete(req.params.id)
        .then((data) => {
            res.locals.team = data;
            return next();
        })
        .catch((err) => {
            next({
                log: 'Failed to delete team ' + err,
                message: 'Failed to delete team ' + err
            })
        })
    }
};

module.exports = TeamController;