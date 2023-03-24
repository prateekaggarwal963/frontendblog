import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import Services from './pages/Services';
import Userdashboard from './pages/user-routes/Userdashboard';
import Privateroute from './components/Privateroute';
import ProfileInfo from './pages/user-routes/ProfileInfo';
function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/services' element={<Services/>}/>

        <Route path='/user' element={<Privateroute/>}>
        <Route path='dashboard' element={<Userdashboard/>}/>
        <Route path='profile-info' element={<ProfileInfo/>}/>
        </Route>

      </Routes>
    </BrowserRouter>


  );
}

export default App;
