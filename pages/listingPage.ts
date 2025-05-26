import { Locator, Page, expect } from '@playwright/test'
import { BasePage } from '../utility/basePage.ts'

export class ListingPage extends BasePage {

    private readonly hotelCard : string
    private readonly propertyList : string
    private readonly privacyPopUpDismissBTN : string

  constructor(page: Page) {
    super(page)
    
    this.propertyList = 'div[class="search-results ng-tns-c793298974-1"]'
    this.hotelCard = 'div[class="search-results ng-tns-c793298974-1"] app-search-card'
    this.privacyPopUpDismissBTN = 'button[id="dismissBtn"]'
  }

  async gotoListing(location, nights, startDate, guests) {
    let URL = `https://accomdemo2.evoke.jp/search?loc=${location}&ci=${startDate}&n=${nights}&g=${guests}`
    await this.page.goto(URL, {waitUntil : 'networkidle'})
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
    return await this.page.evaluate(() => {
      let element = document.querySelectorAll('h4[class="search-card-title"]')
      return Array.from(element).map(el => (el as HTMLElement).innerText)
    })
  }

  async getPropertyDescription(){
    return await this.page.evaluate(() => {
      let element = document.querySelectorAll('p[class="search-card-desc"]')
      return Array.from(element).map(el => (el as HTMLElement).innerText)
    })
  }

  async getPropertyPrices(){
    return await this.page.evaluate(() => {
      let element = document.querySelectorAll('div[class="search-card-actions"] span[class="price"]')
      return Array.from(element).map(el => (el as HTMLElement).innerText)
    })
  }
}