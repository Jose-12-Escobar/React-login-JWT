import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css'
import EditUser from './components/pure/editUser';
import LoginForm from './components/pure/loginForm'
import ProtecterRoutes from './components/pure/protecterRoutes';
import RegisterForm from './components/pure/registerForm'
import UsersList from './components/pure/usersList';

function App() {

  let tokenLogin = useSelector((state) => state.loginState.token)

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginForm />} />

        <Route path='/register' element={<RegisterForm />} />

        <Route element={<ProtecterRoutes isLogin={tokenLogin !== ""}/>}>
          <Route path='/user' element={<UsersList/>}/> 
          <Route path='/edit' element={<EditUser/>}/> 
        </Route>

      </Routes>
    </Router>
  )
}

export default App
