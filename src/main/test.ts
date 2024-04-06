const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { executablePath, Page, Puppeteer, Browser } = require('puppeteer');

const account = {
  username: 'bright.figueroa11ca@hotmail.com',
  password: '##1MDgreen##',
};

puppeteer.use(StealthPlugin());
const pathToExtension = require('path').join(__dirname, '2captcha-solver');

export const test = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      `--disable-extensions-except=${pathToExtension}`,
      `--load-extension=${pathToExtension}`,
    ],
    executablePath: executablePath(),
  });

  const [page] = await browser.pages();
  await page.goto(
    'https://www.linkedin.com/checkpoint/rp/request-password-reset',
  );
  await page.type('input[id="username"]', account.username);

  // 现在mainfest.json配置了 会自动解决验证码 这个可以抽出来配置
  //   await page.click('button[id="reset-password-submit-button"]');

  // 插件验证成功后,跳转到输入code的地方
  //   await page.waitForSelector('.input_verification_pin', { timeout: 180000 });

  //   await page.type('.input_verification_pin', '12345');
};
