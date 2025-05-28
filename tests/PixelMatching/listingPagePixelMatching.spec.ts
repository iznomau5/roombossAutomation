import { test, expect, Page } from '@playwright/test'
import { ListingPage } from '../../pages/listingPage.ts'

test.describe.parallel('Pixel Matching Hotel Location On Map', () => {

  test('Listing Search Niseko - 1st June (Happy Path)', async ({ page }) => {
  const listingPage = new ListingPage(page)
  await listingPage.gotoListing({location : 'niseko', startDate: '20250601', nights: '2', guests:'2'})
  
  await page.getByText('Demo Condominium2').click()
  
  await page.waitForTimeout(3 * 1000)

  const heroSection = page.locator('//div[@class="gm-style"]/div/div[2]')
  expect(await heroSection.screenshot()).toMatchSnapshot('DemoCondominium2.png', { maxDiffPixelRatio: 0.05 })
  })

  test('Listing Search Niseko - 1st June (Error Path - Bound to Fail)', async ({ page }) => {
  const listingPage = new ListingPage(page)
  await listingPage.gotoListing({location : 'niseko', startDate: '20250601', nights: '2', guests:'2'})
  
  //await page.getByText('Demo Hotel Lodge2').click()
  await page.getByText('Demo Condominium2').click()
  
  await page.waitForTimeout(3 * 1000)

  const heroSection = page.locator('//div[@class="gm-style"]/div/div[2]')
  expect(await heroSection.screenshot()).toMatchSnapshot('DemoHotelLodge2.png', { maxDiffPixelRatio: 0.05 })
  })
})
