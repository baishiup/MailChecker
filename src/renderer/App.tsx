import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Button } from 'antd';

function Hello() {
  return (
    <div>
      <h1>electron-react-boilerplate</h1>
      <Button onClick={() => window.electron.ipcRenderer.test()}>
        puppeteer
      </Button>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
