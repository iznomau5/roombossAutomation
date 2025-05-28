import MockAdapter from 'axios-mock-adapter'
import jsonpath from 'jsonpath'

import { test, expect, Page } from '@playwright/test'
import { ListingPage } from '../../pages/listingPage.ts'
import { apiClient } from '../../utility/api-client.ts'
import { parseYenPrice } from '../../utility/util.ts'

test.describe.parallel('Listing Page with URL Manipulation', () => {

  test('Listing Search Niseko - June (One Property is Booked)', async ({ page }) => {
    const listingPage = new ListingPage(page)
    await listingPage.gotoListing({location : 'niseko', startDate: '20250609', nights: '2', guests:'2'})
    await listingPage.checkPrivacyPopup()
    expect(await listingPage.getPropertyCount()).toBe(1)
  })

  test('Listing Search Niseko - July (Both Properties are Available)', async ({ page }) => {
    const listingPage = new ListingPage(page)
    await listingPage.gotoListing({location : 'niseko', startDate: '20250715', nights: '7', guests:'5'})
    await listingPage.checkPrivacyPopup()
    expect(await listingPage.getPropertyCount()).toBe(2)
  })

  test('Verify July Prices are Higher Than June Prices', async ({page}) => {
    const listingPage = new ListingPage(page)
    await listingPage.gotoListing({location : 'niseko', startDate: '20250615', nights: '3', guests:'3'})
    let propertyPriceJune = await listingPage.getPropertyPrices()
    await listingPage.gotoListing({location : 'niseko', startDate: '20250715', nights: '3', guests:'3'})
    let propertyPriceJuly = await listingPage.getPropertyPrices()

    const junePricesParsed = propertyPriceJune.map(parseYenPrice)
    const julyPricesParsed = propertyPriceJuly.map(parseYenPrice)

    for (let i = 0; i < junePricesParsed.length; i++) {
      expect(junePricesParsed[i]).toBeLessThan(julyPricesParsed[i])
    }
  })

  test('Verify "No Search Location" error message /w zero parameters', async ({page}) => {
    const listingPage = new ListingPage(page)
    await listingPage.gotoListing()
    expect(await listingPage.verifyNoSearchLocationPopup()).toBe('No Search Location')
  })

  test('Verify Default Value for Nights', async ({page}) => {
    const listingPage = new ListingPage(page)
    await listingPage.gotoListing({location : 'niseko', startDate: '20250620', guests:'5'})
    expect(await listingPage.getGuestCountFromWidget()).toBe('2')
  })
})


test.describe.parallel('Listing Page Data Validation with APIs', () => {

  let mock: MockAdapter
  let response

  test.beforeAll(async () => {
      mock = new MockAdapter(apiClient)
  
      mock.onGet('https://accomdemo2.evoke.jp/extws/widget/hotel/v1/listDescription?locale=en&hotelId=8a80818a8820776501882cbfb13c3aa3&hotelId=8a80818a8820776501882cc00c2c3ab4').reply(200, {
      "apiVersion": "1.1",
      "success": true,
      "failureMessage": null,
      "posId": "8a80818a8820776501882cbdaa863a82",
      "locale": "en",
      "hotels": [
          {
              "hotelId": "8a80818a8820776501882cbfb13c3aa3",
              "hotelName": "Demo Condominium2",
              "hotelDescription": "RESIDENCE WITH BEAUTIFUL MOUNTAIN VIEW! Make the greatest choice for your holidays by staying in our residence Demo Condominium. In a privileged environment, you will be able to enjoy a high level of comfort in our fully equipped 45 sqm apartment. East facing. Included services: sheets and towels, final cleaning and a garage space. WIFI.",
              "roomTypes": [
                  {
                      "roomTypeId": "8a80818a8820776501882cbfb13c3aa4",
                      "roomTypeName": "Studio",
                      "roomTypeDescription": "Cosy studio with a good atmosphere.Living-room with TV and balcony facing NORTH-EAST, MOUNTAIN view.Fully-equipped and open-plan kitchen on dining-room with ceramic hob, multi-function oven, dishwasher, refrigerator, toaster, electric kettle, filter coffee machine.3 Bedroom.1 Bathroom with dry towel and toilets.\n"
                  },
                  {
                      "roomTypeId": "8a80818a8820776501882cc3a4c73ae2",
                      "roomTypeName": "Two Bedroom",
                      "roomTypeDescription": "Cosy studio with a good atmosphere.Living-room with TV and balcony facing NORTH-EAST, MOUNTAIN view.a small kitchen on dining-room with ceramic hob, multi-function oven, dishwasher, refrigerator, toaster, electric kettle, filter coffee machine.2 Bedroom.1 Bathroom with dry towel and toilets.\n"
                  }
              ]
          },
          {
              "hotelId": "8a80818a8820776501882cc00c2c3ab4",
              "hotelName": "Demo Hotel Lodge2",
              "hotelDescription": "RESIDENCE WITH A BEAUTIFUL VIEW makes the greatest choice for your holidays by staying in our Lodge. In a privileged environment, you will be able to enjoy a high level of comfort in our fully equipped 106 sqm apartment for 8 guests with an outstanding panoramic view on the mountain. West facing. Included services: sheets and towels, final cleaning and a garage space. WIFI.\n",
              "roomTypes": [
                  {
                      "roomTypeId": "8a80818a8820776501882cc5a64b3dbd",
                      "roomTypeName": "Quad Room",
                      "roomTypeDescription": "Cosy studio with a good atmosphere.Living-room with TV and balcony facing SOUTH-EAST, MOUNTAIN view.Fully-equipped and open-plan kitchen on dining-room with ceramic hob, multi-function oven, dishwasher, refrigerator, toaster, electric kettle, filter coffee machine. 2 Bedroom for 4 people.1 Bathroom with dry towel and toilets.\n"
                  },
                  {
                      "roomTypeId": "8a80818a8820776501882cc00c2d3ab5",
                      "roomTypeName": "Double Room",
                      "roomTypeDescription": "Cosy studio with a good atmosphere.Living-room with TV and balcony facing SOUTH-EAST, MOUNTAIN view.a small kitchen on dining-room with ceramic hob, multi-function oven, dishwasher, refrigerator, toaster, electric kettle, filter coffee machine. A double Bedroom. 1 Bathroom with dry towel and toilets.\n"
                  }
              ]
          }
      ]
})
  
      response = await apiClient.get('https://accomdemo2.evoke.jp/extws/widget/hotel/v1/listDescription?locale=en&hotelId=8a80818a8820776501882cbfb13c3aa3&hotelId=8a80818a8820776501882cc00c2c3ab4')
    })

  test('Verify Description of Available Properties /w API Fetching Data', async ({page}) => {
    const listingPage = new ListingPage(page)
    await listingPage.gotoListing({location : 'niseko', startDate: '20250715', nights: '7', guests:'5'})
    await listingPage.checkPrivacyPopup()
    const propertyNames = await listingPage.getPropertyNames()
    const propertyDescription = await listingPage.getPropertyDescription()

    const propertyDescriptionAPI = propertyNames.map(name => {
      const result = jsonpath.query(response.data, `$.hotels[?(@.hotelName=="${name}")].hotelDescription`)
      return result[0]
    })
    const normalize = (arr: string[]) => arr.map(item => item.trim())

    const propertyDescriptionNormalized = normalize(propertyDescription)
    const propertyDescriptionAPINormalized = normalize(propertyDescriptionAPI)
    expect(propertyDescriptionNormalized).toEqual(propertyDescriptionAPINormalized)

  })
})
