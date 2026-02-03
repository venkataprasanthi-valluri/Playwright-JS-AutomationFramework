const { test, expect } = require("@playwright/test");

class Login{
	
	constructor(page)
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
	
	async validLogin(Email, Password)
	
	{
		await this.email.fill(Email);
		await this.password.fill(Password);
		await this.login_button.click();
		await expect(this.login_verification).toBeVisible();
		
	}
	
	async invalidLogin(Email, Password)
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