import axios from 'axios'
import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useInfoContext } from '../../Context/getContext'
import './Login.css'

const Login = () => {
  const {url, setToken} = useInfoContext()

  const history = useHistory()

  const [userData, setUserData] = useState({
    email: '',
    password: ''
  })

  const loginUser = async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    try {
      toast.loading('please wait')
      const res = await axios.post(`${url}/login`, {email: userData.email, password: userData.password})
      window.localStorage.setItem('accessToken', res.data.accessToken)
      setToken(res.data.accessToken)
      toast.dismiss()
      history.push('/')
    } catch (error: any) {
      toast.dismiss()
      toast.error(error.response.data.message)   
    }
    
  }
  
  return (
    <>
      <div className="container">

        <div className="login-box">
          <h1 className="login-box__heading">Login</h1>

          <form onSubmit={loginUser} className="form-login" method="GET">
            <div className="form-login__user-box">
              <input className="form-login__input" id="name-input" type="email" name="name" required autoComplete='off' onChange={(e)=> setUserData({...userData, email: e.target.value})}/>
              <label htmlFor="name-input" className="form-login__label">Email</label>
            </div>

            <div className="form-login__user-box">
              <input className="form-login__input" id="password-input" type="password" name="password" required minLength={3} onChange={(e)=> setUserData({...userData, password: e.target.value})}/>
              <label htmlFor="password-input" className="form-login__label">Password</label>
            </div>

            <div className="form-login__submit-box">
              <span className="form-login__span"></span>
              <span className="form-login__span"></span>
              <span className="form-login__span"></span>
              <span className="form-login__span"></span>
              <button className="form-login__btn" type="submit">Submit</button>
            </div>
          </form>

          <Link to={'/signup'} className="signup-link">
            <span>Ro'yhatdan o'tish</span>
          </Link>
        </div>
        
      </div>  
    </>
  ) 
}     
export default Login