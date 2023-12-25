import React from 'react'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import InsertEmoticonOutlinedIcon from '@mui/icons-material/InsertEmoticonOutlined';
import RestoreFromTrashOutlinedIcon from '@mui/icons-material/RestoreFromTrashOutlined';
import './rightbar.css'
import { IconButton } from '@mui/material';
import Receivemessage from './Receivemessage';
import Sendmessage from './Sendmessage';
import { useSelector } from 'react-redux';

export default function Rightbar() {
  const lighttheme = useSelector((state)=>state.themekey);
  return (
    <>
      <div className={"rightbar-head" + (lighttheme ? "" : " dark")}>
        <div className='online-user-profile'>
          <div className='online-user-fchar'>U</div>
          <span className='online-user-name'>user#1</span>
        </div>
        <div className='delete'>
          <IconButton>
            <RestoreFromTrashOutlinedIcon className={"icon" + (lighttheme ? "" : " dark")}/>
          </IconButton>
        </div>
      </div>
      <div className={"rightbar-message" + (lighttheme ? "" : " wall")}>
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
      <div className={"rightbar-send-button" + (lighttheme ? "" : " dark")}>
        <IconButton>
          <InsertEmoticonOutlinedIcon className={"icon" + (lighttheme ? "" : " dark")}/>
        </IconButton>
        <IconButton>
          <AddOutlinedIcon className={"icon" + (lighttheme ? "" : " dark")}/>
        </IconButton>
        <input type="text" placeholder='search' className={"search-send-bar" + (lighttheme ? "" : " dark")} autoComplete='off' autoFocus/>
        <IconButton>
          <SendOutlinedIcon className={"icon" + (lighttheme ? "" : " dark-butt")}/>
        </IconButton>
      </div>
    </>
  )
}
