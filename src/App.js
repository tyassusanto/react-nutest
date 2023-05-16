import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'antd/dist/reset.css';
import Main from './Pages/Main';
import Login from './Pages/Login'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import ReqAuth from './Components/Auth/ReqAuth';
import Auth from './Components/Auth/Auth';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route  path='/login' element={
            <ReqAuth>
              <Login />
            </ReqAuth>
          } />
          <Route path='/' element={
            <Auth>
              <Main />
            </Auth>
          } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
