const {test,expect} = require('@playwright/test');
const {POManager} = require('../../pages/POManager');
const dataset = JSON.parse(JSON.stringify(require("../../testdata/DWS_orderDetails.json")));


test('DW_Add to Cart', async({page}) => {
		
		//Login to Demo WebShop
		const poManager = new POManager(page);
		const Login = poManager.getLoginPage();
		await Login.goTo();
		await Login.validLogin(dataset.validUser.Email, dataset.validUser.Password);
		//Selecting and adding products to Cart
		const Product_Selection = poManager.getHomePage();
		await Product_Selection._books();
		const Book_Selection = poManager.getBooksSelection();
		await Book_Selection._book1(); 
		await Book_Selection._book2();
		//Navigating to Shopping cart and going for Checkout screen
		const Shopping_Cart = poManager.getShoppingCart();
		await Shopping_Cart._shoppingCart(dataset.shoppingCart.country,dataset.shoppingCart.state,dataset.shoppingCart.zipcode);
		const CheckOut = poManager.getCheckout();
		await CheckOut._billingAddress(dataset.billingAddress.country,dataset.billingAddress.state,dataset.billingAddress.city, dataset.billingAddress.address1, dataset.billingAddress.zipcode, dataset.billingAddress.phonenumber);
		await CheckOut._shippingAddress();
		await CheckOut._shippingMethod();
		await CheckOut._paymentMethod();
		await CheckOut._paymentInfo();  
		await CheckOut._confirmOrder();
		await CheckOut._orderSuccess();    
		await CheckOut._backtoHome();
		
});
