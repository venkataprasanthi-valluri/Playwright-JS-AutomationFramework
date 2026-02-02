const { test, expect } = require("@playwright/test");

class OrdersPage{
	
	constructor(page)
	{
		this.page = page;
		this.profile_link = page.getByRole('link',{name:'christmas.santa@gmail.com'});
		this.orders_link = page.getByRole('link',{name:'Orders'}).nth(0);
	}
	
	async orderVerification()
	{
		const orderId = fs.readFileSync('sharedData.txt', 'utf-8');
		await expect(page.getByText(orderId)).toBeVisible();
		console.log(orderId + "is visible");
	}	
}
module.exports = {OrdersPage};		