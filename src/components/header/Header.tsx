
import './Header.css'
import { Link, useHistory } from 'react-router-dom'
import { useInfoContext } from '../../Context/getContext'


const Header = () => {
  const {user, socket} = useInfoContext()
  const history = useHistory()

  
  return (
    <>
      <div className='header'>
        <h2 className='header-headig'>{`🙂 Salom ${user?.user_name} Quvnoq Chatga Xush Kelibsiz!`}</h2>
        <Link to={'/login'} className="leave-link" onClick={()=> {
          socket.emit('exit', user)
          window.localStorage.clear()
          history.go(0)
        }}>Chatdan Chiqish</Link>
      </div>
    </>
  )
}

export default Header
