const {test, expect} = require('@playwright/test');
const {POManager} = require('../../pages/POManager');
const dataset = JSON.parse(JSON.stringify(require("../../testdata/DWS_orderDetails.json")));

test('DW4_shoppingCart', async({page})=>{
	
	const poManager = new POManager(page);
	const login = poManager.getLoginPage();
	//Launching website
	await login.goTo();
	//Login to website
	await login.login_link.click();
	await login.email.fill(dataset.validUser.Email);
	await login.password.fill(dataset.validUser.Password);
	await login.login_button.click();
	const shoppingcart = poManager.getShoppingCart();
	await shoppingcart.shopping_cart.click();
	if(await shoppingcart.emptyCart.isVisible()){
		console.log("Shopping Cart is Empty");
	}
	else
	{
	await shoppingcart.country.selectOption(dataset.shoppingCart.country);
	await shoppingcart.state.selectOption(dataset.shoppingCart.state);
	await shoppingcart.zipcode.fill("dataset.shoppingCart.zipcode");
	await shoppingcart.estimate_shipping.click();
	await expect(shoppingcart.shippingCosts).toBeVisible();
	const shipping_costestimate = shoppingcart.shippingCosts.textContent();
	console.log("Estimate Shipping costs are as below: \n", shipping_costestimate);
	await shoppingcart.terms.check();
	await shoppingcart.checkOut.click();
	await expect(shoppingcart.page.getByText('Checkout')).toBeVisible();
	}
		
});