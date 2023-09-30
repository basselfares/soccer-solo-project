const fileController = {}

fileController.searchPlayer = async (req, res, next) => {
  const url = `https://transfermarket.p.rapidapi.com/search?query=${req.body.playerSearch}&domain=de`;
  const options = {
  	method: 'GET',
  	headers: {
  		'X-RapidAPI-Key': process.env.TRANSFERMARKT_API_KEY,
  		'X-RapidAPI-Host': 'transfermarket.p.rapidapi.com'
  	}
};

try {
	const response = await fetch(url, options)
	.then(response => response.json())
  .then(data => {
    res.locals.playerID = data.players[0].id;
    res.locals.players = data.players;
  })
} catch (error) {
	console.error(error);
}
  return next();
}

console.log(fileController.searchPlayer)

fileController.getPlayerProfile = async (req, res, next) => {
  const url = `https://transfermarket.p.rapidapi.com/players/get-profile?id=${req.params.playerId}&domain=de`;
  const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': process.env.TRANSFERMARKT_API_KEY,
		'X-RapidAPI-Host': 'transfermarket.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options)
	.then(response => response.json())
  .then(data => {
    // console.log(data.playerProfile)
    res.locals.playerProfile = data.playerProfile;
    res.locals.playerProfile.test123 = 'test'
  })
} catch (error) {
	console.error(error);
}
  return next();
}

fileController.getTimephasedMarketValue = async (req, res, next) => {
  const url = `https://transfermarket.p.rapidapi.com/players/get-market-value?id=${req.params.playerId}&domain=de`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.TRANSFERMARKT_API_KEY,
      'X-RapidAPI-Host': 'transfermarket.p.rapidapi.com'
    }
  };

try {
	const response = await fetch(url, options)
	.then(response => response.json())
  .then(data => {
    // console.log(data.playerProfile)
    res.locals.playerProfile.timephasedMarketValue = data.marketValueDevelopment;
  })
} catch (error) {
	console.error(error);
}
  return next();
}

module.exports = fileController;