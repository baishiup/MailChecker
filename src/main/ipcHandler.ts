import { BrowserWindow, ipcMain, app, session } from 'electron';
import path from 'path';
import { executablePath, Page, Puppeteer, Browser } from 'puppeteer';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { runSchedule } from './schedule';

puppeteer.use(StealthPlugin());

export const ipcHandler = (mainWindow: BrowserWindow) => {
  ipcMain.on('runSchedule', (event, data) => {
    runSchedule(data);
  });

  ipcMain.on('stopSchedule', () => {
    console.log('stop');
  });

  // 通过puppeteer打开
  ipcMain.on('openSubUrl', async (e, url) => {
    const RESOURCES_PATH = app.isPackaged
      ? path.join(process.resourcesPath, 'assets')
      : path.join(__dirname, '../../assets');

    const getAssetPath = (...paths: string[]): string => {
      return path.join(RESOURCES_PATH, ...paths);
    };
    const pathToExtension = getAssetPath('extensions/tran');
    const browser = await puppeteer.launch({
      headless: false,
      args: [
        `--app=${url}`, // 通过这个隐藏地址栏
        `--disable-extensions-except=${pathToExtension}`,
        `--load-extension=${pathToExtension}`,
      ],
      executablePath: executablePath(),
    });

    // const [page] = await browser.pages();
    // await page.goto(url);
  });

  // 通过electron打开
  // 插件无法加载
  // ipcMain.on('openSubUrl', async (e, url) => {
  //   const subPage = new BrowserWindow({
  //     width: 900,
  //     height: 600,
  //     show: true,
  //     fullscreen: false,
  //     webPreferences: {
  //       sandbox: true,
  //       partition: `window-${Date.now()}`, // 独立session
  //       //   preload: app.isPackaged
  //       //     ? path.join(__dirname, 'preload.js')
  //       //     : path.join(__dirname, '../../.erb/dll/preload.js'),
  //     },
  //   });
  //   subPage.loadURL(url);
  // });
};
