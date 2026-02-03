const {Given, When, Then} = require('@cucumber/cucumber');
const {POManager} = require("../../pages/POManager");
const {test, expect, playwright} = require('@playwright/test');



Given('I am on DemoWebShop Login Page {string}', async function (url) {
    
	this.poManager = new POManager(this.page);
	this.login = this.poManager.getLoginPage();
	await this.login.goTo(url);  	

});
		 
When('I enter {string} and {string}', async function (email, password) {
	await this.login.email.fill(email);
	await this.login.password.fill(password);
            
});
				  
When('I click on Login button', async function () {
	
	await this.login.login_button.click();
            
});	
Then('I should land on DemoWebShop Welcome Page', async function () {
	
	await expect(this.login.login_verification).toBeVisible();
             
});	

Then('I should see an error being displayed', async function () {
	
	await expect(this.login.login_failure).toBeVisible();
             
});	 

  