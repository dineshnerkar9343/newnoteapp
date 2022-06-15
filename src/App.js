
import './App.css';

import{
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import HaproState from './context/HaproState';
import HaboutState from './context/HaboutState';
import HcourseState from './context/HcourseState';

function App() {
  return (
    <>
    
    <HaproState>
      <HcourseState>
      <HaboutState>
  <BrowserRouter>
  <Navbar/>

  <div className="container">
  <Routes>
    <Route exact path="/home" element={<Home/>}></Route>
    <Route exact path="/about" element={<About/>}></Route>
    <Route exact path="/login" element={<Login/>}></Route>
    <Route exact path="/signup" element={<Signup/>}></Route>

  </Routes>
  </div>
  </BrowserRouter>
  </HaboutState>
  </HcourseState>
  </HaproState>

    </>
  );
}

export default App;
