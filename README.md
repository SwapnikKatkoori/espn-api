# espn-api
A groupme bot for fantasy football

```const espn_api = require("./espn-api/api.js");

const api = new espn_api("username", "password", "league_ID", "2019");
(async()=>{
	await api.login();
	console.log(await api.getStandings());
	console.log(await api.getScores());
	console.log(await api.closeBrowser());
})()```
