const { test, expect } = require("@playwright/test");

class Checkout{
	
	constructor(page)
	{
		this.page = page;
		//Billing address
		this.billaddress_dropdown = page.locator("#billing-address-select");
		this.country = page.locator("#BillingNewAddress_CountryId");
		this.state = page.locator("#BillingNewAddress_StateProvinceId");
		this.city = page.locator("#BillingNewAddress_City");
		this.address1 = page.locator("#BillingNewAddress_Address1");
		this.zipcode = page.locator("#BillingNewAddress_ZipPostalCode");
		this.phonenumber = page.locator("#BillingNewAddress_PhoneNumber");
		this.continue_billing = page.getByRole('button', {name:'Continue'});
		//shipping adddress
		this.shipping_address = page.locator("#shipping-address-select");
		this.continue_shipping = page.getByRole('button', {name:'Continue'});
		//shipping method
		this.shipping_method1 = page.locator("#shippingoption_0");
		this.shipping_method2 = page.getByRole('radio', {name: 'Next Day Air (0.00)'});
		this.shipping_method3 = page.getByRole('radio', {name: '2nd Day Air (0.00)'});
		this.continue_shipmethod = page.getByRole('button', {name:'Continue'});
		//Payment method
		this.payment_method1 = page.locator("#paymentmethod_0");
		this.payment_method2 = page.locator("#paymentmethod_1");
		this.payment_method3 = page.locator("#paymentmethod_2");
		this.payment_method4 = page.locator("#paymentmethod_3");
		this.continue_paymethod = page.getByRole('button', {name:'Continue'});
		//Payment infomration
		this.payment_info_cod = page.getByText("You will pay by COD");
		this.continue_paymentinfo =page.getByRole('button', {name:'Continue'});
		//Confirm Order
		this.sub_total = page.locator(".product-price").nth(0);
		this.shipping_cost= page.locator(".product-price").nth(1);
		this.add_fee = page.locator(".product-price").nth(2);
		this.tax = page.locator(".product-price").nth(3);
		this.total = page.locator('.nobr').nth(-1);
		this.confirm = page.getByRole('button', {name:'Confirm'});
		//Order success page
		this.order_successmsg = page.getByText("Your order has been successfully processed!");
		this.orderID = page.locator('.details');
		this.continue_ordersucess = page.getByRole('button',{name:'Continue'});
		//Going back to Home screen and logging out
		this.homepage_verification = page.getByText("Welcome to our store")
		this.logout = page.getByRole('link',{name:'Log out'});
		this.login = page.getByRole('link',{name: 'Log in'});
		
	}
	
	async _billingAddress(country, state, city, address1, zipcode, phonenumber)
	{
		if (await this.billaddress_dropdown.isVisible()) 
		{
			await this.continue_billing.click();
			
		}
		else
		{
			await this.country.selectOption("1");
			await this.state.selectOption("48");
			await this.city.fill("Mechanicsburg");
			await this.address1.fill("5001 Carlisle Pike");
			await this.zipcode.fill("17050");
			await this.phonenumber.fill("9999999999");
			await this.continue_billing.click();	
		}
		
					
	}
	
	async _shippingAddress()
	{
		await expect(this.shipping_address).toBeVisible();
		await this.continue_shipping.click();
					
	}
	
	async _shippingMethod()
	{
		await this.shipping_method1.check();
		await this.continue_shipmethod.click();
	}
	
	async _paymentMethod()
	{
		await this.payment_method1.check();
		await this.continue_paymethod.click();
		
	}
	
	async _paymentInfo()
	{
		await expect(this.payment_info_cod).toBeVisible();
		await this.continue_paymentinfo.click();
		
	}
	
	async _confirmOrder()
	{
		const sub_Total = await this.sub_total.textContent();
		const subtotal = parseFloat(sub_Total);
		console.log(subtotal);
		const shipping_Cost= await this.shipping_cost.textContent();
		const shippingcost = parseFloat(shipping_Cost);
		console.log(shippingcost);
		const add_Fee = await this.add_fee.textContent();
		const addfee = parseFloat(add_Fee);
		console.log(addfee);
		const Tax = await this.tax.textContent();
		const _Tax = parseFloat(Tax);
		console.log(_Tax);
		const calc_total = subtotal + shippingcost + addfee + _Tax;
		console.log(calc_total);
		const Total = await this.total.textContent();
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
		await this.confirm.click();
		
	}
	async _orderSuccess()
	{
		await expect(this.order_successmsg).toBeVisible();
		const orderID = await this.orderID.textContent();
		console.log(orderID);
		await this.continue_ordersucess.click();
	}
	
	async _backtoHome()
	{
		await expect(this.homepage_verification).toBeVisible();
		await this.logout.click();
		await expect(this.login).toBeVisible();
	}	
	
}
module.exports = {Checkout};			