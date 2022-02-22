import { ReactNode } from "react";



export interface IUser {
  user_name?: string;
  user_id?: string;
  user_email?: string;
  is_active?: boolean;
  count?: number;
}

export interface IMessage {
  message_id: number;
  message_text: string;
  message_file: string;
  author_id: number;
  user_id: number;
  date: string;
}


export interface IProps {
  children: ReactNode;
}


