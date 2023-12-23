import React from 'react'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import InsertEmoticonOutlinedIcon from '@mui/icons-material/InsertEmoticonOutlined';
import RestoreFromTrashOutlinedIcon from '@mui/icons-material/RestoreFromTrashOutlined';
import './rightbar.css'
import { IconButton } from '@mui/material';
import Receivemessage from './Receivemessage';
import Sendmessage from './Sendmessage';

export default function Rightbar() {
  return (
    <>
      <div className='rightbar-head'>
        <div className='online-user-profile'>
          <div className='online-user-fchar'>U</div>
          <span className='online-user-name'>user#1</span>
        </div>
        <div className='delete'>
          <IconButton>
            <RestoreFromTrashOutlinedIcon/>
          </IconButton>
        </div>
      </div>
      <div className='rightbar-message'>
        <Receivemessage/>
        <Sendmessage/>
        <Receivemessage/>
        <Sendmessage/>
        <Receivemessage/>
        <Sendmessage/>
        <Receivemessage/>
        <Sendmessage/>
        <Receivemessage/>
        <Sendmessage/>
        <Receivemessage/>
        <Sendmessage/>
      </div>
      <div className='rightbar-send-button'>
        <IconButton>
          <InsertEmoticonOutlinedIcon/>
        </IconButton>
        <IconButton>
          <AddOutlinedIcon/>
        </IconButton>
        <input type="text" placeholder='search' className='search-send-bar' autoComplete='off' autoFocus/>
        <IconButton>
          <SendOutlinedIcon/>
        </IconButton>
      </div>
    </>
  )
}
