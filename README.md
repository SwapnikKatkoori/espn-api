# espn-api
An unofficial espn-api that gets data by scraping the espn ff page.


# Install
``` npm i espn-api```

# Usage

## require
```const espn_api = require("espn-api"); ```

## getting information
```
const api = new espn_api("username", "password", "league_ID");
(async()=>{
	await api.login(); #Login to
	console.log(await api.getStandings()); 
	console.log(await api.getScores());
	console.log(await api.closeBrowser());
})()```

# 
