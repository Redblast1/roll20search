

const puppeteer = require('puppeteer');

  puppeteer.launch({
    devtools: true,
    defaultViewport: {
      width: 1280,
      height: 1024,
    },
    headless: false,
  }).then(async function (browser) {
    const page = await browser.newPage()
    await page.goto('https://app.roll20.net/lfg/search/?days=&dayhours=&frequency=&timeofday=&timeofday_seconds=&language=Any&avpref=Any&gametype=Any&newplayer=false&yesmaturecontent=true&nopaytoplay=false&playingstructured=&sortby=relevance&for_event=&roll20con=')

  // roll20 lfg page with only the option for 18+ mature games, so that all types of games display
  // without this, in testing, looked to leave off 10~ pages of listings
  

  // Creating a class for a listing object to store all of the types of data
  const listings = []
  class ListingItem {
    constructor() {
        this.id = id
        this.author = author
        this.title = title  
    }
  } 

//table.table:nth-child(1) > tbody:nth-child(2)
const tableSelector = 'table.table:nth-child(1) > tbody:nth-child(2)'
const listingsLength = await page.$$eval(`${tableSelector} > tr`, el => el.length)

console.log(listingsLength)


//await browser.close();
})