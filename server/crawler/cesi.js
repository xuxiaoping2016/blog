// const puppeteer = require('puppeteer');

// const url = "https://movie.douban.com/tag/#/?sort=U&range=0,10&tags="

// const l = "%E4%B8%AD%E5%9B%BD%E5%A4%A7%E9%99%86"
const puppeteer = require('puppeteer')

const url = `https://movie.douban.com/tag/#/?sort=R&range=6,10&tags=`

const sleep = time => new Promise(resolve => {
  setTimeout(resolve, time)
})

;(async () => {
  console.log('Start visit the target page')

  const browser = await puppeteer.launch({devtools: true})

  const page = await browser.newPage()
  await page.goto('https://www.baidu.com/', {
    waitUntil: 'networkidle2'
  })

  await page.focus('#kw');
  await page.keyboard.type('hello');
await page.tap('input[type="submit"]')
//   browser.close()
})()