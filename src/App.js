import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/footer/Footer';
import NavBar from './components/navbar/NavBar';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Admin from './pages/Admin/Admin';
import SinglePost from './pages/SinglePost/SinglePost';
import Profile from './pages/Profile/Profile';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom';


function App() {

  const [userMe, setUserMe] = useState('');
  const [posts, setPosts] = useState('');
  const token = window.localStorage.getItem('user_token');
  
  useEffect(() => {
    if(token) {
      const decodedUser = jwtDecode(token);
      setUserMe(decodedUser);
    }
    async function fetchData() {
      const posts = await axios.get(`${process.env.REACT_APP_API_URL}/api/get-posts`).then(res => res.data.posts)
      setPosts(posts);
    }
    fetchData();
  }, [])

  return (
    <Router>
      <div className="App">
        <NavBar userMe={userMe} />
        <main>
          <Routes>
            <Route path='/' element={<Home posts={posts} />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/admin' element={<Admin userMe={userMe}/>}/>
            <Route path={`/post/:id`} element={<SinglePost userMe={userMe}/>}/>
            <Route path={`/profile`} element={<Profile userMe={userMe}/>}/>
            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />
          </Routes>
          <Footer />
        </main>
      </div>
    </Router>
  );
}

export default App;
