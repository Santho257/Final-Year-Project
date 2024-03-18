import Header from './Components/Header.jsx'
import Footer from './Components/Footer.jsx'
import Login from './Components/Login.jsx'
import Profile from './Components/Profile.jsx'
import './App.css'
import { Routes, Route} from 'react-router-dom';

function App(){
  const isLoggedIn = Boolean(localStorage.getItem('user'));
  return (
    <>
      <Header isLoggedIn={isLoggedIn}/>
      <Routes>
        <Route path="login" element={
          <Login />
        }/>
        <Route path="profile" element={
          <Profile role="Coordinator"/>
        }/>
      </Routes>
      <Footer />
    </>
  )
}

export default App;