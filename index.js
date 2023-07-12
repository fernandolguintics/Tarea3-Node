const puppeteer = require('puppeteer')

async function pruebadeNavegador() {
    const browser = await puppeteer.launch({ headless: false, slowMo:500 })
    const page = await browser.newPage()
    await page.goto('http://example.com')
    await page.waitForSelector('dsdsds')
    await browser.close();
}

pruebadeNavegador()
