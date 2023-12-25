import React from 'react'
import './chatpage.css'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import logo from '../image/online-user-logo.jpg'
import { IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

export default function Onlineuser() {
    const lighttheme = useSelector((state)=>state.themekey);
      return (
        <>
          <div className={"icons" + (lighttheme ? "" : " dark")}>
            <div className='logo'>
              <img src={logo} alt="Logo" />
              <p>Online users</p>
            </div>
          </div>
          <div className={"search" + (lighttheme ? "" : " dark")}>
            <IconButton >
              <SearchOutlinedIcon className={"icon" + (lighttheme ? "" : " dark")} />
            </IconButton>
            <input type="text" placeholder='search' className={"search-bar" + (lighttheme ? "" : " dark")} autoComplete='off' autoFocus/>
          </div>
          <div className="online-users">
            <motion.div initial={{ opacity: 0 }} whileInView={{opacity: 1 }} whileHover={{ opacity: 0.7 }} className={"online-user" + (lighttheme ? "" : " dark")}>
                <p className='onlie-user-fch'>U</p>
                <p className='online-user-name'>User#1</p>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{opacity: 1 }} whileHover={{ opacity: 0.7 }} className={"online-user" + (lighttheme ? "" : " dark")}>
                <p className='onlie-user-fch'>U</p>
                <p className='online-user-name'>User#1</p>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{opacity: 1 }} whileHover={{ opacity: 0.7 }} className={"online-user" + (lighttheme ? "" : " dark")}>
                <p className='onlie-user-fch'>U</p>
                <p className='online-user-name'>User#1</p>
            </motion.div>
          </div>
        </>
      )
}
