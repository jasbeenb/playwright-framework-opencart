//schema - type of response data
//producer generates data and consumer consumes data
//data is given according to contract
// third party - ajv for schema validation - node library

//1. single object


import { test, expect } from '../../src/fixtures/apifixtures';
import Ajv from 'ajv';

let TOKEN = process.env.API_TOKEN;
let AUTH_HEADER = { Authorization: `Bearer ${TOKEN}` };

//setup the ajv
let ajv = new Ajv();

//define json schema:

let userSchema = {
    "type": "object",
    "properties": {
        "id": {
            "type": "number"
        },
        "name": {
            "type": "string"
        },
        "email": {
            "type": "string"
        },
        "gender": {
            "type": "string"
        },
        "status": {
            "type": "string"
        }
    },
    "required": [
        "id",
        "name",
        "email",
        "gender",
        "status"
    ]
};

let userArraysSchema = {
    "type": "array",
    "items": userSchema
}

test.skip('GET -- get a user', async({apiHelper}) => {
    let userData =
{
    name: 'schema test',
    email: `automation_${Date.now()}@open.com`,
    gender: 'female',
    status: 'active'
}
    let createUser = await apiHelper.post("/public/v2/users", userData,AUTH_HEADER);
    let userId = createUser.body.id;

   let userResponse = await apiHelper.get(`/public/v2/users/${userId}`, AUTH_HEADER);
   expect(userResponse.status).toBe(200);

  let validate = ajv.compile(userSchema);
  let isSchemaValid = validate(userResponse.body);
  if(!isSchemaValid){
    console.log("Schema Errors: ", validate.errors);
  }
  expect(isSchemaValid).toBeTruthy();
    
})


//array
test.skip('GET -- get all users', async({apiHelper}) => {

   let usersResponse = await apiHelper.get(`/public/v2/users`, AUTH_HEADER);
   expect(usersResponse.status).toBe(200);

  let validate = ajv.compile(userArraysSchema);
  let isSchemaValid = validate(usersResponse.body);
  if(!isSchemaValid){
    console.log("Schema Errors: ", validate.errors);
  }
  expect(isSchemaValid).toBeTruthy();
    
})

