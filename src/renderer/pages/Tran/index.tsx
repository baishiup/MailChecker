import { Button, Col, Row } from 'antd';
import { useState } from 'react';

const tabs = [
  { name: 'telegram', url: 'https://web.telegram.org/a/' },
  { name: 'x', url: 'https://x.com/' },
  { name: 'ps', url: 'https://www.playstation.com/en-us/' },
];
export function Tran() {
  const open = (url: string) => {
    window.electron.ipcRenderer.openSubUrl(url);
  };

  return (
    <div>
      {tabs.map((x, i) => (
        <Button
          key={i}
          type="primary"
          onClick={() => open(x.url)}
          style={{ display: 'block', marginBlock: 20 }}
        >
          {x.name}
        </Button>
      ))}
    </div>
  );
}
