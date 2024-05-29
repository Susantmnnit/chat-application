import React from 'react'
import './chatpage.css'
import chatlogo from '../image/chat-app-logo.avif'
import { useSelector } from 'react-redux';

export default function Home() {
  const user = JSON.parse(localStorage.getItem("userdata"));
  //console.log(user.data.name);
  const lighttheme = useSelector((state)=>state.themekey);
  return (
    <div className={"home" + (lighttheme ? "" : " wall")}>
        <p className='home-text'>Welcome {user.data.name} To</p>
        <img src={chatlogo} alt="chatlogo" />
    </div>
  )
}
