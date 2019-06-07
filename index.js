const espn_api = require("./espn-api/api.js");

const api = new espn_api("username", "password", "462787", "2019");
(async()=>{
	//await api.login();
	//console.log(await api.getStandings());
	console.log(await api.getScores());
})()
//api.closeBrowser();
