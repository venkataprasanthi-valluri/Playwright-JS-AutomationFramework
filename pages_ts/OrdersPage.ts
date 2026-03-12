import { test, expect, Locator, Page } from '@playwright/test';

export class OrdersPage{
	
	page: Page;
	profile_link: Locator;
	orders_link: Locator; 
	
	constructor(page: Page)
	{
		this.page = page;
		this.profile_link = page.getByRole('link',{name:'christmas.santa@gmail.com'});
		this.orders_link = page.getByRole('link',{name:'Orders'}).nth(0);
	}
	
	async orderVerification()
	{
		orderId: number;
		orderId = fs.readFileSync('sharedData.txt', 'utf-8');
		await expect(page.getByText(orderId)).toBeVisible();
		console.log(orderId + "is visible");
	}	
}
module.exports = {OrdersPage};		