const espn_api = require("./espn-api/api.js");

const api = new espn_api("username", "password");
(async()=>{
	await api.login();
	await api.getStandings();
})()
//api.closeBrowser();