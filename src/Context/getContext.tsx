import { useEffect, createContext, useState, useContext, FC } from "react";
import axios from "axios";
import {IProps, IUser, IMessage } from "./interfacesContext";

export interface IContext {
  update: boolean;
  setUpdate: (update: boolean) => void;

  token?: string;
  setToken: (token: string) => void;

  url?: string;
  setUrl: (token: string) => void;

  user: IUser | null;
  setUser: (user: IUser | null) => void;

  usersMessage: IUser[] | [];
  setUsersMessage: (developers: IUser[]) => void;

  users: IUser[] | [];
  setUsers: (users: IUser[]) => void;

  messages: IMessage[] | [];
  setMessages: (messages: IMessage[]) => void;

  activeId: String;
  setActiveId: (activeId: String) => void;

}

const InfoContext = createContext<IContext>({} as IContext);

export const useInfoContext = () => useContext(InfoContext);

export const InfoProvider: FC<IProps> = ({ children }: any) => {
  const [update, setUpdate] = useState(true);
  
  const [user, setUser] = useState<IUser | null>(null);
  
  const [usersMessage, setUsersMessage] = useState<IUser[]>([]);
  
  const [users, setUsers] = useState<IUser[]>([]);
  
  const [messages, setMessages] = useState<IMessage[]>([]);
  
  const [activeId, setActiveId] = useState<String>(window.localStorage.getItem("activeId") || '0');
  
  const [token, setToken] = useState<string>(
    window.localStorage.getItem("accessToken") || ""
    );
    
    const [url, setUrl] = useState<string>("http://localhost:4001/api");

    // const socket = IO(`${url}/main`)
    
    const value = {
    update, 
    setUpdate,
    url,
    setUrl,
    token,
    setToken,
    user,
    setUser,
    usersMessage, 
    setUsersMessage,
    users,
    setUsers,
    messages,
    setMessages,
    activeId,
    setActiveId,
  };

  useEffect(() => {
    const getUser = async () => {
      try {        
        const res = await axios.get(`${url}/`, {
          headers: { authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
        console.log(err);
      } 
    };
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    const getUsers = async () => {
      if(user?.user_id){
        try {
          const res = await axios.get(`${url}/users/message/${user?.user_id}`, {headers: { authorization: `BarerToken ${token}` }});
          
          setUsersMessage(res.data);
        } catch (err) {
          console.log(err);
        }
      }
    };

    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, update]);

  useEffect(() => {
    const getMessages = async () => {
      if(user?.user_id){
        try {  
          const res = await axios.get(`${url}/users`, {headers: { authorization: `BarerToken ${token}` }});
                    
          setUsers(res.data);
        } catch (err) {
          console.log(err);
        }
      }
    };

    getMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, update]);

  return (
    <InfoContext.Provider value={value}>
      <InfoContext.Consumer>{() => children}</InfoContext.Consumer>
    </InfoContext.Provider>
  );
};
