const {test, expect} = require('@playwright/test');
const {POManager} = require('../../pages/POManager');
const dataset = JSON.parse(JSON.stringify(require("../../testdata/DWS_orderDetails.json")));

test('DW3_AddingItemsToCart', async({page})=>{
	const poManager = new POManager(page);
	const login = poManager.getLoginPage();
	//Launching website
	await login.goTo();
	//Login to website
	await login.login_link.click();
	await login.email.fill(dataset.validUser.Email);
	await login.password.fill(dataset.validUser.Password);
	await login.login_button.click();
	const homePage = poManager.getHomePage();
	//Selecting Books link
	await expect(homePage.books).toBeVisible();
	console.log("Books link is displayed");
	await homePage.books.click();
	//Books selection screen
	const books_Selection = poManager.getBooksSelection() ;
	await books_Selection.book1.click();
	await books_Selection.qty_book1.fill("2");
	await books_Selection.add_to_cart.click();
	await books_Selection.bar_notification.waitFor();
	await expect(books_Selection.bar_notification).toBeVisible();
	const bar_notification = await books_Selection.bar_notification.textContent();
	console.log(bar_notification); 
	
});