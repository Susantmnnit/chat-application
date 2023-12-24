import React from 'react'
import './chatpage.css'
import chatlogo from '../image/chat-app-logo.avif'

export default function Home() {
  return (
    <div className='home'>
        <p className='home-text'>Welcome To</p>
        <img src={chatlogo} alt="chatlogo" />
    </div>
  )
}
