import { Route, Routes } from 'react-router';
import 'antd/dist/reset.css';

import Home from './page/Home';
import Games from './components/Games/Index';
import CreateGame from './components/CreateGame';
import EditGame from './components/EditGame';
import Genres from './components/Genres';

import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<Games />} />
        <Route path="/game/create" element={<CreateGame />} />
        <Route path="/game/:id" element={<EditGame />} />
        <Route path="/genres" element={<Genres />} />
      </Route>
    </Routes>
  );
}

export default App;
