
import { test, expect } from '../../src/fixtures/apifixtures';

const TOKEN = process.env.API_TOKEN!;
let AUTH_HEADER = { Authorization: `Bearer ${TOKEN}` };

async function createUser(apiHelper: any) {
    let userData = {
        name: 'Automation',
        email: `API${Date.now()}@pwtest.com`,
        gender: 'female',
        status: 'active'
    };

    let response = await apiHelper.post('/public/v2/users/', userData, AUTH_HEADER);
    expect(response.status).toBe(201);
    return response.body;

}

test('POST API -- create a user', async ({ apiHelper }) => {
    let postResponse = await createUser(apiHelper);
    let getResponse = await apiHelper.get(`/public/v2/users/${postResponse.id}`, AUTH_HEADER)
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.name).toBe('Automation');

})

test('PUT API -- update a user', async ({ apiHelper }) => {
    let postResponse = await createUser(apiHelper);

    let userUpdatedData = {
        name: 'Jasbeen',
        status: 'inactive'
    };

    let putResponse = await apiHelper.put(`/public/v2/users/${postResponse.id}`, userUpdatedData, AUTH_HEADER);
    expect(putResponse.status).toBe(200);
    expect(putResponse.body.name).toBe(userUpdatedData.name);
    expect(putResponse.body.status).toBe(userUpdatedData.status);

    let getResponse = await apiHelper.get(`/public/v2/users/${postResponse.id}`, AUTH_HEADER);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.name).toBe("Jasbeen");

})

test('DELETE API -- delete a user', async ({ apiHelper }) => {
    let postResponse = await createUser(apiHelper);

   let response= await apiHelper.delete(`/public/v2/users/${postResponse.id}`,  AUTH_HEADER);
    expect(response.status).toBe(204);
    
    let getResponse = await apiHelper.get(`/public/v2/users/${postResponse.id}`, AUTH_HEADER);
    expect(getResponse.status).toBe(404);
    expect(getResponse.body.message).toBe("Resource not found");

})


