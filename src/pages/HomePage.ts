


import { BasePage } from "./BasePage";

import { Locator, Page } from "@playwright/test";

export class HomePage extends BasePage {
    //Locators: private
    private readonly logoutLink: Locator;
    private readonly headers: Locator;
    


    //constructor of class: init the locators
    constructor(page: Page) {
        super(page);
        this.logoutLink = page.getByRole('link', { name: 'Logout' });
        this.headers = page.getByRole('heading', { level: 2 });
        

    };

    //public page actions(method)/behavior

    async isLogoutLinkExists(): Promise<boolean> {
        return await this.logoutLink.isVisible();
    }

    async getHomePageheaders(): Promise<string[]> {
        return await this.headers.allInnerTexts();
    }

    async doSearch(searchkey: string): Promise<void> {
        console.log(`${searchkey}`);
        await this.search.fill(searchkey);
        await this.searchIcon.click();
    }

}


