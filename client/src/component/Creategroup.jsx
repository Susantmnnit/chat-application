import React from 'react'
import './chatpage.css'
import { IconButton } from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useSelector } from 'react-redux';

export default function Creategroup() {
  const lighttheme = useSelector((state)=>state.themekey);
  return (
    <div className={"group-input-container" + (lighttheme ? "" : " wall")}>
        <div className={"input-container" + (lighttheme ? "" : " dark")}>
            <input type="text" placeholder='Enter group name' className={"create-group" + (lighttheme ? "" : " dark")} />
            <IconButton>
                <AddRoundedIcon className={"icon" + (lighttheme ? "" : " dark")}/>
            </IconButton>
        </div>
    </div>
  )
}
