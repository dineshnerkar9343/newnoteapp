
import './App.css';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';

function App() {
  return (
    <>
  <BrowserRouter>
  <Routes>
    <Navbar/>
    <Route index element={<Home/>} />
    <Route index element={<About/>} />

  </Routes>

  </BrowserRouter>

    </>
  );
}

export default App;
