import React from 'react'
import './login.css'
import { Button} from '@mui/material'

export default function Signup() {
  return (
    <div className='login-container'>
      <div className='login-leftbar'>
        Let's chat
      </div>
      <div className='login-rightbar'>
        <p className='login-head'>Login To Your Accout</p>
        <div className='user-details'>
            <input type="text" placeholder='Enter name' autoComplete='off'/>
            <input type="text" placeholder='Enter email' autoComplete='off'/>
            <input type="text" placeholder='Enter password' autoComplete='off'/>
            <Button>Signup</Button>
        </div>
      </div>
    </div>
  )
}
