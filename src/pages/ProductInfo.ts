


import { BasePage } from "./BasePage";

import { Locator, Page } from "@playwright/test";

export class ProductInfo extends BasePage {
    //Locators: private
    private readonly header: Locator;
    private readonly productImages: Locator;
    private readonly productMetaData: Locator;
    private readonly productPricing: Locator;
    private map: Map<string, string | number>;

    //constructor of class: init the locators
    constructor(page: Page) {
        super(page);
        this.header = page.getByRole('heading', { level: 1 });
        this.productImages = page.locator('div#content li img')
        this.productMetaData = page.locator('div#content ul.list-unstyled:nth-of-type(1) li')
        this.productPricing = page.locator('div#content ul.list-unstyled:nth-of-type(1) li')
        this.map = new Map<string, string>();
    };

    //public page actions(method)/behavior
    async getProductHeader(): Promise<string> {
        //await this.page.waitForTimeout(4000);
        await this.productImages.first().waitFor({state: 'visible'})
        return await this.header.innerText();
    }

    async getProductImagesCount(): Promise<number> {
        return await this.productImages.count();
    }

    /**
     * 
     * @returns actual product data
     */

    async getProductInfo(): Promise<Map<string, string | number>> {
        this.map.set('Product Header : ', await this.getProductHeader());
        this.map.set('Product Images : ', await this.getProductImagesCount());
        await this.getProductMetaData();
        await this.getProductPricing();
        return this.map;
    }

    private async getProductMetaData(): Promise<void> {
        let metaData: string[] = await this.productMetaData.allInnerTexts();
        for (let data of metaData) {
            let meta = data.split(':');
            let metaKey = meta[0].trim();
            let metaValue = meta[1].trim();
            this.map.set(metaKey, metaValue);

        }
    }

    private async getProductPricing(): Promise<void> {
        let priceData: string[] = await this.productPricing.allInnerTexts();
        let productprice = priceData[0].trim();
        let exTaxPrice = priceData[1].split(':')[1].trim();
        this.map.set('Product Price : ', productprice);
        this.map.set('Ex Tax Price : ', exTaxPrice)

    }

}


