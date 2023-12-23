import React, { useState } from 'react'
import './leftbar.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { IconButton } from '@mui/material';
import Conversation from './Conversation';

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
  return (
    <>
      <div className='icons'>
        <div>
          <IconButton >
            <AccountCircleIcon/>
          </IconButton>
        </div>
        <div>
          <IconButton >
            <GroupAddIcon/>
          </IconButton>
          <IconButton >
            <PersonAddIcon/>
          </IconButton>
          <IconButton >
            <DarkModeOutlinedIcon/>
          </IconButton>
        </div>
      </div>
      <div className='search'>
        <IconButton >
          <SearchOutlinedIcon/>
        </IconButton>
        <input type="text" placeholder='search' className='search-bar' autoComplete='off' autoFocus/>
      </div>
      <div className='people'>
        {people.map((people)=>{
          return <Conversation props={people}/>
        })}
      </div>
    </>
  )
}
