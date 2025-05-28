import { Locator, Page, expect } from '@playwright/test'
import { BasePage } from '../utility/basePage.ts'

export class ListingPage extends BasePage {

    private readonly hotelCard : string
    private readonly propertyList : string
    private readonly propertyName : string
    private readonly propertyDescription : string
    private readonly propertyPrice : string
    private readonly privacyPopUpDismissBTN : string
    private readonly noSearchLocationErrorMessage : string

    private readonly widgetGuestCount : string

  constructor(page: Page) {
    super(page)
    
    this.propertyList = 'div[class="search-results ng-tns-c793298974-1"]'
    this.hotelCard = 'div[class="search-results ng-tns-c793298974-1"] app-search-card'
    this.propertyName = 'h4[class="search-card-title"]'
    this.propertyDescription = 'p[class="search-card-desc"]'
    this.propertyPrice = 'div[class="search-card-actions"] span[class="price"]'
    this.privacyPopUpDismissBTN = 'button[id="dismissBtn"]'
    this.noSearchLocationErrorMessage = 'h2[id="mat-dialog-title-1"] div'

    this.widgetGuestCount = 'div[id="mat-select-value-1"] span span'
  }

  async gotoListing(params?: {
    location?: string,
    startDate?: string,
    nights?:string,
    guests?:string
  }){
    let URL = 'https://accomdemo2.evoke.jp/search'

    if (params?.location && params?.startDate && params.nights && params.guests) {
      let URL = `https://accomdemo2.evoke.jp/search?loc=${params?.location}&ci=${params.startDate}&n=${params?.nights}&g=${params.guests}`
      await this.page.goto(URL, {waitUntil : 'networkidle'})
    } else if(params?.location && params.nights && params.guests){
      let URL = `https://accomdemo2.evoke.jp/search?loc=${params?.location}&ci=${params.startDate}&g=${params.guests}`
      await this.page.goto(URL, {waitUntil : 'networkidle'})
    } else if(params?.location && params?.nights && params.nights){
      let URL = `https://accomdemo2.evoke.jp/search?loc=${params?.location}&ci=${params.startDate}&n=${params?.nights}`
      await this.page.goto(URL, {waitUntil : 'networkidle'})
    } else {
      let URL = `https://accomdemo2.evoke.jp/search`
      await this.page.goto(URL, {waitUntil : 'networkidle'})
    }
  }

  async checkPrivacyPopup(){
    try{
      (await this.page.waitForSelector(this.privacyPopUpDismissBTN)).click()
    } catch(ex){
      console.log('Privacy Pop-up Not Found')
    }
  }

  async getPropertyCount(){
    return await this.page.evaluate(() => {
      let element =  document.querySelectorAll('app-search-card') as NodeList
      return element.length
    })
    
  }

  async getPropertyNames(){
    return await this.page.evaluate((propertyName) => {
      let element = document.querySelectorAll(propertyName)
      return Array.from(element).map(el => (el as HTMLElement).innerText)
    }, this.propertyName)
  }

  async getPropertyDescription(){
    return await this.page.evaluate((propertyDescription) => {
      let element = document.querySelectorAll(propertyDescription)
      return Array.from(element).map(el => (el as HTMLElement).innerText)
    }, this.propertyDescription)
  }

  async getPropertyPrices(){
    return await this.page.evaluate((propertyPrice) => {
      let element = document.querySelectorAll(propertyPrice)
      return Array.from(element).map(el => (el as HTMLElement).innerText)
    }, this.propertyPrice)
  }

  async verifyNoSearchLocationPopup(){
    return await this.page.evaluate((noSearchLocationErrorMessage) => {
      let popUpHeading = document.querySelector(noSearchLocationErrorMessage) as HTMLElement
      return popUpHeading.innerText
    }, this.noSearchLocationErrorMessage)
  }

  async getGuestCountFromWidget(){
    return await this.page.evaluate((widgetGuestCount) => {
      let count =  document.querySelector(widgetGuestCount) as HTMLElement
      return count.innerText
    }, this.widgetGuestCount)
  }
}