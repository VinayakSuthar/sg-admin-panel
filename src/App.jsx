import { Route, Routes } from 'react-router';

import Home from './page/Home';
import Games from './components/Games/Index';
import CreateGame from './components/CreateGame';

import 'antd/dist/reset.css';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<Games />} />
        <Route path="/game/create" element={<CreateGame />} />
      </Route>
    </Routes>
  );
}

export default App;
