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
import Post from'./page/post'
import Profile from './page/profile'
import PostDetails from './page/content.search';

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
            <Route path='/post' element={<Post />}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path="/post/:postId" element={<PostDetails />} />
          </Routes>
          
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
