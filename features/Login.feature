Feature: DemoWebShop Login

Scenario: Valid Login
	Given I am on DemoWebShop Login Page "https://demowebshop.tricentis.com/login"
	When I enter "christmas.santa@gmail.com" and "Password@123"
	And I click on Login button 
	Then I should land on DemoWebShop Welcome Page
		
Scenario: Invalid Login
	Given I am on DemoWebShop Login Page "https://demowebshop.tricentis.com/login"
	When I enter "christmas.santa@gmail.com" and "Password@12345"
	And I click on Login button 
	Then I should see an error being displayed
