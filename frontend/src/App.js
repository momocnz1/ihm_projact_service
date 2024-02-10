import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/navbar';
import Login from './page/login';
import Signup from './page/signup'
import Home from './page/home';
import Feed from './page/feed';
import Notification from './page/notification';
import { AuthProvider } from './auth/AuthContext'
import Header from './component/header'

function App() {

  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Navbar />
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<Home />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/notification" element={<Notification />} />

          </Routes>
          
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
