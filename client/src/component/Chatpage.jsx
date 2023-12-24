import React from 'react'
import './chatpage.css'
import Leftbar from './Leftbar'
import Rightbar from './Rightbar'
import Home from './Home'
import Creategroup from './Creategroup'
import Onlineuser from './Onlineuser'
import { Outlet } from 'react-router-dom'
import Group from './Group'

export default function Chatpage() {
  return (
    <div className='container'>
      <div className='leftbar'>
        <Leftbar/>
      </div>
      <div className='rightbar'>
        <Outlet/>
        {/* <Rightbar/> */}
        {/* <Home/> */}
        {/* <Creategroup/> */}
        {/* <Onlineuser/> */}
        {/* <Group/> */}
      </div>
    </div>
  )
}
