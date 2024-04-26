import { BrowserWindow, ipcMain } from 'electron';
import { runSchedule } from './schedule';

export const ipcHandler = (mainWindow: BrowserWindow) => {
  ipcMain.on('runSchedule', (event, data) => {
    runSchedule(data);
  });

  ipcMain.on('stopSchedule', () => {
    console.log('stop');
  });
};
