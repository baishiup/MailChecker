import { createRoot } from 'react-dom/client';
import NiceModal from '@ebay/nice-modal-react';
import App from './App';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(
  <NiceModal.Provider>
    <App />
  </NiceModal.Provider>,
);
