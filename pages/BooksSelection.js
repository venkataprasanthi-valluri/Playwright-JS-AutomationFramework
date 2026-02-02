 const {test, expect} = require('@playwright/test');

class Books_Selection{

	constructor(page)
	{
		this.page = page;
		this.book1 = page.getByRole('link',{name: 'Computing and Internet'}).nth(0);
		this.book2 = page.getByRole('link',{name: 'Fiction'}).nth(0);
		this.book3 = page.getByRole('link',{name: 'Health Book'}).nth(0);
		this.qty_book1 = page.locator("#addtocart_13_EnteredQuantity");
		this.qty_book2 = page.locator("#addtocart_45_EnteredQuantity");
		this.qty_book3 = page.locator("#addtocart_22_EnteredQuantity");
		this.add_to_cart =  page.getByRole('button', {name: 'Add to cart'}).nth(0); 
		this.bar_notification = page.locator(".content");
		
	}
		
	async _book1()
	{
		await this.book1.click();
		await this.qty_book1.fill("2");
		await this.add_to_cart.click();
		await this.bar_notification.waitFor();
		await expect(this.bar_notification).toBeVisible();
		const bar_notification = await this.bar_notification.textContent();
		console.log(bar_notification); 
								
	}
	async _book2()
	{
		await this.book2.click();
		await this.qty_book2.fill("2");
		await this.add_to_cart.click();
		await expect(this.bar_notification).toBeVisible();
		const bar_notification = await this.bar_notification.textContent();
		console.log(bar_notification);
								
	}	
	async _book3()
	{
		await this.book3.click();
		await this.qty_book3.fill("2");
		await this.add_to_cart.click();
		await expect(this.bar_notification).toBeVisible();
		const bar_notification = this.bar_notification.textContent();
		console.log(bar_notification);
								
	}			
}
module.exports = {Books_Selection};		