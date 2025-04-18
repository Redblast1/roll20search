//https://stackoverflow.com/questions/62452376/scraping-a-table-with-puppeteer-how-can-i-format-each-td-element-as-an-object-p

const puppeteer = require('puppeteer')

puppeteer.launch().then(async function (browser) {
  const page = await browser.newPage()
  await page.goto('https://en.wikipedia.org/wiki/List_of_countries_and_dependencies_by_population')

  const countries = []
  class CountryItem {
    constructor(id, name, population, percentage, date, source) {
      this.id = id
      this.name = name
      this.population = population
      this.percentage = percentage
      this.date = date
      this.source = source
    }
  }
  const tableSelector = '#mw-content-text > div > table > tbody'
  const countriesLength = await page.$$eval(`${tableSelector} > tr`, el => el.length)

  // iterate over tr:nth-child(${i}) on all rows
  for (let i = 1; i < countriesLength + 1; i++) {
    const id = i
    const name = await page.evaluate(el => el.innerText, await page.$(`${tableSelector} > tr:nth-child(${i}) > td:nth-child(2)`))
    const population = await page.evaluate(el => el.innerText, await page.$(`${tableSelector} > tr:nth-child(${i}) > td:nth-child(3)`))
    const percentage = await page.evaluate(el => el.innerText, await page.$(`${tableSelector} > tr:nth-child(${i}) > td:nth-child(4)`))
    const date = await page.evaluate(el => el.innerText, await page.$(`${tableSelector} > tr:nth-child(${i}) > td:nth-child(5)`))
    const source = await page.evaluate(el => el.innerText, await page.$(`${tableSelector} > tr:nth-child(${i}) > td:nth-child(6)`))

    const actualCountryItem = new CountryItem(id, name, population, percentage, date, source)
    countries.push(actualCountryItem)
  }
  console.log(countries)

  await browser.close()
})