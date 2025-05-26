import { test, expect } from '@playwright/test'
import MockAdapter from 'axios-mock-adapter'
import Ajv from 'ajv'
const ajv = new Ajv()

import { apiClient } from '../../utility/api-client.ts'
import { happyPathSchema, notFoundSchema } from '../../resource/getPropertiesByLocationCode-Schema.ts'

/* 
Similar tests for other scenarios too
- Invalid Auth Token
- Missing Auth Token
- Invalid API-Key Or Subscription Key
- Missing API-Key Or Subscription Key
*/


test.describe('Get PropertiesByLocationCode - Happy Path (NISEKO)', () => {
  let mock: MockAdapter
  let response

  test.beforeAll(async () => {
    mock = new MockAdapter(apiClient)

    mock.onGet('https://accomdemo2.evoke.jp/extws/widget/hotel/v1/list/ii?countryCode=jp&locationCode=NISEKO').reply(200, {
    "apiVersion": "1.1",
    "hotels": [
        {
            "url": "",
            "vendorType": "ACCOMMODATION",
            "countryCode": "JP",
            "locationCode": "NISEKO",
            "latitude": 42.84052114506246,
            "longitude": 140.651675166237,
            "currencyCode": "JPY",
            "hotelId": "8a80818a8820776501882cbf070a3a8e",
            "hotelName": "Demo Chalet2",
            "hotelUrl": "",
            "internalInventory": true,
            "posManaged": true,
            "recordGuestType": true,
            "maxAgeChildren": 12,
            "maxAgeInfants": 2,
            "roomTypes": []
        },
        {
            "url": "google.com",
            "vendorType": "ACCOMMODATION",
            "countryCode": "JP",
            "locationCode": "NISEKO",
            "latitude": 42.85903993906759,
            "longitude": 140.70489125866138,
            "currencyCode": "JPY",
            "hotelId": "8a80818a8820776501882cbfb13c3aa3",
            "hotelName": "Demo Condominium2",
            "hotelUrl": "google.com",
            "internalInventory": true,
            "posManaged": true,
            "recordGuestType": true,
            "maxAgeChildren": 12,
            "maxAgeInfants": 2,
            "roomTypes": [
                {
                    "roomTypeId": "8a80818a8820776501882cbfb13c3aa4",
                    "roomTypeName": "Studio",
                    "maxNumberGuests": 3,
                    "numberBedrooms": 1,
                    "numberBathrooms": 1,
                    "maxNumberAdults": 3,
                    "maxNumberChildren": 2,
                    "maxNumberInfants": 2,
                    "unAvailableRatePlans": []
                },
                {
                    "roomTypeId": "8a80818a8820776501882cc3a4c73ae2",
                    "roomTypeName": "Two Bedroom",
                    "maxNumberGuests": 5,
                    "numberBedrooms": 2,
                    "numberBathrooms": 2,
                    "maxNumberAdults": 5,
                    "maxNumberChildren": 4,
                    "maxNumberInfants": 4,
                    "unAvailableRatePlans": []
                }
            ]
        },
        {
            "url": "yoshimotohouse.co.jp",
            "vendorType": "ACCOMMODATION",
            "countryCode": "JP",
            "locationCode": "NISEKO",
            "latitude": 42.86293661468353,
            "longitude": 140.77336483009876,
            "currencyCode": "JPY",
            "hotelId": "8a80818a8820776501882cc00c2c3ab4",
            "hotelName": "Demo Hotel Lodge2",
            "hotelUrl": "yoshimotohouse.co.jp",
            "internalInventory": true,
            "posManaged": true,
            "recordGuestType": true,
            "maxAgeChildren": 12,
            "maxAgeInfants": 2,
            "roomTypes": [
                {
                    "roomTypeId": "8a80818a8820776501882cc5a64b3dbd",
                    "roomTypeName": "Quad Room",
                    "maxNumberGuests": 4,
                    "numberBedrooms": 1,
                    "numberBathrooms": 1,
                    "maxNumberAdults": 4,
                    "maxNumberChildren": 3,
                    "maxNumberInfants": 3,
                    "unAvailableRatePlans": []
                },
                {
                    "roomTypeId": "8a80818a8820776501882cc00c2d3ab5",
                    "roomTypeName": "Double Room",
                    "maxNumberGuests": 2,
                    "numberBedrooms": 1,
                    "numberBathrooms": 1,
                    "maxNumberAdults": 2,
                    "maxNumberChildren": 0,
                    "maxNumberInfants": 1,
                    "unAvailableRatePlans": []
                }
            ]
        }
    ]
    })

    response = await apiClient.get('https://accomdemo2.evoke.jp/extws/widget/hotel/v1/list/ii?countryCode=jp&locationCode=NISEKO')
  })

  test('Validate Status Code to be 200', async() => {
    expect(response.status).toBe(200)
  })

  test('Schema validation', async () => {
    const userSchema = happyPathSchema

    const validate = ajv.compile(userSchema)
    const valid = validate(response.data)
    expect(valid).toBe(true)

    if (!valid) console.error(validate.errors)
  })
})

