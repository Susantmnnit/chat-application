import React, { useState } from 'react'
import './leftbar.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { IconButton } from '@mui/material';
import Conversation from './Conversation';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../feature/themeslice';

export default function Leftbar() {
  const [people,setpeople]=useState([
    {
      name: 'People-1',
      lastmessage:'lst-1',
      timestamp:'today'
    },
    {
      name: 'People-2',
      lastmessage:'lst-2',
      timestamp:'today'
    },
    {
      name: 'People-3',
      lastmessage:'lst-3',
      timestamp:'today'
    }
  ]);

  const navigate=useNavigate();
  const dispatch = useDispatch();
  const lighttheme = useSelector((state)=>state.themekey);
  // console.log(lighttheme);

  return (
    <>
      <div className={"icons" + (lighttheme ? "" : " dark")}>
        <div className='user-icon'>
          <IconButton>
            <AccountCircleIcon className={"icon" + (lighttheme ? "" : " dark")}/>
          </IconButton>
        </div>
        <div className='user-icon'>
          <IconButton onClick={()=>{navigate('onlineusers')}}>
            <PersonAddIcon className={"icon" + (lighttheme ? "" : " dark")}/>
          </IconButton>
          <IconButton onClick={()=>{navigate('group')}}>
            <GroupAddIcon className={"icon" + (lighttheme ? "" : " dark")}/>
          </IconButton>
          <IconButton onClick={()=>{navigate('create-group')}}>
            <AddCircleRoundedIcon className={"icon" + (lighttheme ? "" : " dark")}/>
          </IconButton>
          <IconButton onClick={()=>{dispatch(toggleTheme())}}>
            {lighttheme && (
              <DarkModeOutlinedIcon className={"icon" + (lighttheme ? "" : " dark")}/>
            )}
            {!lighttheme && (
              <LightModeOutlinedIcon className={"icon" + (lighttheme ? "" : " dark")}/>
            )}
          </IconButton>
        </div>
      </div>
      <div className={"search" + (lighttheme ? "" : " dark")}>
        <IconButton >
          <SearchOutlinedIcon className={"icon" + (lighttheme ? "" : " dark")}/>
        </IconButton>
        <input type="text" placeholder='search' className={"search-bar" + (lighttheme ? "" : " dark")} autoComplete='off' autoFocus/>
      </div>
      <div className={"people" + (lighttheme ? "" : " dark")}>
        {people.map((people)=>{
          return <Conversation props={people}/>
        })}
      </div>
    </>
  )
}
