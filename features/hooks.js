const playwright = require('playwright');
const { chromium } = require('playwright');
const {Before, After} = require('@cucumber/cucumber');



Before(async function(){
	
	this.browser = await chromium.launch({headless: false});
	this.context = await this.browser.newContext();
	this.page = await this.context.newPage();
		
});

After(async function(){
	
	console.log("This is last step being executed");
	await this.page.close();
	await this.context.close();
	await this.browser.close();
	
});