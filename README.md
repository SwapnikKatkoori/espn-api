# espn-api
An unofficial espn "api" for Node.js that gets data by scraping the espn ff page. 


# Install
``` npm i espn-api```

# Usage

### require
```const espn_api = require("espn-api"); ```

### getting information
```
const espnApi = require("espn-api").espnApi;
const api = new espnApi("username", "password", "462787");
(async()=>{
        await api.login();
        const standing = await api.getStandings();
        const scores = await api.getScores();
        await api.closeBrowser();
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
