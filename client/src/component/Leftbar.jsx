import React, { useEffect, useState } from 'react'
import './leftbar.css'
import './chatpage.css'
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../feature/themeslice';
import { motion } from 'framer-motion';
import axios from 'axios';

export default function Leftbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lighttheme = useSelector((state) => state.themekey);

  const [refresh, setRefresh] = useState(true);
  const [conversation, setConversation] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const userData = JSON.parse(localStorage.getItem("userdata"));
  const [sname, setSname] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  if (!userData) {
    navigate("/");
  }

  const user = userData.data;

  useEffect(() => {
    const header = {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    };

    axios.get("http://localhost:8000/chat/", header).then((res) => {
      setConversation(res.data);
    });
  }, [refresh]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("userdata");
    navigate("/");
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const isImageUrl = (url) => {
    return /\.(jpg|jpeg|png|gif|bmp|webp)$/.test(url);
  };

  const filteredConversations = conversation.filter(conv => {
    let chatName = conv.isGroupChat ? conv.chatName : conv.users.find(u => u._id !== user._id)?.name;
    return chatName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <>
      <div className={"icons" + (lighttheme ? "" : " dark")}>
        <div className='user-icon'>
          <p className='people-icon' style={{ margin: '5px',cursor:'pointer' }} onClick={handleMenuOpen}>{user.name[0]}</p>
          <p className={"people-name" + (lighttheme ? "" : " dark")} style={{ fontSize: '30px', color: '' }}>{user.name}</p>
        </div>
        <div className='user-icon'>
          <IconButton onClick={() => { navigate('onlineusers') }}>
            <PersonAddIcon className={"icon" + (lighttheme ? "" : " dark")} />
          </IconButton>
          <IconButton onClick={() => { navigate('group') }}>
            <GroupAddIcon className={"icon" + (lighttheme ? "" : " dark")} />
          </IconButton>
          <IconButton onClick={() => { navigate('create-group') }}>
            <AddCircleRoundedIcon className={"icon" + (lighttheme ? "" : " dark")} />
          </IconButton>
          <IconButton onClick={() => { dispatch(toggleTheme()) }}>
            {lighttheme && (
              <DarkModeOutlinedIcon className={"icon" + (lighttheme ? "" : " dark")} />
            )}
            {!lighttheme && (
              <LightModeOutlinedIcon className={"icon" + (lighttheme ? "" : " dark")} />
            )}
          </IconButton>
        </div>
      </div>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleLogout}>
          <ExitToAppOutlinedIcon style={{ marginRight: '8px' }} />
          Logout
        </MenuItem>
      </Menu>
      <div className={"search" + (lighttheme ? "" : " dark")}>
        <IconButton>
          <SearchOutlinedIcon className={"icon" + (lighttheme ? "" : " dark")} />
        </IconButton>
        <input 
          type="text" 
          placeholder='search' 
          className={"search-bar" + (lighttheme ? "" : " dark")} 
          autoComplete='off' 
          autoFocus 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className={"people" + (lighttheme ? "" : " wall")}>
        {filteredConversations.map((conv, index) => {
          let chatName = conv.isGroupChat ? conv.chatName : conv.users.find(u => u._id !== user._id)?.name;
          
          if (!conv.lastMessage) {
            return (
              <motion.div 
                initial={{ opacity: 0 }} 
                whileInView={{ opacity: 1 }} 
                whileHover={{ opacity: 0.7 }} 
                className={"conversation-container" + (lighttheme ? "" : " dark")}
                key={index} 
                onClick={() => { setSname(chatName); navigate("messages/" + conv._id + "&" + chatName, { state: { sname } }) }}>
                <p className='people-icon'>{chatName[0]}</p>
                <p className={"people-name" + (lighttheme ? "" : " dark")}>{chatName}</p>
                <p className='people-lastmessage'>no message</p>
                <p className={"people-timestamp" + (lighttheme ? "" : " dark")}></p>
              </motion.div>
            )
          } else {
            return (
              <motion.div 
                initial={{ opacity: 0 }} 
                whileInView={{ opacity: 1 }} 
                whileHover={{ opacity: 0.7 }} 
                className={"conversation-container" + (lighttheme ? "" : " dark")}
                key={index} 
                onClick={() => { setSname(chatName); navigate("messages/" + conv._id + "&" + chatName, { state: { sname } }) }}>
                <p className='people-icon'>{chatName[0]}</p>
                <p className={"people-name" + (lighttheme ? "" : " dark")}>{chatName}</p>
                {isImageUrl(conv.lastMessage.content) ? (
                    <img src={conv.lastMessage.content} alt="sent image" className='people-lastmessage' style={{ width: '30px', height: '20px' }} />
                  ) : (
                    <p className='people-lastmessage'>{conv.lastMessage.content}</p>
                  )}
                <p className={"people-timestamp" + (lighttheme ? "" : " dark")}>{formatDate(conv.lastMessage.createdAt)}</p>
              </motion.div>
            )
          }
        })}
      </div>
    </>
  )
}