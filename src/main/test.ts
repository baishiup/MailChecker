import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { executablePath, Page, Puppeteer, Browser } from 'puppeteer';
import path from 'path';

const account = {
  username: 'bright.figueroa11ca@hotmail.com',
  password: '##1MDgreen##',
};

puppeteer.use(StealthPlugin());

export const test = async () => {
  // 可以调用的时候去改 mainfest 配置
  const pathToExtension = path.join(__dirname, '2captcha-solver');
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
