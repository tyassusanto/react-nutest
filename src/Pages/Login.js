import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import Button from '../Components/Button'
import axios from 'axios';

const Login = () => {
  const [show, setShow] = useState(false);

  const toggleShowPass = () => {
    setShow(!show)
  }

  const [form, setForm] = useState({
    username: 'admintyas',
    password: 'asdqwe123'
  })
  const [loading, setLoading] = useState(false)
  const [errorLogin, setErrorLogin] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleClick = () => {
    // console.log(form)
    setLoading(false)
    axios.post(`https://be-nutech-tech.vercel.app/users/login`, form)
      .then((res) => {
        setLoading(false)
        alert(`selamat datang ${res.data.data.name}`)
        localStorage.setItem('auth', 1)
        localStorage.setItem('user', JSON.stringify(res.data.data.token))
        navigate('/')
      })
      .catch((err) => {
        setLoading(false)
        if (err.response.status === 403) {
          setErrorLogin(err.response.data.errorMessage)
        } else {
          alert('error')
        }
      },[])
  }

  return (
    <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
      <form className='w-50'
      onSubmit={handleSubmit}
      >
        <div className="input-group mb-3">
          <label className='col-md-2'>Username</label>
          <input 
          type="text" 
          className="form-control" 
          placeholder="Username" 
          name='username'
          onChange={handleChange}
          value={form.username}
          />
        </div>
        <div className="input-group mb-3">
          <label className='col-md-2'>Password</label>
          <input 
          className="form-control" 
          type={show ? "text" : "password"}
          placeholder="password" 
          name="password"
          onChange={handleChange}
          value={form.password}
          />
          <span onClick={toggleShowPass} className="input-group-text" style={{ cursor: 'pointer' }}>
            {show ? (<EyeOutlined />) : (<EyeInvisibleOutlined />)}
          </span>
        </div>
          <Button type='submit'
          className='btn btn-primary'
          onClick={handleClick}
          isLoading={loading}
          >
            Login
          </Button>
      </form>
    </div>
  )
}

export default Login