test.describe('Get PropertiesByLocationCode - Not Found (TOKYO)', () => {
    let mock: MockAdapter
    let response, responseStatus, responseBody

  test.beforeAll(async () => {
    mock = new MockAdapter(apiClient)

    mock.onGet('https://accomdemo2.evoke.jp/extws/widget/hotel/v1/list/ii?countryCode=jp&locationCode=TOKYO').reply(404, {
          "statusCode" : 404,
          "errorMessage" : "Not Found"
        })

    try{
        response = await apiClient.get('https://accomdemo2.evoke.jp/extws/widget/hotel/v1/list/ii?countryCode=jp&locationCode=TOKYO')
    } catch(ex)
    {
        responseStatus = ex.response?.status
        responseBody = ex.response?.data
    }
    
  })

  test('Validate Status Code to be 404', async() => {
    expect(responseStatus).toBe(404)
  })

  test('Schema validation', async () => {
    const userSchema = notFoundSchema

    const validate = ajv.compile(userSchema)
    const valid = validate(responseBody)
    expect(valid).toBe(true)

    if (!valid) console.error(validate.errors)
  })

  test('Verify Error Message in Response Body', async () => {
    expect(responseBody.errorMessage).toBe('Not Found')
  })  
})

test.describe('Get PropertiesByLocationCode - Invalid Country Code (jp1)', () => {
    let mock: MockAdapter
    let response, responseStatus, responseBody

  test.beforeAll(async () => {
    mock = new MockAdapter(apiClient)

    mock.onGet('https://accomdemo2.evoke.jp/extws/widget/hotel/v1/list/ii?countryCode=jp1&locationCode=NISEKO').reply(404, {
          "statusCode" : 404,
          "errorMessage" : "Invalid Country Code"
        })

    try{
        response = await apiClient.get('https://accomdemo2.evoke.jp/extws/widget/hotel/v1/list/ii?countryCode=jp1&locationCode=NISEKO')
    } catch(ex)
    {
        responseStatus = ex.response?.status
        responseBody = ex.response?.data
    }
    
  })

  test('Validate Status Code to be 404', async() => {
    expect(responseStatus).toBe(404)
  })

  test('Schema validation', async () => {
    const userSchema = notFoundSchema

    const validate = ajv.compile(userSchema)
    const valid = validate(responseBody)
    expect(valid).toBe(true)

    if (!valid) console.error(validate.errors)
  })

  test('Verify Error Message in Response Body', async () => {
    expect(responseBody.errorMessage).toBe('Invalid Country Code')
  })  
})

test.describe('Get PropertiesByLocationCode - Invalid Location Code (TAKYO)', () => {
    let mock: MockAdapter
    let response, responseStatus, responseBody

  test.beforeAll(async () => {
    mock = new MockAdapter(apiClient)

    mock.onGet('https://accomdemo2.evoke.jp/extws/widget/hotel/v1/list/ii?countryCode=jp&locationCode=TAKYO').reply(404, {
          "statusCode" : 404,
          "errorMessage" : "Invalid Location Code"
        })

    try{
        response = await apiClient.get('https://accomdemo2.evoke.jp/extws/widget/hotel/v1/list/ii?countryCode=jp&locationCode=TAKYO')
    } catch(ex)
    {
        responseStatus = ex.response?.status
        responseBody = ex.response?.data
    }
    
  })

  test('Validate Status Code to be 404', async() => {
    expect(responseStatus).toBe(404)
  })

  test('Schema validation', async () => {
    const userSchema = notFoundSchema

    const validate = ajv.compile(userSchema)
    const valid = validate(responseBody)
    expect(valid).toBe(true)

    if (!valid) console.error(validate.errors)
  })

  test('Verify Error Message in Response Body', async () => {
    expect(responseBody.errorMessage).toBe('Invalid Location Code')
  })  
})

