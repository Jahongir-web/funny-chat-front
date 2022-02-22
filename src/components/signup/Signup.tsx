import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useInfoContext } from '../../Context/getContext';
import './Signup.css'

const Signup = () => {
  const {url} = useInfoContext()
  const history = useHistory()

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: ''
  })


  const signupUser = async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    try {
      toast.loading('please wait')
      await axios.post(`${url}/signup`, {name: userData.name, email: userData.email, password: userData.password})
      toast.dismiss()
      toast.success("Ro'yhatdan muvafaqiyatli o'tdingiz, iltimos chatdan foydalanish uchun email va parol yordamida kirishni amalga oshiring.")
      history.push('/login')
    } catch (error: any) {
      toast.dismiss()
      toast.error(error.response.data.message)   
    }
    
  }
  
  return (
    <>
      <div className="container">

        <div className="login-box">
          <h1 className="login-box__heading">SignUp</h1>

          <form onSubmit={signupUser} className="form-login" method="GET">
            <div className="form-login__user-box">
              <input className="form-login__input" id="name-input" type="text" name="name" required autoComplete='off' onChange={(e)=> setUserData({...userData, name: e.target.value})}/>
              <label htmlFor="name-input" className="form-login__label">Name</label>
            </div>

            <div className="form-login__user-box">
              <input className="form-login__input" id="email-input" type="email" name="email" required autoComplete='off' onChange={(e)=> setUserData({...userData, email: e.target.value})}/>
              <label htmlFor="email-input" className="form-login__label">Email</label>
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
        </div>

      </div>  
    </>
  ) 
}     
export default Signup