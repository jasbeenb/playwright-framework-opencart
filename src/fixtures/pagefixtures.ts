
import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { CsvHelper } from '../utils/csvHelper';
import { ProductInfo } from '../pages/ProductInfo';
import { BasePage } from '../pages/BasePage';


type pageFixtures = {
    basePage: BasePage,
    loginPage: LoginPage,
    homePage: HomePage,
    searchResultsPage: SearchResultsPage,
    productInfoPage: ProductInfo,
    testData: Record<string,string>[]
}

//extend playwright base test:

export let test = baseTest.extend<pageFixtures>({


    basePage: async ({ page }, use) => {
        let basePage = new BasePage(page);
        await use(basePage);
    },

    loginPage: async ({ page }, use) => {
        let loginPage = new LoginPage(page);
        await use(loginPage);
    },

    homePage: async ({ page }, use) => {
        let homePage = new HomePage(page);
        await use(homePage);
    },

    searchResultsPage: async({page}, use)=>{
        let searchResultsPage = new SearchResultsPage(page);
        await use(searchResultsPage);
    },

     productInfoPage: async({page}, use)=>{
        let productInfoPage = new ProductInfo(page);
        await use(productInfoPage);
    },
    
    testData: async({}, use)=> {
       let testData = CsvHelper.readCSV('src/data/loginData.csv');
       await use(testData);
    }

});

export {expect} from '@playwright/test';