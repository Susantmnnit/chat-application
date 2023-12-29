import React, { useEffect, useState } from 'react'
import './chatpage.css'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import logo from '../image/online-user-logo.jpg'
import { IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Onlineuser() {
  const lighttheme = useSelector((state)=>state.themekey);
  const [refresh,setRefresh] = useState(true);
  const [users,setUsers] = useState([]);
  const userdata = JSON.parse(localStorage.getItem("userdata"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!userdata) {
      console.log("User not authenticated");
      navigate(-1);
    } else {
      console.log("User refreshed");
      const header = {
        headers: {
          Authorization: `Bearer ${userdata.data.token}`
        }
      };
      axios.get("http://localhost:8000/user/fetchusers", header).then((data) => {
        console.log("User data from API ", data);
        setUsers(data.data);
      });
    }
  }, [refresh, navigate, userdata?.data?.token, userdata]); 
  

  return (
    <>
      <div className={"icons" + (lighttheme ? "" : " dark")}>
        <div className='logo'>
          <img src={logo} alt="Logo" />
          <p>Online users</p>
        </div>
      </div>
      <div className={"search" + (lighttheme ? "" : " dark")}>
        <IconButton onClick={()=>{setRefresh(!refresh)}}>
          <SearchOutlinedIcon className={"icon" + (lighttheme ? "" : " dark")} />
        </IconButton>
        <input type="text" placeholder='search' className={"search-bar" + (lighttheme ? "" : " dark")} autoComplete='off' autoFocus/>
      </div>
      <div className="online-users">
        { users.map((user,index)=>{
          return(
            <motion.div initial={{ opacity: 0 }} whileInView={{opacity: 1 }} whileHover={{ opacity: 0.7 }}
              className={"online-user" + (lighttheme ? "" : " dark")} key={index} 
              onClick={()=>{
                console.log("creating chat with ",user.name);
                const header = {
                  headers :{
                    Authorization: `Bearer ${userdata.data.token}`
                  },
                }
                axios.post("http://localhost:8000/user/chat",
                {
                  userId: user._id,
                },
                header);
              }}>
                <p className='onlie-user-fch'>{user.name[0]}</p>
                <p className='online-user-name'>{user.name}</p>
            </motion.div>
          )
        })}
      </div>
    </>
  )
}
