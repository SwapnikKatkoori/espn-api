const puppeteer = require('puppeteer')

class Api{

	constructor(email, password, leagueId){
		this.email = email
		this.password = password
		this.leagueId = leagueId
		this.browser = puppeteer.launch({headless:false});
	}

	async goToNewPage(url){
		const browser = await this.browser;
		const page = await browser.newPage();
		await page.goto(url);
		return page;
	}

	/*
		-Logs into espn if a username and password is given.
		-WARNING: Highly susceptable to change if espn decides to change how their website is formatted.
	*/
	async login(){
		const page = await this.goToNewPage('http://www.espn.com/login');
		await page.waitForSelector("iframe");

		//Gets the iframe for the login page
		const elementHandle = await page.$('div#disneyid-wrapper iframe');
		const frame = await elementHandle.contentFrame();

		//Selects the username field and types the username 
		await frame.waitForSelector('[ng-model="vm.username"]', {visible: true})
		const username = await frame.$('[ng-model="vm.username"]');
		await username.type(this.email);

		//Selects the password field and tyes the password
		await frame.waitForSelector('[ng-model="vm.password"]', {visible: true})
		const password = await frame.$('[ng-model="vm.password"]');
		await password.type(this.password);

		//Selects the log in button and clicks it
		await frame.waitForSelector('[aria-label="Log In"]', {visible: true})
		const loginButton = await frame.$('[aria-label="Log In"]');
		await loginButton.click();
		return true;
	}

	/*
	TODO:
	-Selectors need to be improved...
	*/
	async getStandings(){
		const page = await this.goToNewPage(`http://fantasy.espn.com/football/league/standings?leagueId=${this.leagueId}&seasonId=2019`);

		/*
		-selects the standings table and gets the standings as a list of strings.
		-in a weird format that is hard to read. Cleaned in the next part of the code.
		--WARNING: The format was changed for the 2019 season and might change again.
		*/
		await page.waitForSelector(".Table2__tbody");
		var table = null
		const list_of_names = await page.evaluate(()=>{
			var list_of_names = []
			table = document.getElementsByClassName('Table2__tbody');
			for(var i = 0; i<table[0].children.length; i++){
				list_of_names.push(table[0].children[i].textContent);
			}
			return list_of_names;
		})

		var standingsObject = this.cleanListOfNames(list_of_names);
		
		return standingsObject;	
	}

	/*
		-Cleans the list of names and makes then readable
		-Makes a map of the standings
		-Makes a list of strings of the standings
	*/
	cleanListOfNames(list_of_names){
		var standings_list = [];
		var standings_map = new Map();
		var count = 1
		for(var name of list_of_names){
			const index = name.indexOf('.');
			if (count >= 10){
				var rank = name.slice(0,2);
				var team_name = name.slice(2,index-3);

				if (isNaN(rank)){
					rank = name.slice(0,1);
					team_name = name.slice(1,index-3);
				}
				const rank_number = Number(rank);
				
				standings_list.push(rank+ " " + team_name); //1example team
				if (standings_map.has(rank_number)){
					standings_map.get(rank_number).push(rank+ " " + team_name);
				}else{
					standings_map.set(rank_number, []);
				}
			}
			else{
				const rank = name.slice(0,1);
				const rank_number = Number(rank);
				const team_name = name.slice(1,index-3)
				standings_list.push(rank + " " + team_name);
				if (standings_map.has(rank_number)){
					standings_map.get(rank_number).push(rank+ " " + team_name);
				}else{
					standings_map.set(rank_number, []);
				}
			}

			count += 1;

		}

		const standings = {
			standings_list: standings_list,
			standings_map: standings_map
		}
		return standings;
	}

	/*
	-Scrapes the espn score board page to get head to head scores.
	-Returns an object of the format:
	{

		scoresAsList: [["team_name", "score"],...]


		scoreboards:{
			0:  {
					home:["team_name", "score"],
					away:["team_name", "score"]
				}
			1:  ...
		}
	}
	TODO:
	-Selectors need to be improved...
	*/
	async getScores(){
		var page = await this.goToNewPage(`http://fantasy.espn.com/football/league/scoreboard?leagueId=${this.leagueId}&seasonId=2019`);

		const scoreCellDivs = "ScoreCell_Score--scoreboard";
		const teamNameDivs = "ScoreCell__TeamName";
		
		await page.waitForSelector(`.${scoreCellDivs}`);
		await page.waitForSelector(`.${teamNameDivs}`);

		//scoreboardsList is in the format [["Team Name", "Score"], ["Team Name", "Score"]...]
		const scoresAsList = await page.evaluate(()=>{
			const scoreCellDivs = "ScoreCell_Score--scoreboard";
			const teamNameDivs = "ScoreCell__TeamName";
			var scoreboardsAsList = [];
			const teamNames = document.getElementsByClassName(`${teamNameDivs}`);
			const scores = document.getElementsByClassName(`${scoreCellDivs}`);
			for ( let i = 0; i < teamNames.length; i++ ){
				var teamAndScore = [];
		 		teamAndScore.push(teamNames[i].textContent);
		 		teamAndScore.push(scores[i].textContent);
		 		scoreboardsAsList.push(teamAndScore);
		 	}
		 	return scoreboardsAsList;

		});

		//Takes the scoreboardsList and turns it into the format specified in the function description.
		var scoreboards= {};
		var i = 0;
		var gameNo = 0;
		while(i<scoresAsList.length){
			scoreboards[gameNo] = { home: scoresAsList[i], away: scoresAsList[i+1]};
			gameNo++;
			i+=2;
		}

		const scoreboardsObject = {
			scoresAsList: scoresAsList,
			scoreboards: scoreboards
		}
		return scoreboardsObject;

	}

	async getLineups(){
		const page = await this.goToNewPage('http://fantasy.espn.com/football/league/scoreboard?leagueId=462787');
		const buttonList = await page.waitForSelector('.btn--alt');
		
		console.log(await buttonList.children.textContent);
	}

	async closeBrowser(){
		const browser = await this.browser;
		await browser.close();
		return true;
	}
}
module.exports = Api;