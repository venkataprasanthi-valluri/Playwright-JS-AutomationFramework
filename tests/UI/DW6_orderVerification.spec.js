const { test, expect } = require('@playwright/test');
const {POManager} = require('../../pages/POManager');
const dataset = JSON.parse(JSON.stringify(require("../../testdata/DWS_orderDetails.json")));
const fs = require('fs');

test('DW6_orderVerification', async({page})=>{
	
	const poManager = new POManager(page);
	const login = poManager.getLoginPage();
	//Launching website
	await login.goTo();
	//Login to website
	await login.login_link.click();
	await login.email.fill(dataset.validUser.Email);
	await login.password.fill(dataset.validUser.Password);
	await login.login_button.click();
	const ordersPage = poManager.getordersPage();
	await ordersPage.profile_link.click();
	await ordersPage.orders_link.click();
	const orderId = fs.readFileSync('sharedData.txt', 'utf-8');
	await expect(page.getByText(orderId)).toBeVisible();
	console.log(orderId + "is visible");	
	
});
