# espn-api
An unofficial espn "api" for Node.js that gets data by scraping the espn ff page. 


# Install
``` npm i espn-api```

# Usage

### require
```const espn_api = require("espn-api"); ```

### getting information
```
const api = new espn_api("username", "password", "league_ID");
(async()=>{
	await api.login(); 
	cosnt standing = await api.getStandings(); 
	const scores = await api.getScores();
	const await api.closeBrowser();
})()
```

# Method Details

### login()

login() will login to espn leagues using the username and password that is passed in when the espn_api is initialized. Might be needed when getting private league data.

### getStandings()

getStandings() returns a Promise of an object of the format:

```
 {
  standings_list: 
   [ 'rank team_name',
     'rank team_name',
     'rank team_name',
      ...],
  standings_map: 
   Map {
     rank => [ strings in the same format above of all the teams of rank],
     rank => [ strings in the same format above of all the teams of rank],
     ...} 
 }

```

### getScores()

getScores() will return a Promise of an object of the format:
```
{ scoresAsList: 
   [ [ 'team_name', 'score' ],
     [ 'team_name ', 'score' ],
     [ 'team_name', 'score' ],
   	...],
  scoreboards: 
   { '0': { home: ['team_name', 'score'], away: ['team_name', 'score'] },
     '1': { home: ['team_name', 'score'], away: ['team_name', 'score'] },
     '2': {home: ['team_name', 'score'], away: ['team_name', 'score'] },
     ...}  
 }
```

### closeBrowser()
Closes the browser instance.

# Motivation
I wanted to get access to my fantasy football league data so I could create a bot for our groupchat. 

# Contibuting
This unofficial api still needs a lot of work, so any pull requests are appreciated. Issue #1 will have a to do list on things that need to be added or improved. There will probaby also need to be a lot of maintanance since this relies on webbscraping and any change in the html could cause a function to break.
