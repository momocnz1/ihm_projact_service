import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/navbar';
import Login from './page/login';

function App() {
  return (
    <div className="App">
      
        <Router> 
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />}/> 
          </Routes>
        </Router>
      
    </div>
  );
}

export default App;
