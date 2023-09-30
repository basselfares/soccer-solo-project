const express = require('express');
const teamController = require('../controllers/teamController');
const router = express.Router();

router.post('/', 
  teamController.createTeam,
  (req, res) => res.status(200).json(res.locals.team)
);

router.get('/', 
  teamController.getAllTeams,
  (req, res) => res.status(200).json(res.locals.teams)
);

router.get('/:id', 
  teamController.getTeam,
  (req, res) => res.status(200).json(res.locals.team)
);

router.patch('/:id', 
  teamController.updateTeam,
  (req, res) => res.status(200).json(res.locals.team)
);

router.delete('/:id', 
  teamController.deleteTeam,
  (req, res) => res.status(200).json(res.locals.team)
);

module.exports = router;