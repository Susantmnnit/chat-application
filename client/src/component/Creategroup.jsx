import React from 'react'
import './chatpage.css'
import { IconButton } from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded';

export default function Creategroup() {
  return (
    <div className='group-input-container'>
        <div className="input-container">
            <input type="text" placeholder='Enter group name' className='create-group' />
            <IconButton>
                <AddRoundedIcon/>
            </IconButton>
        </div>
    </div>
  )
}
