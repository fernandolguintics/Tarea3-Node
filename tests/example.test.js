const puppeteer = require('puppeteer')
const expect = require('chai').expect

describe('Agregar producto al carrito de Amazon', () => {
  let browser, page

  before(async () => {
    browser = await puppeteer.launch({ headless: false })
    page = await browser.newPage()
    await page.goto('https://www.amazon.com.mx/')
  })
  after(async () => {
    await browser.close()
  })

  it('Validar precio del carrito', async () => {
    await page.click('#nav-xshop > a:nth-child(4)')
    var seleccionarProducto = await page.waitForXPath(
      '(//*[@id="B07TGSH6MF"]/a[2]/span/div)'
    )
    await seleccionarProducto.click()
    await new Promise((r) => setTimeout(r, 5000))
    const obtenerPrecioProducto = await page.$(
      '#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-none.aok-align-center > span.a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay > span.a-offscreen'
    )
    const precioProducto = await (
      await obtenerPrecioProducto.getProperty('textContent')
    ).jsonValue()
    await page.click('#add-to-cart-button')
    await new Promise((r) => setTimeout(r, 5000))
    const obtenerPrecioProductoCarrito = await page.$(
      '#sw-subtotal > span:nth-child(2) > span > span.a-offscreen'
    )
    const precioProductoCarrito = await (
      await obtenerPrecioProductoCarrito.getProperty('textContent')
    ).jsonValue()
    expect(precioProducto).to.be.equals(precioProductoCarrito)
  })
})
