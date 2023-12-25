import React from 'react'
import './chatpage.css'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import logo from '../image/online-user-logo.jpg'
import { IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import { motion } from "framer-motion"

export default function Group() {
    const lighttheme = useSelector((state)=>state.themekey);
    return (
        <>
          <div className={"icons" + (lighttheme ? "" : " dark")}>
            <div className='logo'>
              <img src={logo} alt="Logo" />
              <p>Available grous</p>
            </div>
          </div>
          <div className={"search" + (lighttheme ? "" : " dark")}>
            <IconButton >
              <SearchOutlinedIcon className={"icon" + (lighttheme ? "" : " dark")}/>
            </IconButton>
            <input type="text" placeholder='search' className={"search-bar" + (lighttheme ? "" : " dark")} autoComplete='off' autoFocus/>
          </div>
          <div className="online-users">
            <motion.div  initial={{ opacity: 0 }} whileInView={{opacity: 1 }} whileHover={{ opacity: 0.7 }} className={"online-user" + (lighttheme ? "" : " dark")}>
                <p className='onlie-user-fch'>G</p>
                <p className='online-user-name'>Group#1</p>
            </motion.div>
            <motion.div  initial={{ opacity: 0 }} whileInView={{opacity: 1 }} whileHover={{ opacity: 0.7 }} className={"online-user" + (lighttheme ? "" : " dark")}>
                <p className='onlie-user-fch'>G</p>
                <p className='online-user-name'>Group#1</p>
            </motion.div>
          </div>
        </>
    )
}
