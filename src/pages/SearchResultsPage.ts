


import { BasePage } from "./BasePage";

import { Locator, Page } from "@playwright/test";

export class SearchResultsPage extends BasePage {
    //Locators: private
    private readonly searchResults: Locator;

    //constructor of class: init the locators
    constructor(page: Page) {
        super(page);
        this.searchResults = page.locator('div.product-layout');
    };

    //public page actions(method)/behavior
    async getProductSearchResultsCount():Promise<number>{
        return await this.searchResults.count();
    }

    async selectProduct(productName:string):Promise<void>{
        await this.page.getByRole('link',{name: productName, exact:true}).first().click();//dynamic locator
    }
   

}


