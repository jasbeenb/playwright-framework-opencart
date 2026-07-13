

import {test, expect} from '../../src/fixtures/apifixtures';

const TOKEN = process.env.API_TOKEN!;
let AUTH_HEADER = {Authorization: `Bearer ${TOKEN}`};

let userID: number;


test.describe.serial('running in sequential mode',()=>{
test.skip('GET API -- get all users',async({apiHelper})=>{
   let response =await apiHelper.get('/public/v2/users', AUTH_HEADER);
   expect(response.status).toBe(200);
   expect(response.body.length).toBeGreaterThan(0);
})

test.skip('POST API -- create a user',async({apiHelper})=>{
    let userData = {
        name: 'Automation',
        email: `API${Date.now()}@pwtest.com`,
        gender: 'female',
        status: 'active'
    };
   let response =await apiHelper.post('/public/v2/users',userData, AUTH_HEADER);
   expect(response.status).toBe(201);
   expect(response.body.name).toBe(userData.name);
   userID = response.body.id;
  
})

test.skip('PUT API -- update a user',async({apiHelper})=>{
    let userUpdatedData = {
        name: 'Automation Updated',
        status: 'inactive'
    };
   let putresponse =await apiHelper.put(`/public/v2/users/${userID}`,userUpdatedData, AUTH_HEADER);
   expect(putresponse.status).toBe(200);
   expect(await putresponse.body.name).toBe(userUpdatedData.name);
   expect(await putresponse.body.status).toBe(userUpdatedData.status)
})

test.skip('DELETE API -- delete user',async({apiHelper})=>{
   let response =await apiHelper.delete(`/public/v2/users/${userID}`, AUTH_HEADER);
   expect(response.status).toBe(204);
})


})