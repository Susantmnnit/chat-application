import React, { useEffect, useState } from 'react'
import './leftbar.css'
import './chatpage.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../feature/themeslice';
import { motion } from 'framer-motion';
import axios from 'axios';


export default function Leftbar() {
  
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const lighttheme = useSelector((state)=>state.themekey);

  // const {refresh, setRefresh} = useState(myContext);
  const [refresh,setRefresh] = useState(true);
  const [conversation,setConversation] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userdata"));
  const [sname,setSname]=useState("");
  //console.log(userData);
  if(!userData){
    // alert("user not authenticated");
    //console.log(userData);
    navigate("/");
  }

  const user=userData.data;
  useEffect(()=>{
    const header = {
      headers:{
        Authorization:`Bearer ${user.token}`
      }
    };

    axios.get("http://localhost:8000/chat/", header).then((res)=>{
      setConversation(res.data);
    });
  });
  
  const formatDate = (isoString) => {
    //console.log("send date string:", isoString);
    const date = new Date(isoString);
    //console.log("Parsed date object:", date);
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

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
      <div className={"people" + (lighttheme ? "" : " wall")}>
        {conversation.map((conversation, index)=>{
          var chatName="";
          if(conversation.isGroupChat){
            chatName = conversation.chatName;
          }
          else{
            conversation.users.map((user)=>{
              if( user._id !== userData.data._id ){
                chatName=user.name;
              }
            });
          }
          if(conversation.lastMessage === undefined ){
            return(
              <motion.div  initial={{ opacity: 0 }} whileInView={{opacity: 1 }} whileHover={{ opacity: 0.7 }} className={"conversation-container" + (lighttheme ? "" : " dark")}
                key={index} onClick={()=>{setSname(chatName); navigate("messages/" + conversation._id + "&" + chatName,{ state: { sname } })}}>
                <p className='people-icon'>{chatName[0]}</p>
                <p className={"people-name" + (lighttheme ? "" : " dark")}>{chatName}</p>
                <p className='people-lastmessage'>no message</p>
                <p className={"people-timestamp" + (lighttheme ? "" : " dark")}>{}</p>
              </motion.div>
            )
          }
          else{
            return(
              <motion.div  initial={{ opacity: 0 }} whileInView={{opacity: 1 }} whileHover={{ opacity: 0.7 }} className={"conversation-container" + (lighttheme ? "" : " dark")}
                key={index} onClick={()=>{setSname(chatName);navigate("messages/" + conversation._id + "&" + chatName,{ state: { sname } })}}>
                <p className='people-icon'>{chatName[0]}</p>
                <p className={"people-name" + (lighttheme ? "" : " dark")}>{chatName}</p>
                <p className='people-lastmessage'>{conversation.lastMessage.content}</p>
                <p className={"people-timestamp" + (lighttheme ? "" : " dark")}>{formatDate(conversation.lastMessage.createdAt)}</p>
              </motion.div>
            )
          }
        })}
      </div>
    </>
  )
}
