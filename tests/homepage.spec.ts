

import { test, expect } from '../src/fixtures/pagefixtures';



test.beforeEach(async ({ loginPage, basePage }) => {
    await loginPage.goToLoginPage();
    await basePage.waitForPageLoad();
    await loginPage.doLogin(process.env.APPUSERNAME!, process.env.PASSWORD!);
});

//common test for all pages


test('get page title', async({basePage})=>{
    await basePage.getPageTitle();
})

test('get page url', async({basePage})=>{
     basePage.getCurrentURL();
})

test('Verify logo on page ', async({basePage})=>{
    await basePage.isLogoVisible();
})



// page specific test cases
test('home page title test', async ({homePage}) => {

    const pageTitle = await homePage.getPageTitle();
    console.log('Home page title is ', pageTitle);
    expect(pageTitle).toBe('My Account');
});

test('Logout link exists', async ({homePage}) => {
    expect (await homePage.isLogoutLinkExists()).toBeTruthy();
});

test('Home page headers', async ({homePage}) => {
    let allHeaders = await homePage.getHomePageheaders();
    console.log(allHeaders);
    expect.soft(allHeaders).toHaveLength(4);
    expect.soft(allHeaders).toEqual([
        'My Account',
        'My Orders',
        'My Affiliate Account',
        'Newsletter'
    ]);
});