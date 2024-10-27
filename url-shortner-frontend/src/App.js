import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Home from './components/Home/Home';
import RedirectUrl from './components/Redirecturl/RedirectUrl';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/:code' element={<RedirectUrl/>}/>
      </Routes>
    </Router>

  );
}

export default App;
