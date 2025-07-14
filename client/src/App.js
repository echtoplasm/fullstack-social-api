
import './App.css';
import CreateUser from './components/CreateUser.js';
import Navbar from './components/Navbar.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProfileComponent from './components/ProfileComponent.js';
import LoggedInProfile from './components/UserHome.js';
import WelcomePage from './components/Welcome.js';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Navbar />
        <Routes>
          <Route path='/' element={<WelcomePage/>}/>
          <Route path="/home/:id" element={<LoggedInProfile />} />
          <Route path="/users/new" element={<CreateUser />} />
          <Route path="/users" element={<div className="mt-4"><h1>Users List</h1></div>} />
          <Route path="/posts" element={<div className="mt-4"><h1>Posts List</h1></div>} />
          <Route path="/users/:id" element={<ProfileComponent />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
