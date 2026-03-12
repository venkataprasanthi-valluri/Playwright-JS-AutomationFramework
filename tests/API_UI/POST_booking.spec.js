const {test, expect} = require('@playwright/test');
//const fs= require('@fs'); 

test("POST_Request",async ({request})=>{
	
	//request body
	
	const reqBody = {
		
		"firstname" : "Jim",
	    "lastname" : "Brown",
	    "totalprice" : 111,
	    "depositpaid" : true,
	    "bookingdates" : {
	        "checkin" : "2018-01-01",
	        "checkout" : "2019-01-01"
		    },
		    "additionalneeds" : "Breakfast"
		
	}
	//send POST request
	const resp = await request.post("https://restful-booker.herokuapp.com/booking", {data:reqBody});
	const respBody = await resp.json();
	console.log(respBody);
	
	expect(resp.ok()).toBeTruthy();
	expect(resp.status()).toBe(200);
	
	expect(respBody).toHaveProperty("booking.firstname");
		
})