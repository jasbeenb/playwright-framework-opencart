import {test, expect} from "../src/fixtures/pagefixtures";
import { CsvHelper } from "../src/utils/csvHelper";


  test.beforeEach(async ({ loginPage }) => {
        await loginPage.goToLoginPage();
        await loginPage.doLogin(process.env.APPUSERNAME!, process.env.PASSWORD!)
    });

    const productData = CsvHelper.readCSV('src/data/productData.csv');

    for (const row of productData){
    test(`verify search with product count with ${row.productname}`, async ({homePage, searchResultsPage}) => {
        await homePage.doSearch(row.searchkey);
        
        expect(await searchResultsPage.getProductSearchResultsCount()).toBe(Number(row.resultcount));
    });
}

for (const row of productData){
       test(`verify product page landing for ${row.productname}`, async ({homePage, searchResultsPage, page}) => {
        await homePage.doSearch(row.searchkey);
        await searchResultsPage.selectProduct(row.productname);
        expect(await page.title()).toBe(row.productname);
    });
}
