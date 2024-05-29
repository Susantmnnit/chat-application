import React, { useEffect, useState } from 'react';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import InsertEmoticonOutlinedIcon from '@mui/icons-material/InsertEmoticonOutlined';
import RestoreFromTrashOutlinedIcon from '@mui/icons-material/RestoreFromTrashOutlined';
import './rightbar.css';
import { IconButton } from '@mui/material';
import Receivemessage from './Receivemessage';
import Sendmessage from './Sendmessage';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';



export default function Rightbar(props) {
  // console.log("props",props);
  const location = useLocation();
  const { sname } = location.state;
  //console.log("props",props);
  const lighttheme = useSelector((state)=>state.themekey);
  const [messages,setMessages] = useState("");
  const dyParams = useParams();
  
  const [chat_id,chat_user] = dyParams._id.split("&");
  //console.log("params",chat_user);
  const userData = JSON.parse(localStorage.getItem("userdata"));
  const [allmessages,setAllMessages] = useState([]);
  const [allmessagesCopy,setAllMessagesCopy] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [loaded,setLoaded] = useState(false);
  const [socketConnection,setSocketConnection] = useState(false);
  const token=userData.data.token;
  // const socket = io('http://localhost:8000', {
  //   autoConnect: true,
  // });
  

  const sendMessage =()=>{
    var data = null;
    const header = {
      headers:{
        Authorization:`Bearer ${userData.data.token}`,
      },
    };

    // console.log("sendMessage",messages,chat_id);

    // socket.emit('sendMessage', { content: messages, chatId: chat_id});
    setMessages("");
    axios.post("http://localhost:8000/message/",{
      content:messages,
      chatId:chat_id,
    },header).then(({res})=>{
      data=res;
      console.log("messages send");
    });
    // socket.emit("new message",data);
  };



  // useEffect(() => {
  //   socketInstance.on("message received", (newMessage) => {
  //     if (allmessagesCopy.length === 0 || allmessagesCopy._id !== newMessage._id) {
  //       setAllMessages([...allmessages, newMessage]);
  //     }
  //   });
  // }, [allmessagesCopy, allmessages]);

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
        //console.log("heelo", allmessages); // Move the console.log here
        // socket.emit("join chat", chat_id);

      }).catch((error) => {
        console.error("Error fetching messages", error);

      });

      setAllMessagesCopy(allmessages);
  }, [chat_id, userData.data.token, allmessages]);
  

  return (
    <>
      <div className={"rightbar-head" + (lighttheme ? "" : " dark")}>
        <div className='online-user-profile'>
          <div className='online-user-fchar'>{chat_user[0]}</div>
          <span className='online-user-name'>{chat_user}</span>
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

          //console.log("sms",message);
          
          if(sender._id === self_id){
            return <Sendmessage props={message} key={index} />
          }
          else{
            return <Receivemessage props={message} key={index} />
          }
        })}
      </div>
      <div className={"rightbar-send-button" + (lighttheme ? "" : " dark")}>
        <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
          <InsertEmoticonOutlinedIcon className={"icon" + (lighttheme ? "" : " dark")} />
        </IconButton>
        {/* {showEmojiPicker && (
          <Picker
            onSelect={(emoji) => {
              setChosenEmoji(emoji.native);
              setShowEmojiPicker(false);
            }}
          />
        )} */}
        <IconButton>
          <AddOutlinedIcon className={"icon" + (lighttheme ? "" : " dark")}/>
        </IconButton>
        <input type="text" placeholder='type messages...'
          value={messages + (chosenEmoji ? chosenEmoji : '')}
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
