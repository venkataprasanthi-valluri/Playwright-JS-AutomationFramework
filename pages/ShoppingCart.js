const { test, expect } = require("@playwright/test");

class ShoppingCart{
	
	constructor(page)
	{
		this.page = page;
		//clicking on Shopping cart link
		this.shopping_cart = page.getByRole('link', { name: 'Shopping cart' }).nth(0);
		this.Go_to_cart = page.getByRole('button', {name:'Go to cart'});
		//empty cart
		this.emptyCart = page.locator(".order-summary-content");
		//Update cart and continue shopping buttons
		this.removeFromCart = page.locator(".remove-from-cart");
		this.removeFromCartCheckbox = page.locator("input[name='removefromcart']");
		this.update_cart = page.getByRole('button',{name: 'Update shopping cart'});
		this.continue_shopping = page.getByRole('button',{name: 'Continue shopping'});
		//Estimate shipping
		this.country = page.locator("#CountryId");
		this.state = page.locator("#StateProvinceId");
		this.zipcode = page.locator("#ZipPostalCode");
		this.estimate_shipping = page.getByRole('button', {name: 'Estimate shipping'});
		this.shippingCosts = page.locator(".shipping-results");
		//terms , Checkout button 
		this.terms = page.locator("#termsofservice");
		this.checkOut = page.getByRole('button', {name:'Checkout'});
	}
	
	async _shoppingCart(country,state,zipcode)
	{
		await this.shopping_cart.click();
		await this.country.selectOption(country);
		await this.state.selectOption(state);
		await this.zipcode.fill("zipcode");
		await this.estimate_shipping.click();
		await expect(this.shippingCosts).toBeVisible();
		const shipping_costestimate = await this.shippingCosts.textContent();
		console.log("Estimate Shipping costs are as below: \n", shipping_costestimate);
		await this.terms.check();
		await this.checkOut.click();
		//await expect(this.page.getByText('Checkout')).waitFor();
		await expect(this.page.getByText('Checkout')).toBeVisible();
		
	}
	
	async _clearCart()
	{
		await this.shopping_cart.click();
		const count = await this.removeFromCart.count();
		console.log(count);
		for (let i=0; i<count; i++)
			{
				await this.removeFromCartCheckbox.nth(i).check();
			}
		await this.update_cart.click();
		
	}
	
	async _continueShopping()
	{
		
		
		await this.shopping_cart.click();
		this.continue_shopping.click();
	}
	
	
}
module.exports = {ShoppingCart};		
		