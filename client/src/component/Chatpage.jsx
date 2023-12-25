import React from 'react'
import './chatpage.css'
import Leftbar from './Leftbar'
import Rightbar from './Rightbar'
import Home from './Home'
import Creategroup from './Creategroup'
import Onlineuser from './Onlineuser'
import { Outlet } from 'react-router-dom'
import Group from './Group'
import { useSelector } from 'react-redux'

export default function Chatpage() {
  const lighttheme = useSelector((state)=>state.themekey);
  return (
    <div className='container'>
      <div className={"leftbar" + (lighttheme ? "" : " wall")}>
        <Leftbar/>
      </div>
      <div className={"rightbar" + (lighttheme ? "" : " wall")}>
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
