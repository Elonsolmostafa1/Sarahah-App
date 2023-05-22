import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Message from './Message'
import { useTranslation } from 'react-i18next';

export default function UserMessages() {

    const {t} = useTranslation();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  
  async function getUserMessages() {
    setLoading(true)
    let {data} = await axios.get(`http://localhost:5000/message`, {
      headers: {
        token: localStorage.getItem('userToken')
      },
    });
    setMessages(data.messages);
    setLoading(false)
  }

  useEffect(() => {
    getUserMessages();
}, []);

  return (
    <>
    <div className='px-3'>
                    <div className='rounded-2'>
                        <div className='bg-white p-3 fs-4 text-center mt-2 mb-4 shadow-sm fw-light'><i className="fa-solid fa-message pe-2"></i> {t('messages')}</div>
                        { messages.map((msg,index) => (<Message key={msg._id} id={msg._id} message={msg.message} date={msg.createdAt} getUserMessages={getUserMessages}/>))} 
                    </div>
                </div>
    </>
  )
}