test.describe('Get PropertiesByLocationCode - Missing Country Code Request Parameter', () => {
    let mock: MockAdapter
    let response, responseStatus, responseBody

  test.beforeAll(async () => {
    mock = new MockAdapter(apiClient)

    mock.onGet('https://accomdemo2.evoke.jp/extws/widget/hotel/v1/list/ii?locationCode=NISEKO').reply(400, {
          "statusCode" : 400,
          "errorMessage" : "Bad Request"
        })

    try{
        response = await apiClient.get('https://accomdemo2.evoke.jp/extws/widget/hotel/v1/list/ii?locationCode=NISEKO')
    } catch(ex)
    {
        responseStatus = ex.response?.status
        responseBody = ex.response?.data
    }
    
  })

  test('Validate Status Code to be 404', async() => {
    expect(responseStatus).toBe(400)
  })

  test('Schema validation', async () => {
    const userSchema = notFoundSchema

    const validate = ajv.compile(userSchema)
    const valid = validate(responseBody)
    expect(valid).toBe(true)

    if (!valid) console.error(validate.errors)
  })

  test('Verify Error Message in Response Body', async () => {
    expect(responseBody.errorMessage).toBe('Bad Request')
  })  
})

test.describe('Get PropertiesByLocationCode - Missing Location Code Request Parameter', () => {
    let mock: MockAdapter
    let response, responseStatus, responseBody

  test.beforeAll(async () => {
    mock = new MockAdapter(apiClient)

    mock.onGet('https://accomdemo2.evoke.jp/extws/widget/hotel/v1/list/ii?countryCode=jp').reply(400, {
          "statusCode" : 400,
          "errorMessage" : "Bad Request"
        })

    try{
        response = await apiClient.get('https://accomdemo2.evoke.jp/extws/widget/hotel/v1/list/ii?countryCode=jp')
    } catch(ex)
    {
        responseStatus = ex.response?.status
        responseBody = ex.response?.data
    }
    
  })

  test('Validate Status Code to be 404', async() => {
    expect(responseStatus).toBe(400)
  })

  test('Schema validation', async () => {
    const userSchema = notFoundSchema

    const validate = ajv.compile(userSchema)
    const valid = validate(responseBody)
    expect(valid).toBe(true)

    if (!valid) console.error(validate.errors)
  })

  test('Verify Error Message in Response Body', async () => {
    expect(responseBody.errorMessage).toBe('Bad Request')
  })  
})

test.describe('Get PropertiesByLocationCode - Missing Both Country and Location Code Request Parameter', () => {
    let mock: MockAdapter
    let response, responseStatus, responseBody

  test.beforeAll(async () => {
    mock = new MockAdapter(apiClient)

    mock.onGet('https://accomdemo2.evoke.jp/extws/widget/hotel/v1/list/ii').reply(400, {
          "statusCode" : 400,
          "errorMessage" : "Bad Request"
        })

    try{
        response = await apiClient.get('https://accomdemo2.evoke.jp/extws/widget/hotel/v1/list/ii')
    } catch(ex)
    {
        responseStatus = ex.response?.status
        responseBody = ex.response?.data
    }
    
  })

  test('Validate Status Code to be 404', async() => {
    expect(responseStatus).toBe(400)
  })

  test('Schema validation', async () => {
    const userSchema = notFoundSchema

    const validate = ajv.compile(userSchema)
    const valid = validate(responseBody)
    expect(valid).toBe(true)

    if (!valid) console.error(validate.errors)
  })

  test('Verify Error Message in Response Body', async () => {
    expect(responseBody.errorMessage).toBe('Bad Request')
  })  
})