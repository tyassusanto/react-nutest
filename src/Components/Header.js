import React from 'react'
import logo from '../Images/logo.png'
import { Link, } from 'react-router-dom'
import { PoweroffOutlined } from '@ant-design/icons'
import jwtdecode from 'jwt-decode'



const Header = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const token = jwtdecode(user)

  const handleLogout = () =>{
    localStorage.clear()
}

  return (
    <div className='container-fluid border-bottom bg-secondary-subtle py-2 d-flex justify-content-between align-items-center'>
      <div className='d-flex'>
        <Link to={'/'}>
          <img src={logo} height={'50px'} alt="" />
        </Link>
        <h2 className='ms-2'>Test</h2>
      </div>
      <div className='d-flex'>
        <div className='px-3 align-self-center'>
          {token.name}
        </div>
        <div>
          <Link to={'/login'} style={{ color: '' }}>
            <PoweroffOutlined style={{ fontSize: '30px', }} onClick={handleLogout}/>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header
