const puppeteer = require('puppeteer')
class Api{

	constructor(email,password){
		this.email = email;
		this.password = password;
	}

	async login(){
		const browser = await puppeteer.launch({headless:false});
		const page = await browser.newPage();

		await page.goto('http://www.espn.com/login')
		await page.waitForSelector("iframe");
	
		const elementHandle = await page.$('div#disneyid-wrapper iframe');
		const frame = await elementHandle.contentFrame();

		await frame.waitForSelector('[ng-model="vm.username"]', {visible: true})
		const username = await frame.$('[ng-model="vm.username"]');
		await username.type(this.email);

		await frame.waitForSelector('[ng-model="vm.password"]', {visible: true})
		const password = await frame.$('[ng-model="vm.password"]');
		await password.type(this.password);

		await frame.waitForSelector('[aria-label="Log In"]', {visible: true})
		const loginButton = await frame.$('[aria-label="Log In"]');
		await loginButton.click();
	}

}

module.exports = Api;