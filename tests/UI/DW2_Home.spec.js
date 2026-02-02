const {test, expect} = require('@playwright/test');
const {POManager} = require('../../pages/POManager');
const dataset = JSON.parse(JSON.stringify(require("../../testdata/DWS_orderDetails.json")));

test('DW2_Home', async({page})=>{
	//Login
	const poManager = new POManager(page);
	const login = poManager.getLoginPage();
	await login.goTo();
	await login.login_link.click()
	await login.validLogin(dataset.validUser.Email, dataset.validUser.Password);
	//Verifying Welcome Text in Home Page
	const homePage = poManager.getHomePage();
	await expect(homePage.welcome_txt).toBeVisible();
	const product_categories = await homePage.categories.textContent();
	console.log(product_categories);
	//Verifying each of the categories are displayed
	await expect(homePage.books).toBeVisible();
	console.log("Books link is displayed");
	await expect(homePage.computers).toBeVisible();
	console.log("Computers link is displayed");
	await expect(homePage.electronics).toBeVisible();
	console.log("Electronics link is displayed");
	await expect(homePage.apparel_shoes).toBeVisible();
	console.log("Apparel & Shoes link is displayed");
	await expect(homePage.digital_downloads).toBeVisible();
	console.log("Digital Downloads link is displayed");
	await expect(homePage.jewelry).toBeVisible();
	console.log("Jewelry link is displayed");
	await expect(homePage.gift_cards).toBeVisible();
	console.log("Gift Cards link is displayed");
	
});