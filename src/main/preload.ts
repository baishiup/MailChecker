// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer } from 'electron';

export type Channels = 'ipc-example';

const electronHandler = {
  ipcRenderer: {
    runSchedule(
      data: {
        username: string;
        password: string;
      }[],
    ) {
      ipcRenderer.send('runSchedule', data);
    },
    stopSchedule() {
      ipcRenderer.send('stopSchedule');
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
