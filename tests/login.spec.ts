
    import { log } from 'node:console';
import{test , expect } from '../src/fixtures/pagefixtures';
import { CsvHelper } from '../src/utils/csvHelper';
import { ExcelHelper } from '../src/utils/excelHelper';
import { JsonHelper } from '../src/utils/jsonHelper';


    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goToLoginPage();
    });

    test('login page test', async ({loginPage}) => {

        const pageTitle = await loginPage.getPageTitle();//loginPage.getLoginPageTitle();
        console.log('Login page title is ', pageTitle);
        expect(pageTitle).toBe('Account Login');
    });


    test('forgot password link exists test', async ({loginPage}) => {
        expect(await loginPage.isForgotPwdLinkExists()).toBeTruthy();
    });


    test('User login', async ({loginPage,homePage}) => {
        await loginPage.doLogin(process.env.APPUSERNAME!, process.env.PASSWORD!);
        expect.soft(await homePage.isLogoutLinkExists()).toBeTruthy();
        expect.soft(await homePage.getPageTitle()).toBe('My Account');
        
    });

    test('User login with invalid data', async ({loginPage,testData}) => {
    for(let row of testData){
        await loginPage.doLogin(row.username,row.password);
        expect (await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    }
             
    });

//parallel execution
let testData = CsvHelper.readCSV('src/data/loginData.csv');
for (let row of testData){
        
    
    test(`User login with invalid data with ${row.username}, ${row.password}`, async ({loginPage}) => {
    await loginPage.doLogin(row.username, row.password);
    expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
             
    });
}


let loginxldata = ExcelHelper.readExcel('src/data/OpenCartTestData.xlsx', 'login');
for (let row of loginxldata)
    {        
    
    test(`User login with invalid data with excel ${row.username}..`, async ({loginPage}) => {
    await loginPage.doLogin(row.username, row.password);
    expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
             
    });
}

let jsonData = JsonHelper.readJSON('src/data/login.json');
for (let row of jsonData)
    {        
    
    test(`new test ${row.username}`, async ({loginPage}) => {
        console.log(row.username+ row.password);
    await loginPage.doLogin(row.username, row.password);
    expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
             
    });
}


