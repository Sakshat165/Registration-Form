
import './App.css';

import {
  BrowserRouter,
  Routes,Route
} from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import Welcome from './components/Welcome';
function App() {
  return (
    <div>
      
      <BrowserRouter>
      
      <div className="container">
      <Routes>
        <Route exact path="/" element={<Welcome/>}></Route>
        <Route exact path="/signup" element={<Signup/>}></Route>
        <Route exact path="/login" element={<Login/>}></Route>
      </Routes>
      </div>
      </BrowserRouter>
  
    </div>
  );
}

export default App;
