import { test, expect, Locator, Page } from '@playwright/test';

export class Login{
	
	page: Page;
	login_link: Locator;
	email: Locator;  
	password: Locator;
	login_button: Locator;
	//Login verification
	login_verification: Locator ;
	//login failure verification
	login_failure: Locator ;
	//logout
	logout_link: Locator;
	
	
	constructor(page: Page)
	{
		//login
		this.page = page;
		this.login_link = page.getByRole('link', {name: 'Log in'});
		this.email = page.locator('#Email');
		this.password = page.locator("#Password");
		this.login_button = page.getByRole('button', {name: 'Log in'});
		//Login verification
		this.login_verification = page.getByText("Welcome to our store");
		//login failure verification
		this.login_failure = page.locator(".message-error");
		//logout
		this.logout_link = page.getByRole('link',{name:'Log out'});
		
		
	}
	
	async goTo()
	{
		await this.page.goto("https://demowebshop.tricentis.com/login");
	}
	
	async validLogin(Email: string, Password: string)
	
	{
		await this.email.fill(Email);
		await this.password.fill(Password);
		await this.login_button.click();
		await expect(this.login_verification).toBeVisible();
		
	}
	
	async invalidLogin(Email: string, Password: string)
	{
		await this.login_link.click();
		await this.email.fill(Email);
		await this.password.fill(Password);
		await this.login_button.click();
		await expect(this.login_failure).toBeVisible();
	}
	
	async logout()
	{
		await this.logout_link.click();
	}
	
}
module.exports = {Login};