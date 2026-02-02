const {Login} = require('./Login');
const {Home} = require('./Home');
const {Books_Selection} = require('./BooksSelection');
const {ShoppingCart} = require('./ShoppingCart');
const {Checkout} = require('./Checkout');
const {OrdersPage} = require('./OrdersPage');

class POManager
{
constructor(page)
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