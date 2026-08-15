import { Locator, Page } from "@playwright/test";


export class BasePage {
    protected readonly page: Page;

    //common locators used throughout application
    protected readonly logo: Locator;
    protected readonly search: Locator;
    protected readonly searchIcon: Locator;
    protected readonly footerLinks: Locator;
    protected readonly currency: Locator;
    protected readonly cartButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logo = page.getByAltText("naveenopencart");
        this.search = page.getByPlaceholder('Search');
        this.searchIcon = page.locator('div#search button');
        this.footerLinks = page.locator('footer a');
        this.currency = page.locator('#form-currency');
        this.cartButton = page.locator('div#cart button');

    }

    //common functionalities
    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState("load");
    }

        async getPageTitle(): Promise<string> {
        return await this.page.title();
    }

    getCurrentURL() {
        this.page.url();
    }

     async takeScreenshot(name: string) {
        return await this.page.screenshot({
            fullPage: true,
            path: `reports/screenshot/${name}.png`
        });
    }

    async isLogoVisible(): Promise<boolean> {
        return await this.logo.isVisible();
    }

    async isSearchBarVisible(): Promise<boolean> {
        return await this.search.isVisible();
    }

    async isCurrencyIconVisible(): Promise<boolean> {
        return await this.currency.isVisible();
    }

    async isCartVisible(): Promise<boolean> {
        return await this.cartButton.isVisible();
    }

     async getFooterLinksCount(): Promise<number> {
        return await this.footerLinks.count();
    }

    async getFooterLinks(): Promise<string[]> {
        return await this.footerLinks.allInnerTexts();
    }


}