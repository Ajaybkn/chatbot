//chat component-->>
import React, { useContext } from 'react'
import Messages from './Messages'
import Input from './Input'
import { FaVideo, FaUserPlus } from 'react-icons/fa'
import { GiHamburgerMenu } from 'react-icons/gi'
import { ChatContext } from '../context/ChatContext'
const Chat = () => {
  const { data } = useContext(ChatContext)
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user.displayName}</span>
        <div className="chatIcons">
          {<FaVideo />}
          {<FaUserPlus />}
          {<GiHamburgerMenu />}
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default Chat
