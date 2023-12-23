import React from 'react'
import './chatpage.css'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import logo from '../image/online-user-logo.jpg'
import { IconButton } from '@mui/material';

export default function Onlineuser() {
      return (
        <>
          <div className='icons'>
            <div className='logo'>
              <img src={logo} alt="Logo" />
              <p>Online users</p>
            </div>
          </div>
          <div className='search'>
            <IconButton >
              <SearchOutlinedIcon/>
            </IconButton>
            <input type="text" placeholder='search' className='search-bar' autoComplete='off' autoFocus/>
          </div>
          <div className='online-users'>
            <div className="online-user">
                <p className='onlie-user-fch'>U</p>
                <p className='online-user-name'>User#1</p>
            </div>
            <div className="online-user">
                <p className='onlie-user-fch'>U</p>
                <p className='online-user-name'>User#1</p>
            </div>
            <div className="online-user">
                <p className='onlie-user-fch'>U</p>
                <p className='online-user-name'>User#1</p>
            </div>
            <div className="online-user">
                <p className='onlie-user-fch'>U</p>
                <p className='online-user-name'>User#1</p>
            </div>
            <div className="online-user">
                <p className='onlie-user-fch'>U</p>
                <p className='online-user-name'>User#1</p>
            </div>
            <div className="online-user">
                <p className='onlie-user-fch'>U</p>
                <p className='online-user-name'>User#1</p>
            </div>
            <div className="online-user">
                <p className='onlie-user-fch'>U</p>
                <p className='online-user-name'>User#1</p>
            </div>
            <div className="online-user">
                <p className='onlie-user-fch'>U</p>
                <p className='online-user-name'>User#1</p>
            </div>
            <div className="online-user">
                <p className='onlie-user-fch'>U</p>
                <p className='online-user-name'>User#1</p>
            </div>
            <div className="online-user">
                <p className='onlie-user-fch'>U</p>
                <p className='online-user-name'>User#1</p>
            </div>
            <div className="online-user">
                <p className='onlie-user-fch'>U</p>
                <p className='online-user-name'>User#1</p>
            </div>
            <div className="online-user">
                <p className='onlie-user-fch'>U</p>
                <p className='online-user-name'>User#1</p>
            </div>
            <div className="online-user">
                <p className='onlie-user-fch'>U</p>
                <p className='online-user-name'>User#1</p>
            </div>
          </div>
        </>
      )
}
