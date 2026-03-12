const {test, expect} = require('@playwright/test');

test('practice1', async({page})=>{
	
	await page.goto("https://practice.expandtesting.com/js-dialogs");
	await page.locator("#js-alert").scrollIntoViewIfNeeded();
	await page.locator("#js-alert").nth(0).click();
	await page.once('dialog', async dialog => {
	    console.log(dialog.message());
	    expect(dialog.message()).toContain('I am a Js Alert'); // optional validation
	    await dialog.accept();
	  });

	await page.locator("#js-alert").scrollIntoViewIfNeeded();
	await page.locator("#js-alert").click();
		
}); 

test.only('table',async({page})=>{
	
	await page.goto("https://playwright.dev/docs/test-assertions");
	const rows = await page.locator("table").nth(0).locator("tbody tr");
	const rowsCount = await rows.count(); 
	console.log('Rows count is:', + rowsCount);
	const columns = await page.locator("table").nth(0).locator("thead th");
	const columnsCount = await columns.count(); 
	console.log('Headers count is:', + columnsCount);
	
	for(let i=0;i<columnsCount;i++)
		{
			const header = await page.locator("tr th").nth(i).textContent();
			console.log("Header", i+1, "is", header );
		}
	
	
});