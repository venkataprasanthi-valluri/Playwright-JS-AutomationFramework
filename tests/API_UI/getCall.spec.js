import {test,expect} from '@playwright/test';

test('Test GET test', async function({request}){
	
	const resp = await request.get("https://restful-booker.herokuapp.com/booking");
	const resbody = await resp.text();
	const resstatus = await resp.status();
	console.log(resstatus);
	console.log(resbody);
	
	console.log(resp);
		
})

