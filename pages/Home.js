
const {test, expect} = require('@playwright/test');

class Home{

	constructor(page)
	{
		this.page = page;
		this.welcome_txt = page.getByText("Welcome to our store");
		this.categories = page.locator(".listbox").first();
		//Books
		this.books = page.getByRole('link',{name: 'Books'}).nth(1);
		this.books_verification = page.locator('.page-title');
		  
		//Computers
		this.computers =page.getByRole('link',{name: 'Computers'}).nth(1);
		this.computers_verification = page.locator('.page-title');
		//Electronics
		this.electronics = page.getByRole('link',{name: 'Electronics'}).nth(1);
		this.electronics_verification = page.locator('.page-title');
		//Apparel & Shoes
		this.apparel_shoes = page.getByRole('link',{name: 'Apparel & Shoes'}).nth(1);
		this.apparel_verification = page.locator('.page-title');
		//Digital Downloads
		this.digital_downloads = page.getByRole('link',{name: 'Digital Downloads'}).nth(1);
		this.digitaldwnld_verification = page.locator('.page-title');
		//Jewelry
		this.jewelry = page.getByRole('link',{name: 'Jewelry'}).nth(1);
		this.jewelry_verification = page.locator('.page-title');
		//Gift Cards
		this.gift_cards = page.getByRole('link',{name: 'Gift Cards'}).nth(1);
		this.giftcards_verification = page.locator('.page-title');
		
	}
	
	async _books()
		{
			await this.books.click();
			const books_heading = await (this.books_verification).textContent();
			await expect(this.books_verification).toBeVisible();
			console.log(books_heading);
						
		}
	async _computers()
		{
			await this.computers.click();
			const computers_heading = await (this.computers_verification).textContent();
			await expect(this.computers_verification).toBeVisible();
			console.log(computers_heading);
			
		}
	async _electronics()
		{
			await this.electronics.click();
			const electronics_heading = await (this.electronics_verification).textContent();
			await expect(this.electronics_verification).toBeVisible();
			console.log(electronics_heading);
			
		}
	async _apparelShoes()
		{
			await this.apparel_shoes.click();
			const apparel_heading = await (this.apparel_verification).textContent();
			await expect(this.apparel_verification).toBeVisible();
			console.log(apparel_heading);
			
		}	
		
	async _digitalDownloads()
		{	
			await this.digital_downloads.click();
			const digital_heading = await (this.digitaldwnld_verification).textContent();
			await expect(this.digitaldwnld_verification).toBeVisible();
			console.log(digital_heading);
		}	
		
	async _jewelry()
		{
			await this.jewelry.click();
			const jewelry_heading = await (this.jewelry_verification).textContent();
			await expect(this.jewelry_verification).toBeVisible();
			console.log(jewelry_heading);
			
		}	
	async _giftCards()
		{
			await this.gift_cards.click();
			const giftcards_heading = await (this.giftcards_verification).textContent();
			await expect(this.giftcards_verification).toBeVisible();
			console.log(giftcards_heading);
		}
		
};

module.exports = {Home};		