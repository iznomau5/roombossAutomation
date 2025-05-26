import { test, expect } from '@playwright/test'
import MockAdapter from 'axios-mock-adapter'
import Ajv from 'ajv'
const ajv = new Ajv()

import { apiClient } from '../../utility/api-client.ts'
import { happyPathSchema, notFoundSchema } from '../../resource/getPropertyAvailability-Schema.ts'

/* 
Similar tests for other scenarios too
- Invalid Auth Token
- Missing Auth Token
- Invalid API-Key Or Subscription Key
- Missing API-Key Or Subscription Key
*/


test.describe('Get PropertyAvailability - Happy Path', () => {
  let mock: MockAdapter
  let response

  test.beforeAll(async () => {
    mock = new MockAdapter(apiClient)

    mock.onGet('https://accomdemo2.evoke.jp/extws/widget/hotel/v1/listAvailable?hotelId=8a80818a8820776501882cc00c2c3ab4&checkIn=20250610&checkOut=20250613&numberGuests=3&excludeConditionsNotMet&rate=ota').reply(200, {
    "apiVersion": "1.1",
    "success": true,
    "failureMessage": null,
    "posId": "8a80818a8820776501882cbdaa863a82",
    "checkIn": "2025-06-10",
    "checkOut": "2025-06-13",
    "numberGuests": 3,
    "availableHotels": [
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
                    "available": 6,
                    "unAvailableRatePlans": [
                        {
                            "id": 474548,
                            "minLos": null,
                            "maxLos": null,
                            "minAdv": 60,
                            "maxAdv": null,
                            "closed": null,
                            "closedToArrival": null,
                            "closedToDeparture": null
                        }
                    ]
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
                    "available": 8,
                    "unAvailableRatePlans": [
                        {
                            "id": 474548,
                            "minLos": null,
                            "maxLos": null,
                            "minAdv": 60,
                            "maxAdv": null,
                            "closed": null,
                            "closedToArrival": null,
                            "closedToDeparture": null
                        }
                    ]
                }
            ],
            "bookingPermission": "RESERVATION",
            "availableRoomTypes": [
                {
                    "roomTypeId": "8a80818a8820776501882cc5a64b3dbd",
                    "roomTypeName": "Quad Room",
                    "maxNumberGuests": 4,
                    "numberBedrooms": 1,
                    "numberBathrooms": 1,
                    "maxNumberAdults": 4,
                    "maxNumberChildren": 3,
                    "maxNumberInfants": 3,
                    "quantityAvailable": 6,
                    "priceNumberGuests": 3,
                    "minNights": 0,
                    "ratePlan": {
                        "ratePlanId": 474563,
                        "priceRetail": 66000.0,
                        "mealsIncluded": true,
                        "breakfast": true,
                        "lunch": false,
                        "dinner": false,
                        "rateRestrictionIgnored": false
                    }
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
                    "quantityAvailable": 8,
                    "priceNumberGuests": 3,
                    "minNights": 0,
                    "ratePlan": {
                        "ratePlanId": 474563,
                        "priceRetail": 66000.0,
                        "mealsIncluded": true,
                        "breakfast": true,
                        "lunch": false,
                        "dinner": false,
                        "rateRestrictionIgnored": false
                    }
                }            
            ],
            "bookAndPayEnabled": true,
            "hideRequestIfBookAndPayEnabled": false,
            "widgetBookAndPayEnabled": false
        }
    ]
})

    response = await apiClient.get('https://accomdemo2.evoke.jp/extws/widget/hotel/v1/listAvailable?hotelId=8a80818a8820776501882cc00c2c3ab4&checkIn=20250610&checkOut=20250613&numberGuests=3&excludeConditionsNotMet&rate=ota')
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

test.describe('Get PropertyAvailability - Invalid Hotel ID', () => {
    let mock: MockAdapter
    let response, responseStatus, responseBody

  test.beforeAll(async () => {
    mock = new MockAdapter(apiClient)

    mock.onGet('https://accomdemo2.evoke.jp/extws/widget/hotel/v1/listAvailable?hotelId=8a80818a8820776501882cc00c2c3ab4_invalid&checkIn=20250610&checkOut=20250613&numberGuests=3&excludeConditionsNotMet&rate=ota').reply(404, {
          "statusCode" : 404,
          "errorMessage" : "Hotel with ID: 8a80818a8820776501882cc00c2c3ab4_invalid Not Found"
        })

    try{
        response = await apiClient.get('https://accomdemo2.evoke.jp/extws/widget/hotel/v1/listAvailable?hotelId=8a80818a8820776501882cc00c2c3ab4_invalid&checkIn=20250610&checkOut=20250613&numberGuests=3&excludeConditionsNotMet&rate=ota')
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
    expect(responseBody.errorMessage).toBe('Hotel with ID: 8a80818a8820776501882cc00c2c3ab4_invalid Not Found')
  })  
})

test.describe('Get PropertyAvailability - CheckOut Date Before CheckIn Date', () => {
    let mock: MockAdapter
    let response, responseStatus, responseBody

  test.beforeAll(async () => {
    mock = new MockAdapter(apiClient)

    mock.onGet('https://accomdemo2.evoke.jp/extws/widget/hotel/v1/listAvailable?hotelId=8a80818a8820776501882cc00c2c3ab4&checkIn=20250613&checkOut=20250610&numberGuests=3&excludeConditionsNotMet&rate=ota').reply(404, {
          "statusCode" : 404,
          "errorMessage" : "CheckOut Date Before CheckIn Date"
        })

    try{
        response = await apiClient.get('https://accomdemo2.evoke.jp/extws/widget/hotel/v1/listAvailable?hotelId=8a80818a8820776501882cc00c2c3ab4&checkIn=20250613&checkOut=20250610&numberGuests=3&excludeConditionsNotMet&rate=ota')
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
    expect(responseBody.errorMessage).toBe('CheckOut Date Before CheckIn Date')
  })  
})