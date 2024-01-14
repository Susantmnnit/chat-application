import React, { useEffect, useState } from 'react'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import InsertEmoticonOutlinedIcon from '@mui/icons-material/InsertEmoticonOutlined';
import RestoreFromTrashOutlinedIcon from '@mui/icons-material/RestoreFromTrashOutlined';
import './rightbar.css'
import { IconButton } from '@mui/material';
import Receivemessage from './Receivemessage';
import Sendmessage from './Sendmessage';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Rightbar(props) {
  console.log("props",props);
  const lighttheme = useSelector((state)=>state.themekey);
  const [messages,setMessages] = useState("");
  const dyParams = useParams();
  const [chat_id,chat_user] = dyParams._id.split("&");
  const userData = JSON.parse(localStorage.getItem("userdata"));
  const [allmessages,setAllMessages] = useState([]);
  const [allmessagesCopy,setAllMessagesCopy] = useState([]);
  const [loaded,setLoaded] = useState(false);
  const sendMessage =()=>{
    var data = null;
    const header = {
      headers:{
        Authorization:`Bearer ${userData.data.token}`,
      },
    };

    axios.post("http://localhost:8000/message/",{
      content:messages,
      chatId:chat_id,
    },header).then(({res})=>{
      data=res;
      console.log("messages send");
    })
  }

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${userData.data.token}`
      },
    };
  
    axios.get("http://localhost:8000/message/" + chat_id, config)
      .then(({ data }) => {
        setAllMessages(data);
        setLoaded(true);
        console.log("heelo", allmessages); // Move the console.log here
        //WebSocket.emit("join chat", chat_id);
      })
      .catch((error) => {
        console.error("Error fetching messages", error);
      });
    setAllMessagesCopy(allmessages);
  }, [chat_id, userData.data.token, allmessages]);
  

  return (
    <>
      <div className={"rightbar-head" + (lighttheme ? "" : " dark")}>
        <div className='online-user-profile'>
          <div className='online-user-fchar'>{userData.data.name[0]}</div>
          <span className='online-user-name'>{userData.data.name}</span>
        </div>
        <div className='delete'>
          <IconButton>
            <RestoreFromTrashOutlinedIcon className={"icon" + (lighttheme ? "" : " dark")}/>
          </IconButton>
        </div>
      </div>
      <div className={"rightbar-message" + (lighttheme ? "" : " wall")}>
        {Array.isArray(allmessages) && allmessages.map((message,index) =>{
          const sender = message.sender;
          const self_id = userData.data._id;

          console.log("sms",message);
          
          if(sender._id === self_id){
            return <Sendmessage props={message} key={index} />
          }
          else{
            return <Receivemessage props={message} key={index} />
          }
        })}
      </div>
      <div className={"rightbar-send-button" + (lighttheme ? "" : " dark")}>
        <IconButton>
          <InsertEmoticonOutlinedIcon className={"icon" + (lighttheme ? "" : " dark")}/>
        </IconButton>
        <IconButton>
          <AddOutlinedIcon className={"icon" + (lighttheme ? "" : " dark")}/>
        </IconButton>
        <input type="text" placeholder='type messages'
          value={messages}
          onChange={(e)=>{
            setMessages(e.target.value);
          }}
          onKeyDown={(event) =>{
            if(event.code === "Enter"){
              sendMessage();
              setMessages("");
            }
          }}
         className={"search-send-bar" + (lighttheme ? "" : " dark")} autoComplete='off' autoFocus/>
        <IconButton onClick={()=>{sendMessage()}}>
          <SendOutlinedIcon className={"icon" + (lighttheme ? "" : " dark-butt")}/>
        </IconButton>
      </div>
    </>
  )
}
