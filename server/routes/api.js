const express = require('express');
const fileController = require('../controllers/fileController');
const router = express.Router();



router.post('/search',
  fileController.searchPlayer,
  (req, res) => res.status(200).json(res.locals.players)
);

router.get('/player/:playerId', 
  fileController.getPlayerProfile,
  fileController.getTimephasedMarketValue,
  (req, res) => res.status(200).json(res.locals.playerProfile)
);

// router.post('/getID',
//   fileController.addPlayer,
//   (req, res) => {
//     console.log(req.body)
//     res.status(200).json(res.locals.newChar)
//   }
// );


module.exports = router;