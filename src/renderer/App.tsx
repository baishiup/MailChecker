import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';

import 'antd/dist/reset.css';
import { Tran } from './pages/Tran';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Tran />} />
        {/* <Route path="/" element={<Home />} /> */}
      </Routes>
    </Router>
  );
}
