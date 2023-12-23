import React from 'react'
import './chatpage.css'
import Leftbar from './Leftbar'
import Rightbar from './Rightbar'
import Home from './Home'
import Creategroup from './Creategroup'
import Onlineuser from './Onlineuser'

export default function Chatpage() {
  return (
    <div className='container'>
      <div className='leftbar'>
        <Leftbar/>
      </div>
      <div className='rightbar'>
        {/* <Rightbar/> */}
        {/* <Home/> */}
        {/* <Creategroup/> */}
        <Onlineuser/>
      </div>
    </div>
  )
}
