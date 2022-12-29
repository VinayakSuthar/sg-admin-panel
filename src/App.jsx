import { Route, Routes } from 'react-router';

import Home from './page/Home';

import 'antd/dist/reset.css';
import './App.css';
import Games from './components/Games/Index';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<Games />} />
      </Route>
    </Routes>
  );
}

export default App;
