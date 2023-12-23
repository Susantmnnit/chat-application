import React from 'react'
import './chatpage.css'
import Leftbar from './Leftbar'
import Rightbar from './Rightbar'

export default function Chatpage() {
  return (
    <div className='container'>
      <div className='leftbar'>
        <Leftbar/>
      </div>
      <div className='rightbar'>
        {/* <Rightbar/> */}
      </div>
    </div>
  )
}
