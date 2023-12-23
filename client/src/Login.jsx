import React from 'react'
import './login.css'
import { Button,Link} from '@mui/material'

export default function Login() {
  return (
    <div className='login-container'>
      <div className='login-leftbar'>
        Let's chat
      </div>
      <div className='login-rightbar'>
        <p className='login-head'>Login To Your Accout</p>
        <div className='user-details'>
            {/* <input type="text" placeholder='Enter name' autoComplete='off'/> */}
            <input type="text" placeholder='Enter email' autoComplete='off'/>
            <input type="text" placeholder='Enter password' autoComplete='off'/>
            <Button>Login</Button>
            <p>Does't have account ?</p>
            <Button>
                <Link to='/signup'>Signup</Link>
            </Button>
        </div>
      </div>
    </div>
  )
}
