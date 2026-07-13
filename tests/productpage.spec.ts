import {test, expect} from "../src/fixtures/pagefixtures";



  test.beforeEach(async ({ loginPage }) => {
        await loginPage.goToLoginPage();
        await loginPage.doLogin(process.env.APPUSERNAME!, process.env.PASSWORD!)
    });

    
    test(`verify product image count`, async ({homePage, searchResultsPage,productInfoPage}) => {
        await homePage.doSearch('macbook');
        await searchResultsPage.selectProduct('MacBook Pro');
        await productInfoPage.getProductHeader();
        expect (await productInfoPage.getProductImagesCount()).toBe(Number(4));
       // await productInfoPage.getProductInfo();
        
    });

     test(`verify product details`, async ({homePage, searchResultsPage,productInfoPage}) => {
        await homePage.doSearch('macbook');
        await searchResultsPage.selectProduct('MacBook Pro');
        let details = await productInfoPage.getProductInfo();
        console.log(details);
        expect.soft(details.get('Product Header : ')).toBe('MacBook Pro')
    });