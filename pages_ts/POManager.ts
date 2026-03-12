import {Login} from './Login';
import {Home} from './Home';
import {Books_Selection} from './BooksSelection';
import {ShoppingCart} from './ShoppingCart';
import {Checkout} from './Checkout';
import {OrdersPage} from './OrdersPage';
import {Page} from '@playwright/test';

export class POManager
{
	
	page: Page
	login: Login;
	home: Home;
	booksSelection:  Books_Selection;
	shoppingcart:  ShoppingCart;
	checkout: Checkout;  
	ordersPage: OrdersPage;
	
	
	
constructor(page :page)
{
    this.page = page;
    this.login = new Login(this.page);
    this.home = new Home(this.page);
    this.booksSelection = new Books_Selection(this.page);
    this.shoppingcart = new ShoppingCart(this.page);
    this.checkout = new Checkout(this.page);
	this.ordersPage = new OrdersPage(this.page);

}

getLoginPage()
{
    return this.login;
	
}

getHomePage()
{
	return this.home;
	
}

getBooksSelection()
{
	return this.booksSelection;
	
}

getShoppingCart()
{
	return this.shoppingcart;
	
}
getCheckout()
{
	return this.checkout;
	
}
getordersPage()
{
	return this.ordersPage;
	
}
}
module.exports = {POManager};