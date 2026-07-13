
import { test, expect, request } from "@playwright/test";

let AUTH_TOKEN = { Authorization: 'Bearer 4042f90f03961ddf06a08aedf490ad535eaba22f942cb4972f3bed479a77faff' };

test.skip('get user test', async ({ request }) => {

    let response = await request.get('https://gorest.co.in/public/v2/users/8524088', {
        headers: AUTH_TOKEN
    });

    //console.log(response);
    let jsonbody = await response.json();
    console.log(jsonbody);
    console.log(response.status());
    console.log(response.statusText());
})

test.skip('create user test', async ({ request }) => {

    let userData = {
        name: 'Jasbeen Test',
        email: `jb${Date.now()}@pwtest.com`,
        gender: 'female',
        status: 'active'
    }

    //JS Object to JSON will be done automatically
    let response = await request.post('https://gorest.co.in/public/v2/users', {
        headers: AUTH_TOKEN,
        data: userData
    });

    //console.log(response);
    let jsonbody = await response.json();
    console.log(jsonbody);
    console.log(response.status());
    console.log((response.statusText()));
})

test.skip('Update user test', async ({ request }) => {

    let userData = {
        name: 'Jasbeen Test',
        email: `jb${Date.now()}@pwtest.com`,
        gender: 'female',
        status: 'active'
    }

    //JS Object to JSON will be done automatically
    let response = await request.put('https://gorest.co.in/public/v2/users/8524810', {
        headers: AUTH_TOKEN,
        data: userData
    });

    //console.log(response);
    let jsonbody = await response.json();
    console.log(jsonbody);
    console.log(response.status());
    console.log((response.statusText()));
})

test.skip('delete user test', async ({ request }) => {

    let response = await request.delete('https://gorest.co.in/public/v2/users/8524803', {
        headers: AUTH_TOKEN
    });

    //console.log(response);
    //let jsonbody = await response.json();
    //console.log(jsonbody);
    console.log(response.status());
    console.log(response.statusText());
})