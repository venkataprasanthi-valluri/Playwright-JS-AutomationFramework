const {test, expect} = require('@playwright/test');
const {POManager} = require('../../pages/POManager');
const dataset = JSON.parse(JSON.stringify(require("../../testdata/DWS_orderDetails.json")));

test('DW1_Login', async({page})=>{
	
	const poManager = new POManager(page);
	const login = poManager.getLoginPage();
	//Launching website
	await login.goTo();
	//Login to website
	await login.login_link.click();
	await login.email.fill(dataset.validUser.Email);
	await login.password.fill(dataset.validUser.Password);
	await login.login_button.click();
	
});