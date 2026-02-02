const {test, expect} = require('@playwright/test');
const {POManager} = require('../../pages/POManager');
const dataset = JSON.parse(JSON.stringify(require("../../testdata/DWS_orderDetails.json")));
const fs = require('fs');

test('DW5_checkout', async({page})=>{
	
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
	await shoppingcart.terms.check();
	await shoppingcart.checkOut.click();
	await expect(shoppingcart.page.getByText('Checkout')).toBeVisible();
	//checkout page
	const checkOut = poManager.getCheckout();
	//Billing Address
	if (await checkOut.billaddress_dropdown.isVisible()) 
		{
			await checkOut.continue_billing.click();
			
		}
		else
		{
			await checkOut.country.selectOption("1");
			await checkOut.state.selectOption("48");
			await checkOut.city.fill("Mechanicsburg");
			await checkOut.address1.fill("5001 Carlisle Pike");
			await checkOut.zipcode.fill("17050");
			await checkOut.phonenumber.fill("9999999999");
			await checkOut.continue_billing.click();	
		}
	//Shipping Address
	await expect(checkOut.shipping_address).toBeVisible();
	await checkOut.continue_shipping.waitFor({ state: 'visible' });
	await checkOut.continue_shipping.click();	
	await page.waitForLoadState('networkidle');
	//Shipping Method
	await expect(async () => {
	  await checkOut.shipping_method1.click();
	}).toPass({ timeout: 10000 });
	//await checkOut.shipping_method1.waitFor({ state: 'visible' });
	//await checkOut.shipping_method1.check();
	await checkOut.continue_shipmethod.click();
	//Payment method
	await checkOut.payment_method1.check();
	await checkOut.continue_paymethod.click();
	//Payment Info
	await expect(checkOut.payment_info_cod).toBeVisible();
	await checkOut.continue_paymentinfo.click();
	//Confirm address
	const sub_Total = await checkOut.sub_total.textContent();
	const subtotal = parseFloat(sub_Total);
	console.log(subtotal);
	const shipping_Cost= await checkOut.shipping_cost.textContent();
	const shippingcost = parseFloat(shipping_Cost);
	console.log(shippingcost);
	const add_Fee = await checkOut.add_fee.textContent();
	const addfee = parseFloat(add_Fee);
	console.log(addfee);
	const Tax = await checkOut.tax.textContent();
	const _Tax = parseFloat(Tax);
	console.log(_Tax);
	const calc_total = subtotal + shippingcost + addfee + _Tax;
	console.log(calc_total);
	const Total = await checkOut.total.textContent();
	const _Total = parseFloat(Total);
	console.log(_Total);
	if(calc_total === _Total)
	{
		console.log("Total matches");
		
	}
	else
	{
		console.log("Total doesn't match");
	}
	await checkOut.confirm.click();
	//Order success
	await expect(checkOut.order_successmsg).toBeVisible();
	const orderDetails = await checkOut.orderID.textContent();
	const orderID = orderDetails.match(/Order number:\s*(\d+)/)[1];
	console.log(orderID);
	fs.writeFileSync('sharedData.txt', orderID);
	await checkOut.continue_ordersucess.click();
		
});