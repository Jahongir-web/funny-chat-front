import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useInfoContext } from '../../Context/getContext'
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Sidebar from '../sidebar/Sidebar';
import { saveAs }  from 'file-saver'

import './Home.css'
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';



const Home = () => {
  
  const {socket, user, token, url, messages, setMessages, activeId, update, setUpdate} = useInfoContext();  

  const history = useHistory()
  if(user===null && token===''){
    history.push('/login')
  }
  
  useEffect(()=>{  
    if(user){
      socket.emit('online', user)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  
  const [message, setMessage] = useState({
    message_text: '',
    message_file: null, 
    author_id: user?.user_id, 
    user_id: activeId
  })

  const downloadFile = (urll: any) => {
    saveAs(urll, `${urll}`) 
  }

  const createMessage = async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    try {
      toast.loading('please wait')
      await axios.post(`${url}/message`, message, {headers: { authorization: `BarerToken ${token}` }})
      toast.dismiss()
      toast.success("Xabar jo'natildi!")
      setUpdate(!update)
      setMessage({...message, message_text: '', message_file: null,})
    } catch (error: any) {
      toast.dismiss()
      toast.error('Xatolik yuz berdi!')  
      console.log(error.response);      
    }    
  }
  
  
  useEffect(() => {
    const getMessages = async () => {
      if(user?.user_id){
        try {  
          const res = await axios.get(`${url}/message`, {headers: { authorization: `BarerToken ${token}` }});
            
          setMessages(res.data);
        } catch (err: any) {
          console.log(err.response);
        }
      }
    };

    getMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, update]);

  
  
  
  return (
    <div className='container'>
      <Header/>
      <div className="home-box">
        <Sidebar/>
        <div className='chat-content'>
          <div className="chat-area">
            {
              messages.map((item, index) => {
                if((`${item.author_id}` === activeId || `${item.user_id}` === user?.user_id) || (`${item.author_id}` === user?.user_id || `${item.user_id}` === activeId)){
                  return(
                    <p className={` ${`${item.author_id}` === `${user?.user_id}` ? 'message-user' : 'message-friend'}`} key={index}>{item.message_text} {item.message_file && <button type="button" onClick={() => downloadFile(item.message_file)}
                    ><img src="https://freeiconshop.com/wp-content/uploads/edd/document-download-flat.png" width={30} alt="file" /></button> }<span className='date'>{item.date}</span></p>
                  )
                }
                return(<i key={index}></i>)
              })
            }
            
          </div>

          <form className='message-form' onSubmit={createMessage}>
            <input className='text-input' type="text" name="message" onChange={(e)=> {
              setMessage({...message, message_text: e.target.value, author_id: user?.user_id, user_id: activeId})
            }}/>
            <input type="file" name="file" id="file-input" onChange={async (e: any) => {

              const selected = e.currentTarget.files[0];
              const data = new FormData();
              data.append("files", selected);
              try {
                toast.loading('Wait...')
                const res = await axios.post(`${url}/upload`, data, {
                  headers: {
                    "Content-Type": selected.type,
                  },
                });

                setMessage({
                  ...message,
                  message_file: res.data.url,
                  author_id: user?.user_id,
                });
              
                toast.dismiss()
                toast.success(`uploaded!`)
              } catch (err: any) {
                toast.dismiss()
                console.log(err.response);
                toast.error(err.response.data.message)
              }
            }}/>
            <label className='input-file' htmlFor="file-input">💽 file</label>
            <button className='send-button' type='submit'>✈Send</button>
          </form>

        </div>
      </div>
    
      <Footer/>
    </div>
  ) 
}     
export default Home
      