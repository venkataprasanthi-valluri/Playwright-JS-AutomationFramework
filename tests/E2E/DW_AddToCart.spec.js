const {test,expect} = require('@playwright/test');

test('DW_Add to Cart', async({page}) => {
	
	//Launching website
	await page.goto("https://demowebshop.tricentis.com/");
	//Login to website
	await page.getByRole('link', {name: 'Log in'}).click();
	await page.locator('#Email').fill("christmas.santa@gmail.com");
	await page.locator("#Password").fill("Password@123");
	await page.getByRole('button', {name: 'Log in'}).click();
	//selecting Apparel & Shoes link
	await page.getByText("Apparel & Shoes").nth(2).click();
	//Selecting an item from Apparel & Shoes items
	await page.getByRole('link', {name:'Blue Jeans'}).nth(0).waitFor();
	await page.getByRole('link', {name:'Blue Jeans'}).nth(0).click();
	//Selecting Quantity and Add to Cart button
	await page.locator("#addtocart_36_EnteredQuantity").waitFor();
	await page.locator("#addtocart_36_EnteredQuantity").fill('2');
	await page.locator("#add-to-cart-button-36").click();
	//Validating product added success message
	await expect(page.getByText("The product has been added to your shopping cart")).toBeVisible();
	//navigating to Shopping cart
	await page.getByText("Shopping cart").nth(1).click();
	await expect(page.locator(".page-title")).toBeVisible();
	//Providing details for Billing Address
	await page.locator("#CountryId").selectOption("1");
	await page.locator("#StateProvinceId").selectOption("48");
	await page.getByRole('button', {name:'Estimate shipping'}).click();
	await expect(page.locator(".option-name").nth(0)).toBeVisible();
	await page.locator("#termsofservice").check();
	await page.getByRole('button', {name:'Checkout'}).click();
	await expect(page.getByText('Checkout')).toBeVisible();
	//Billing address
	//await page.locator("#BillingNewAt page.locatorddress_CountryId").selectOption("1");
	//await page.locator("#BillingNewAddress_StateProvinceId").selectOption("48");
	//await page.locator("#BillingNewAddress_City").fill("Mechanicsburg)");
	//await page.locator("#BillingNewAddress_Address1").fill("5001 Carlisle Pike");
	//await page.locator("#BillingNewAddress_ZipPostalCode").fill("17050");
	//await page.locator("#BillingNewAddress_PhoneNumber").fill("9999999999");
	await page.getByRole('button', {name:'Continue'}).click();
	//Providing Shipping Address)
	await expect(page.getByText('Select a shipping address from your address book or enter a new address.')).toBeVisible();
	await page.getByRole('button', {name:'Continue'}).click();
	//Providing Shipping Method details
	await page.locator("#shippingoption_0").check();
	await page.getByRole('button', {name:'Continue'}).click();
	//Payment method details
	await page.locator("#paymentmethod_0").check();
	await page.getByRole('button', {name:'Continue'}).click();
	//Payment Information details
	await expect(page.getByText("You will pay by COD")).toBeVisible();
	await page.getByRole('button', {name:'Continue'}).click();
	await page.getByText("Confirm order").waitFor();
	//Calculating Total bill
	//await page.getByText("Sub-Total:").nth(0).waitFor();
	const sub_total = await page.locator(".product-price").nth(0).textContent();
	const subtotal = parseFloat(sub_total);
	console.log(subtotal);
	const shipping_cost= await page.locator(".product-price").nth(1).textContent();
	const shippingcost = parseFloat(shipping_cost);
	console.log(shippingcost);
	const add_fee = await page.locator(".product-price").nth(2).textContent();
	const addfee = parseFloat(add_fee);
	console.log(addfee);
	const tax = await page.locator(".product-price").nth(3).textContent();
	const _tax = parseFloat(tax);
	console.log(_tax);
	const calc_total = subtotal + shippingcost + addfee + _tax;
	console.log(calc_total);
	//await page.locator(".nobr").waitFor();
	const total = await page.locator('.nobr').nth(-1).textContent();
	const _total = parseFloat(total);
	console.log(_total);
	if(calc_total === _total)
	{
		console.log("Total matches");
		
	}
	else
	{
		console.log("Total doesn't match");
	}
	//Confirm Order
	await page.getByRole('button', {name: 'Confirm'}).click();
	await expect(page.getByText("Your order has been successfully processed!")).toBeVisible();
	const orderID = await page.locator('.details').textContent();
	console.log(orderID);
	await page.getByRole('button',{name:'Continue'}).click();
	//Going back to Home screen and logging out
	await expect(page.getByText("Welcome to our store")).toBeVisible();
	await page.getByRole('link',{name:'Log out'}).click();
	await expect(page.getByRole('link',{name: 'Log in'})).toBeVisible();

	
});