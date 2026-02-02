 const {test, expect} = require('@playwright/test');
let webContext;

test.beforeAll(async({browser})=>
	
	{
		const context = await browser.newContext();
		const page = await context.newPage();
		//Launching website
		await page.goto("https://demowebshop.tricentis.com/");
		//Login to website
		await page.getByRole('link', {name: 'Log in'}).click();
		await page.locator('#Email').fill("christmas.santa@gmail.com");
		await page.locator("#Password").fill("Password@123");
		await page.getByRole('button', {name: 'Log in'}).click();
		await context.storageState({path: 'state.json'});
		await browser.newContext({storageState: 'state.json'});
		webContext = await browser.newContext({storageState: 'state.json'});
		
		
});

test('DW_Add to Cart', async() => {
	
	const page = await webContext.newPage();
	await page.goto("https://demowebshop.tricentis.com/");
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
	
});

test('DW_Navigating to Cart', async({browser})=>
{
	const context = await browser.newContext();
	const page = await context.newPage();
	await page.goto("https://demowebshop.tricentis.com/");
	await page.getByText("Shopping cart").nth(1).click();
	await expect(page.locator(".page-title")).toBeVisible();
	await context.storageState({path: 'cart.json'});
	await browser.newContext({storageState: 'cart.json'});
	webContext = await browser.newContext({storageState: 'cart.json'});
	
	
});	

//test('DW_Checkout', async()=> {
//	await page.locator("#CountryId").selectOption("1");
//	await page.locator("#StateProvinceId").selectOption("48");
//	await page.getByRole('button', {name:'Estimate shipping'}).click();
//	await expect(page.locator(".option-name").nth(0)).toBeVisible();
//	await page.locator("#termsofservice").check();1
//	await page.getByRole('button', {name:'Checkout'}).click();
//	await expect(page.getByText('Checkout')).toBeVisible();	
	
	
//})

 