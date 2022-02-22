
import axios from 'axios';
import { useState } from 'react';
import { useInfoContext } from '../../Context/getContext'

import './Sidebar.css'


const Sidebar = () => {

  const { user, users, usersMessage, activeId, setActiveId, token, url, update, setUpdate } = useInfoContext();

  const [data, setData] = useState(usersMessage)

  const readMessage = async (author_id: string) => {
    try {  
      await axios.put(`${url}/message`, {user_id: user?.user_id, author_id}, {headers: { authorization: `BarerToken ${token}` }});
      
      setUpdate(!update)
    } catch (err: any) {
      console.log(err.response);
    }    
  };

  return (
    <div className='sidebar'>
      <div className="users-messages">
        <button className='sidebar-button-left' onClick={()=> {
          setData(users)
          setActiveId('0')
        }}>Do'stlar</button>
        <button className='sidebar-button-right' onClick={()=> {
          setData(usersMessage)
          setActiveId('0')
        }}>Yangi xabarlar</button>

      </div>
      <ul className='user-list'>
        { data.map((item, index) => { 
          if(item.user_id !== user?.user_id) {
            return(
              <li className={`user-item ${activeId === `${item.user_id}` && 'active'}`} key={index} id={item.user_id} onClick={(e)=> {
                  setActiveId(e.currentTarget.id)                  
                  window.localStorage.setItem("activeId", e.currentTarget.id)
                  readMessage(e.currentTarget.id)
                }
              }>{item.user_name} {item.is_active && <span className='user-status'></span>} {item.count && <span className='count-message'>✉ {item.count}</span>}</li>
            )
          }
          return(<i key={index}></i>)
        })}
        
      </ul>
      
    </div>
  ) 
}     
export default Sidebar