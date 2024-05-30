import React, { useEffect, useRef, useState } from 'react';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import InsertEmoticonOutlinedIcon from '@mui/icons-material/InsertEmoticonOutlined';
import RestoreFromTrashOutlinedIcon from '@mui/icons-material/RestoreFromTrashOutlined';
import './rightbar.css';
import { IconButton, CircularProgress } from '@mui/material';
import Receivemessage from './Receivemessage';
import Sendmessage from './Sendmessage';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

export default function Rightbar(props) {
  const location = useLocation();

  const lighttheme = useSelector((state) => state.themekey);
  const [messages, setMessages] = useState("");
  const dyParams = useParams();

  const [chat_id, chat_user] = dyParams._id.split("&");
  const userData = JSON.parse(localStorage.getItem("userdata"));
  const [allmessages, setAllMessages] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const inputRef = useRef(null);
  const pickerRef = useRef(null);
  const fileInputRef = useRef(null);
  const [file, setFile] = useState();
  const [isSending, setIsSending] = useState(false);
  const token = userData.data.token;

  // console.log("data;;;;;",userData.data);

  const sendMessage = async () => {
    setIsSending(true); // Start loading indicator
    let messagesContent = messages;

    // Handle file upload if there's a file
    if (file) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const res = await axios.post("http://localhost:8000/message/fileUpload/", formData);
        if (res.data && res.data.data && res.data.data.url) {
          const img_url = res.data.data.url;
          messagesContent = img_url;
        } else {
          alert('File upload failed, no URL returned');
          setIsSending(false); // Stop loading indicator
          return;
        }
      } catch (err) {
        console.error('Error uploading file:', err);
        setIsSending(false); // Stop loading indicator
        return;
      } finally {
        setFile(null);
      }
    }

    // Optimistically add the message to the UI
    const newMessage = {
      content: messagesContent,
      sender: { _id: userData.data._id },
      createdAt: new Date().toISOString(),
      _id: Math.random().toString(36).substring(2, 15) // temporary id
    };
    setAllMessages((prevMessages) => [...prevMessages, newMessage]);

    setMessages(""); 

    try {
      await axios.post("http://localhost:8000/message/", {
        content: messagesContent,
        chatId: chat_id,
      }, {
        headers: {
          Authorization: `Bearer ${userData.data.token}`
        },
      });
      console.log("Message sent");
    } catch (err) {
      console.error('Error sending message:', err);
      
      setAllMessages((prevMessages) => prevMessages.filter((msg) => msg._id !== newMessage._id));
    } finally {
      setIsSending(false); 
    }
  };

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
      }).catch((error) => {
        console.error("Error fetching messages", error);
      });
  }, [chat_id, userData.data.token]);

  const [showPicker, setShowPicker] = useState(false);

  const onEmojiClick = (emoji) => {
    setMessages(prevMessages => prevMessages + emoji.native);
    if (inputRef.current) {
      inputRef.current.focus();
    } else {
      setShowPicker(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target) && !inputRef.current.contains(event.target)) {
        setShowPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [pickerRef, inputRef]);

  const clearChats = async () => {
    console.log("chat_id",chat_id);
    try {
      await axios.delete("http://localhost:8000/chat/clearChats/", {
        data: { chatId: chat_id },
        headers: {
          Authorization: `Bearer ${userData.data.token}`
        },
      });
      console.log("Message deleted");
    } catch (err) {
      console.error('Error deleting messages:', err);
    }
  }
  

  return (
    <>
      <div className={"rightbar-head" + (lighttheme ? "" : " dark")}>
        <div className='online-user-profile'>
          <div className='online-user-fchar'>{chat_user[0]}</div>
          <span className='online-user-name'>{chat_user}</span>
        </div>
        <div className='delete'>
          <IconButton onClick={() => {clearChats()}}>
            <RestoreFromTrashOutlinedIcon className={"icon" + (lighttheme ? "" : " dark")} />
          </IconButton>
        </div>
      </div>
      <div className={"rightbar-message" + (lighttheme ? "" : " wall")}>
        {Array.isArray(allmessages) && allmessages.map((message, index) => {
          const sender = message.sender;
          const self_id = userData.data._id;

          if (sender._id === self_id) {
            return <Sendmessage props={message} key={index} />
          } else {
            return <Receivemessage props={message} key={index} />
          }
        })}
      </div>
      <div className={"rightbar-send-button" + (lighttheme ? "" : " dark")}>
        <IconButton onClick={() => setShowPicker(val => !val)}>
          <InsertEmoticonOutlinedIcon className={'icon' + (lighttheme ? '' : ' dark')} />
        </IconButton>
        {showPicker && (
          <span ref={pickerRef} style={{ display: 'block' }}>
            <Picker data={data} onEmojiSelect={onEmojiClick} />
          </span>
        )}
        <IconButton onClick={() => fileInputRef.current.click()}>
          <AddOutlinedIcon className={"icon" + (lighttheme ? "" : " dark")} />
        </IconButton>
        <input accept="image/*" onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
        />
        <input placeholder='type messages...'
          value={file ? file.name : messages}
          ref={inputRef}
          onChange={(e) => {
            setMessages(e.target.value);
          }}
          onKeyDown={(event) => {
            if (event.code === "Enter") {
              sendMessage();
            }
          }}
          className={"search-send-bar" + (lighttheme ? "" : " dark")} autoComplete='off' autoFocus />
        <IconButton onClick={() => { sendMessage() }}>
          {isSending ? <CircularProgress size={24} /> : <SendOutlinedIcon className={"icon" + (lighttheme ? "" : " dark-butt")} />}
        </IconButton>
      </div>
    </>
  )
}
