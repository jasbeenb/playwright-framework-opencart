
import {test as baseTest} from "@playwright/test"
import { APIHelper } from "../api/APIHelper"

type APIFixtures = {
apiHelper: APIHelper;
}

export let test = baseTest.extend<APIFixtures>({
apiHelper: async({request}, use)=> {
    let apiHelper = new APIHelper(
        request,
        process.env.API_BASE_URL!
    );
    await use(apiHelper);
}

});

export {expect} from '@playwright/test'